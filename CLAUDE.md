# Territoire Avenir Énergie — CLAUDE.md

Instructions de travail pour ce dépôt. Le contexte métier détaillé (règlement
de consultation, Term Sheet, formulaire de réponse producteur) se trouve dans
`document territoire energie/` à la racine du projet.

## Le projet

Site institutionnel du programme Territoire Avenir Énergie : achat groupé
d'électricité renouvelable pour ETI et entreprises industrielles du Pays
Basque et de Nouvelle-Aquitaine, via un contrat d'achat direct d'énergie
(PPA) multi-acheteurs négocié collectivement avec un producteur ENR
sélectionné par appel d'offres.

Coordination du programme : GREENBIRDIE (AMO), Club des ETI de
Nouvelle-Aquitaine, Pays Basque Industries, Mutandis Avocat (juridique).

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4 (thème défini en CSS
  dans `app/globals.css` via `@theme`, pas de `tailwind.config.js`).
- Supabase (Postgres + Auth) pour l'espace membres et les données
  privées/candidatures — voir `lib/supabase/*` et
  `supabase/migrations/0001_init.sql`. Le contenu éditorial public
  (programmes, calendrier, partenaires) reste statique dans `lib/data/*.ts`.
- Authentification réelle par magic link (Supabase Auth, sans mot de passe) :
  `app/espace-membres/connexion/page.tsx` + `app/auth/callback/route.ts` +
  `middleware.ts` (protection des routes `/espace-membres/*`).

## Architecture

```
app/                        Pages (App Router)
  (pages publiques au niveau racine : le-programme, programmes, candidater,
  producteurs, faq, ressources, partenaires, contact)
  api/candidatures/route.ts Valide puis insère dans la table `applications`
  api/contact/route.ts      Idem, pour le formulaire de contact (pas de persistance)
  auth/callback/route.ts    Échange le code du magic link contre une session
  espace-membres/           Zone privée réelle, protégée par middleware.ts
components/
  layout/                   Header, Footer, Logo, PageHeader
  ui/                       Button, Badge, Card, SectionHeading, Field (primitives)
  home/                     Sections de la page d'accueil
  programmes/                ProgrammeCard, StatusBadge, ProgrammeTimeline
  faq/                      FaqAccordion, FaqExplorer
  forms/                    Formulaires client (candidature, contact)
  documents/                DocumentCard
  members/                  MemberNav (avec déconnexion), ProgrammeProgress
lib/
  types.ts                  Modèle de données (Programme, Company, UserProfile,
                             Document, FaqItem, CalendarStep, Application, Partner)
  data/                     programmes/calendrier/partenaires statiques ;
                             documents/faq/adhesions interrogent Supabase (async)
  auth/session.ts           Lecture de la session Supabase réelle (server-side)
  supabase/client.ts        Client navigateur (createBrowserClient)
  supabase/server.ts        Client serveur (Server Components / Route Handlers)
  supabase/types.ts         Typage Database à la main (à régénérer via
                             `supabase gen types typescript` si la CLI est configurée)
middleware.ts                Rafraîchit la session et protège /espace-membres/*
supabase/migrations/0001_init.sql  Schéma, RLS, seed — à exécuter dans le SQL Editor Supabase
```

## Modèle de données

Le modèle de données (types `Programme`, `Company`, `UserProfile`,
`Document`) doit rester conforme à celui fourni initialement. La relation
entreprise ↔ programmes vit dans la table `memberships` (Supabase), pas comme
un champ ajouté sur les types existants.

Row Level Security (voir `supabase/migrations/0001_init.sql`) restreint déjà
`documents` et `faq_items` privés aux membres de l'entreprise concernée (via
`memberships`), et `applications` en lecture aux seuls admins. Toute nouvelle
table privée doit suivre le même principe : policy `select` conditionnée par
`auth.uid()` via `profiles`/`memberships`, jamais de filtrage uniquement côté
client.

## Contenu et confidentialité — règle importante

Le règlement de consultation, le Term Sheet et le formulaire de réponse
producteur sont des documents **confidentiels** (obligation contractuelle de
confidentialité de 2 à 5 ans selon les documents). En conséquence :

- Ne jamais copier ces fichiers PDF/DOCX réels dans `public/` ou tout
  emplacement servi publiquement par le site.
- Les entrées `documents` correspondantes restent `visibility: 'private'`
  avec `file_url: '#'` (placeholder) tant qu'aucun stockage sécurisé
  (Supabase Storage + RLS sur le bucket) n'est branché.
- Sur les pages publiques (Ressources, Producteurs), présenter ces documents
  comme transmis sur demande / après qualification, pas en téléchargement
  direct.

Plus généralement : ne pas créer de contenu juridique engageant. Toute page
qui évoque les mécanismes contractuels du PPA doit rester pédagogique et
rappeler que les documents contractuels font seuls foi (voir le disclaimer
en bas de `/le-programme` et `/faq`).

## Ton éditorial

Professionnel, pédagogique, rassurant. Public cible : dirigeants
d'entreprise, DAF, responsables énergie, industriels — non spécialistes du
marché de l'électricité mais exigeants. Éviter le jargon non expliqué et les
formulations trop commerciales.

## Design

Palette définie dans `app/globals.css` (`@theme`) :
- `brand-*` : bleu institutionnel (identité du programme, header/footer/CTA)
- `energy-*` : vert transition énergétique (accents, badges de statut positif)
- `neutral-*` : gris clair pour le texte secondaire et les fonds

Pas de photographies/stock — le design s'appuie sur la typographie, des
formes géométriques simples (SVG inline), la couleur, et les logos des
partenaires (`public/logos/`, voir `Partner.logoUrl`). Rester sobre,
institutionnel, accessible (contraste AA, focus visibles) et responsive
mobile-first.

## Ce qui est volontairement hors périmètre

- Pas de logique de paiement.
- Pas de CRM/pipeline de suivi des candidatures au-delà de la table
  `applications` (statut `new` par défaut) — un tri/traitement manuel via le
  SQL Editor ou une interface admin future reste à faire, non anticipé ici.
- Pas d'interface d'administration pour gérer les rôles/rattachements
  d'entreprise : cela se fait par requête SQL directe (voir commentaires en
  fin de `supabase/migrations/0001_init.sql`).

Avant d'ajouter l'un de ces éléments, vérifier que c'est bien demandé
explicitement plutôt que de l'anticiper.

## Supabase — état et opérations courantes

- Variables d'environnement dans `.env.local` (non commité) : voir
  `.env.example`. Seules `NEXT_PUBLIC_SUPABASE_URL` et
  `NEXT_PUBLIC_SUPABASE_ANON_KEY` sont utilisées côté code — jamais la clé
  `service_role` ni le mot de passe de la base dans le dépôt ou le code.
- Migration à appliquer manuellement (SQL Editor du dashboard Supabase,
  copier-coller de `supabase/migrations/0001_init.sql`) : ce projet n'utilise
  pas encore la CLI Supabase pour les migrations automatisées.
- Nouvel utilisateur : la première connexion (magic link) crée
  automatiquement une ligne `profiles` (rôle `member`, sans entreprise) via
  le trigger `handle_new_user`. Le rattachement à une entreprise et le rôle
  `admin` se font par `UPDATE public.profiles ...` (voir fin de la migration).
