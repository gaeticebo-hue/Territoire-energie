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
- Pas de base de données : les données sont statiques, dans `lib/data/*.ts`,
  typées par `lib/types.ts`.
- Pas d'authentification réelle : l'espace membres (`app/espace-membres/*`)
  est une démonstration d'interface (voir `lib/auth/session.ts`), clairement
  annoncée comme telle via `components/members/DemoBanner.tsx`. Ne jamais
  faire croire à une protection d'accès qui n'existe pas.

## Architecture

```
app/                        Pages (App Router)
  (pages publiques au niveau racine : le-programme, programmes, candidater,
  producteurs, faq, ressources, partenaires, contact)
  api/candidatures/route.ts Validation + accusé de réception (pas de persistance)
  api/contact/route.ts      Idem, pour le formulaire de contact
  espace-membres/           Zone privée (démo), layout dédié avec bandeau + sous-nav
components/
  layout/                   Header, Footer, Logo, PageHeader
  ui/                       Button, Badge, Card, SectionHeading, Field (primitives)
  home/                     Sections de la page d'accueil
  programmes/                ProgrammeCard, StatusBadge, ProgrammeTimeline
  faq/                      FaqAccordion, FaqExplorer
  forms/                    Formulaires client (candidature, contact)
  documents/                DocumentCard
  members/                  DemoBanner, MemberNav, ProgrammeProgress
lib/
  types.ts                  Modèle de données (Programme, Company, UserProfile,
                             Document, FaqItem, CalendarStep, Application, Partner)
  data/                     Données statiques, une source de vérité par entité
  auth/session.ts           Session de démonstration (PAS un vrai mécanisme d'auth)
  supabase/client.ts        Point d'entrée réservé à la future intégration Supabase
```

## Modèle de données

Le modèle de données (types `Programme`, `Company`, `UserProfile`,
`Document`) doit rester conforme à celui fourni initialement. Toute relation
supplémentaire (ex. l'appartenance d'une entreprise à un ou plusieurs
programmes) se modélise comme une relation séparée (voir
`lib/data/adhesions.ts`), pas comme un champ ajouté sur les types existants,
sauf besoin explicite.

Quand la persistance réelle sera branchée (Supabase), les tables doivent
suivre `lib/types.ts` et appliquer du Row Level Security pour restreindre les
documents et données privées selon le rôle et l'entreprise de l'utilisateur.

## Contenu et confidentialité — règle importante

Le règlement de consultation, le Term Sheet et le formulaire de réponse
producteur sont des documents **confidentiels** (obligation contractuelle de
confidentialité de 2 à 5 ans selon les documents). En conséquence :

- Ne jamais copier ces fichiers PDF/DOCX réels dans `public/` ou tout
  emplacement servi publiquement par le site.
- Les entrées `Document` correspondantes restent `visibility: "private"` avec
  `fileUrl: "#"` (placeholder) tant qu'aucun stockage sécurisé (Supabase
  Storage + RLS) n'est branché.
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
formes géométriques simples (SVG inline) et la couleur. Rester sobre,
institutionnel, accessible (contraste AA, focus visibles) et responsive
mobile-first.

## Ce qui est volontairement hors périmètre

- Pas de logique de paiement.
- Pas de CRM (les candidatures sont validées et acquittées via
  `app/api/candidatures/route.ts`, sans persistance ni pipeline de suivi).
- Pas d'authentification réelle tant que Supabase n'est pas branché.

Avant d'ajouter l'un de ces éléments, vérifier que c'est bien demandé
explicitement plutôt que de l'anticiper.

## Prochaines étapes (Supabase)

1. `npm install @supabase/supabase-js @supabase/ssr`
2. Renseigner `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   (voir `.env.example`)
3. Remplacer `lib/supabase/client.ts` par un vrai client (browser + serveur)
4. Remplacer `lib/auth/session.ts` par une lecture de session réelle, avec
   redirection vers `/espace-membres/connexion` si absente
5. Créer les tables selon `lib/types.ts`, avec RLS
6. Brancher `app/api/candidatures/route.ts` et `app/api/contact/route.ts` sur
   la persistance réelle (insertion + notification e-mail à l'AMO)
