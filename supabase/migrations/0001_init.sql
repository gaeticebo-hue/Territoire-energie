-- Territoire Avenir Énergie — schéma initial Supabase
--
-- À exécuter dans Supabase Dashboard → SQL Editor → New query, puis "Run".
-- Ce script est idempotent-safe pour une première exécution sur un projet
-- neuf (les tables n'existent pas encore).
--
-- Portée : seules les entités nécessitant un vrai contrôle d'accès (comptes,
-- entreprises, adhésions, documents/FAQ privés, candidatures) sont en base.
-- Les programmes, le calendrier et les partenaires restent gérés dans le
-- code (lib/data/*.ts) : contenu éditorial public, peu sensible, modifié
-- par déploiement plutôt que par une interface d'administration.

-- =========================================================================
-- 1. Tables
-- =========================================================================

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('consumer', 'producer', 'partner')),
  sector text,
  annual_consumption_mwh integer,
  region text,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  company_id uuid references public.companies (id) on delete set null,
  role text not null default 'member' check (role in ('admin', 'member', 'partner', 'producer')),
  created_at timestamptz not null default now()
);

create table if not exists public.memberships (
  company_id uuid not null references public.companies (id) on delete cascade,
  programme_id text not null,
  created_at timestamptz not null default now(),
  primary key (company_id, programme_id)
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  programme_id text,
  visibility text not null check (visibility in ('public', 'private')),
  category text not null check (category in ('reglement', 'formulaire', 'term-sheet', 'support', 'compte-rendu', 'faq')),
  file_url text not null default '#',
  description text,
  updated_at date,
  created_at timestamptz not null default now()
);

create table if not exists public.faq_items (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('achat-groupe', 'ppa', 'producteurs', 'programme', 'espace-membres')),
  question text not null,
  answer text not null,
  programme_id text,
  visibility text not null check (visibility in ('public', 'private')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('consumer', 'producer')),
  programme_id text,
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  sector text,
  annual_consumption_mwh integer,
  technology text,
  message text,
  status text not null default 'new' check (status in ('new', 'in_review', 'shortlisted', 'accepted', 'rejected')),
  submitted_at timestamptz not null default now()
);

-- =========================================================================
-- 2. Fonction utilitaire (sécurisée contre la récursion RLS)
-- =========================================================================

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- =========================================================================
-- 3. Création automatique du profil à l'inscription (magic link)
-- =========================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    'member'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =========================================================================
-- 4. Row Level Security
-- =========================================================================

alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.memberships enable row level security;
alter table public.documents enable row level security;
alter table public.faq_items enable row level security;
alter table public.applications enable row level security;

-- companies : un membre voit sa propre entreprise ; un admin voit tout.
create policy "companies_select_own_or_admin" on public.companies
  for select to authenticated
  using (
    id = (select company_id from public.profiles where id = auth.uid())
    or public.is_admin()
  );

-- profiles : chacun voit/modifie son propre profil ; un admin voit tout.
create policy "profiles_select_own_or_admin" on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_admin());

create policy "profiles_update_own" on public.profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- memberships : visibles par les membres de l'entreprise concernée ou un admin.
create policy "memberships_select_own_company_or_admin" on public.memberships
  for select to authenticated
  using (
    company_id = (select company_id from public.profiles where id = auth.uid())
    or public.is_admin()
  );

-- documents : publics visibles par tous (y compris visiteurs non connectés) ;
-- privés visibles par les membres des entreprises inscrites au programme concerné.
create policy "documents_select_public" on public.documents
  for select to anon, authenticated
  using (visibility = 'public');

create policy "documents_select_private_members" on public.documents
  for select to authenticated
  using (
    visibility = 'private'
    and (
      public.is_admin()
      or programme_id in (
        select m.programme_id from public.memberships m
        where m.company_id = (select company_id from public.profiles where id = auth.uid())
      )
    )
  );

-- faq_items : même logique que documents.
create policy "faq_select_public" on public.faq_items
  for select to anon, authenticated
  using (visibility = 'public');

create policy "faq_select_private_members" on public.faq_items
  for select to authenticated
  using (
    visibility = 'private'
    and (
      public.is_admin()
      or programme_id in (
        select m.programme_id from public.memberships m
        where m.company_id = (select company_id from public.profiles where id = auth.uid())
      )
    )
  );

-- applications : n'importe qui (visiteur ou membre) peut déposer une
-- candidature ; seuls les admins peuvent les consulter.
create policy "applications_insert_anyone" on public.applications
  for insert to anon, authenticated
  with check (true);

create policy "applications_select_admin" on public.applications
  for select to authenticated
  using (public.is_admin());

-- =========================================================================
-- 5. Données de démonstration (reprend le contenu actuellement statique)
-- =========================================================================

insert into public.companies (name, type, sector, annual_consumption_mwh, region)
values ('Entreprise Démonstration SAS', 'consumer', 'Industrie agroalimentaire', 3200, 'Nouvelle-Aquitaine');

do $$
declare
  v_company_id uuid;
begin
  select id into v_company_id from public.companies where name = 'Entreprise Démonstration SAS' limit 1;

  insert into public.memberships (company_id, programme_id)
  values (v_company_id, 'prog-2')
  on conflict do nothing;
end $$;

insert into public.documents (title, programme_id, visibility, category, file_url, description, updated_at) values
  ('Règlement de consultation — Appel d''offres producteurs', 'prog-2', 'private', 'reglement', '#', 'Conditions de participation, procédure et critères de sélection de l''appel d''offres producteurs. Transmis sur demande, sous obligation de confidentialité.', '2026-06-29'),
  ('Term Sheet — Conditions du PPA multi-acheteurs', 'prog-2', 'private', 'term-sheet', '#', 'Conditions principales du contrat d''achat direct d''énergie (durée, prix, répartition, garanties). Document confidentiel transmis aux candidats retenus.', '2026-06-29'),
  ('Formulaire de réponse producteur', 'prog-2', 'private', 'formulaire', '#', 'Trame de réponse technique et économique à compléter par les producteurs candidats.', '2026-06-29'),
  ('Compte-rendu — Réunion de lancement du collectif', 'prog-2', 'private', 'compte-rendu', '#', 'Synthèse de la réunion de lancement à destination des entreprises membres.', '2026-06-30'),
  ('Présentation du programme Territoire Avenir Énergie', null, 'public', 'support', '#', 'Plaquette institutionnelle de présentation du programme (disponible sur demande).', '2026-06-29');

insert into public.faq_items (category, question, answer, programme_id, visibility, sort_order) values
  ('achat-groupe', 'Qu''est-ce que l''achat groupé d''électricité renouvelable ?', 'L''achat groupé consiste à réunir plusieurs entreprises consommatrices au sein d''un collectif pour négocier ensemble, avec un producteur d''électricité renouvelable, des conditions d''achat plus favorables qu''une entreprise ne pourrait obtenir seule : volumes plus importants, meilleure visibilité pour le producteur, mutualisation des coûts de structuration juridique et technique.', null, 'public', 1),
  ('achat-groupe', 'Pourquoi rejoindre un collectif plutôt que négocier seul un contrat d''énergie ?', 'Individuellement, la plupart des ETI et entreprises industrielles n''ont pas la taille critique pour intéresser un producteur à un contrat d''achat direct de long terme. En se regroupant, les entreprises atteignent un volume suffisant pour accéder à un PPA, tout en bénéficiant d''un accompagnement juridique et technique mutualisé, moins coûteux que s''il était supporté individuellement.', null, 'public', 2),
  ('achat-groupe', 'Quel est le volume d''électricité visé par le programme ?', 'Pour l''édition en cours (Territoire Avenir Énergie #2), le collectif recherche un approvisionnement compris entre 10 et 13 GWh par an, réparti entre les entreprises membres au prorata de leurs besoins. Ce volume peut faire l''objet d''ajustements marginaux au cours de la négociation avec le producteur retenu.', null, 'public', 3),
  ('achat-groupe', 'Mon entreprise est-elle éligible pour rejoindre le collectif ?', 'Le programme s''adresse en priorité aux ETI et entreprises industrielles localisées au Pays Basque et en Nouvelle-Aquitaine, disposant d''une consommation électrique significative et récurrente. D''autres profils peuvent être étudiés au cas par cas : le meilleur point de départ est de déposer une candidature via la page dédiée, qui sera examinée par l''équipe de coordination.', null, 'public', 4),
  ('ppa', 'Qu''est-ce qu''un PPA (Power Purchase Agreement) ?', 'Un PPA est un contrat d''achat direct d''électricité conclu entre un consommateur et un producteur, en dehors des mécanismes classiques de fourniture. Il permet de sécuriser un prix et un volume d''électricité sur une longue durée, indépendamment des variations du marché de gros, tout en garantissant l''origine renouvelable de l''énergie consommée.', null, 'public', 5),
  ('ppa', 'Qu''est-ce qu''un PPA « multi-acheteurs » ?', 'Dans un PPA multi-acheteurs, un même producteur conclut des contrats individuels avec chacune des entreprises du collectif, selon des conditions harmonisées négociées collectivement. Chaque entreprise dispose ainsi d''un contrat propre avec le producteur, mais bénéficie des conditions obtenues grâce à la mutualisation du volume du collectif.', null, 'public', 6),
  ('ppa', 'Comment le prix de l''électricité est-il fixé ?', 'Le règlement de consultation impose aux producteurs candidats de proposer un prix fixe sur toute la durée du contrat, garanties d''origine incluses. Cela permet aux entreprises membres de se couvrir contre la volatilité des prix de marché. Des variantes (prix indexé, durée plus courte) peuvent être proposées par le producteur en complément, mais l''offre de référence reste un prix fixe.', null, 'public', 7),
  ('ppa', 'Qu''est-ce que le mode « pay-as-produced » ?', 'Le collectif s''engage à enlever l''électricité au fil de sa production par la centrale, plutôt qu''un volume fixe à chaque instant. La facturation reflète donc la production réelle (ou une estimation régularisée périodiquement), ce qui est la pratique standard des PPA d''électricité renouvelable.', null, 'public', 8),
  ('ppa', 'Que se passe-t-il si une entreprise membre du collectif fait défaut ?', 'Un mécanisme de solidarité, encadré par un taux de défaut maximal, prévoit que les autres membres du collectif reprennent temporairement les volumes libérés par un membre défaillant, dans une certaine limite. Ce mécanisme protège le producteur et la stabilité du contrat pour l''ensemble du collectif.', null, 'public', 9),
  ('ppa', 'Sur quelle durée les entreprises s''engagent-elles ?', 'Le règlement de consultation retient une durée de PPA de quinze ans à compter de la mise en service de la centrale, ce qui correspond aux standards du marché pour ce type de contrat et permet d''amortir l''investissement du producteur tout en offrant une visibilité de long terme aux entreprises.', null, 'public', 10),
  ('producteurs', 'Qui peut candidater en tant que producteur ?', 'Tout producteur d''électricité d''origine renouvelable (solaire, éolien, ou toute autre source visée par le code de l''énergie) porteur d''un projet ou d''un actif déjà en exploitation en France métropolitaine peut candidater. Les projets situés en Nouvelle-Aquitaine bénéficient d''une meilleure notation, sans être une condition d''éligibilité.', null, 'public', 11),
  ('producteurs', 'Comment se déroule la sélection du producteur ?', 'La sélection suit un processus d''appel d''offres structuré : dépôt des candidatures, questions-réponses avec l''AMO, présélection de trois candidats invités à un entretien, remise d''une offre définitive, puis entrée en négociation exclusive avec le candidat le mieux noté. Le détail de la procédure figure dans le règlement de consultation, transmis aux producteurs intéressés.', null, 'public', 12),
  ('producteurs', 'Sur quels critères les offres des producteurs sont-elles jugées ?', 'Les offres sont évaluées selon quatre critères pondérés : le prix proposé (part prépondérante), la flexibilité offerte au collectif (garanties demandées, capacité à absorber des variations de volumes), l''impact carbone, social et environnemental du projet, et le bénéfice apporté au territoire d''implantation de la centrale.', null, 'public', 13),
  ('producteurs', 'Comment obtenir le règlement de consultation et le Term Sheet ?', 'Ces documents sont soumis à une obligation de confidentialité et transmis uniquement aux producteurs ayant manifesté un intérêt confirmé pour la consultation. Utilisez la page Producteurs pour signaler votre intérêt : l''équipe de coordination vous recontactera pour vous transmettre les documents et modalités de participation.', null, 'public', 14),
  ('programme', 'Qui coordonne le programme Territoire Avenir Énergie ?', 'Le programme est coordonné par un assistant à maîtrise d''ouvrage (AMO) composé de GREENBIRDIE, du Club des ETI de Nouvelle-Aquitaine, de Pays Basque Industries et de Mutandis Avocat pour le volet juridique. Retrouvez le rôle de chacun sur la page Partenaires.', null, 'public', 15),
  ('programme', 'Le programme comportera-t-il plusieurs éditions ?', 'Oui. Territoire Avenir Énergie est conçu comme un programme évolutif, susceptible de comporter plusieurs éditions annuelles ou sectorielles. Une deuxième édition est en cours (appel d''offres producteurs ouvert), et une troisième édition est à l''étude pour élargir le périmètre géographique et sectoriel du collectif.', null, 'public', 16),
  ('programme', 'Les contenus de ce site ont-ils une valeur contractuelle ?', 'Non. Les informations présentées sur ce site sont fournies à titre pédagogique et indicatif. Seuls les documents contractuels (règlement de consultation, Term Sheet, PPA, accord-cadre du collectif) font foi entre les parties.', null, 'public', 17),
  ('espace-membres', 'Comment accéder à l''espace membres ?', 'L''espace membres est réservé aux entreprises intégrées au programme. Un accès nominatif est communiqué à chaque entreprise membre après validation de sa candidature : connectez-vous avec votre e-mail professionnel, vous recevrez un lien de connexion sécurisé.', null, 'public', 18),
  ('espace-membres', 'Quelles informations retrouve-t-on dans l''espace membres ?', 'L''espace membres centralise les documents réservés au programme (comptes rendus, supports, documentation contractuelle), le calendrier détaillé des étapes, l''avancement du programme, et une FAQ privée propre à l''édition à laquelle l''entreprise participe.', null, 'public', 19),
  ('espace-membres', 'Comment est calculé mon coefficient de répartition ?', 'Votre coefficient est déterminé collectivement entre les membres du collectif, sur la base de votre consommation annuelle déclarée. Il pourra être ajusté à l''arrivée de nouveaux membres ou à votre demande, sous réserve d''accord du collectif. Le détail du calcul retenu pour l''édition 2 vous sera communiqué par l''AMO lors de la phase de contractualisation.', 'prog-2', 'private', 20),
  ('espace-membres', 'Quand vais-je recevoir mon contrat PPA individuel à signer ?', 'Le PPA individuel de chaque membre sera transmis après la conclusion du Term Sheet avec le producteur retenu, une fois la négociation exclusive achevée. Le calendrier indicatif de l''édition 2 vise une signature au premier trimestre 2027 ; vous serez notifié directement via cet espace dès que votre document sera disponible.', 'prog-2', 'private', 21),
  ('espace-membres', 'Qui contacter en cas de question sur ma facturation à venir ?', 'Les modalités de facturation (mensuelle, individualisée par coefficient de répartition) seront précisées dans votre PPA. En attendant, toute question peut être adressée à GREENBIRDIE, interlocuteur de référence du collectif pour les entreprises membres.', 'prog-2', 'private', 22);

-- =========================================================================
-- 6. Après exécution
-- =========================================================================
-- 1. Connectez-vous une première fois sur /espace-membres/connexion avec
--    votre propre e-mail (magic link) : cela crée automatiquement votre
--    profil (rôle "member", sans entreprise).
-- 2. Pour vous donner un accès admin et/ou vous rattacher à l'entreprise de
--    démonstration, exécutez :
--
--    update public.profiles set role = 'admin' where email = 'votre@email.fr';
--
--    -- ou, pour vous rattacher à l'entreprise de démo :
--    update public.profiles
--    set company_id = (select id from public.companies where name = 'Entreprise Démonstration SAS')
--    where email = 'votre@email.fr';
