# Territoire Avenir Énergie

Site du programme **Territoire Avenir Énergie** : achat groupé d'électricité
renouvelable pour ETI et entreprises industrielles du Pays Basque et de
Nouvelle-Aquitaine, via un contrat d'achat direct d'énergie (PPA)
multi-acheteurs.

Programme coordonné par GREENBIRDIE, le Club des ETI de Nouvelle-Aquitaine,
Pays Basque Industries et Mutandis Avocat.

## Lancer le site en local

Prérequis : Node.js 20+, un projet Supabase.

```bash
npm install
```

Créez `.env.local` (voir `.env.example`) avec l'URL et la clé `anon public`
de votre projet Supabase (Dashboard → Settings → API) :

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Exécutez `supabase/migrations/0001_init.sql` dans le SQL Editor du dashboard
Supabase (schéma, RLS, données de démonstration) — voir les instructions en
fin de fichier pour vous attribuer un rôle admin après votre première
connexion.

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande        | Effet                                   |
| ---------------- | ---------------------------------------- |
| `npm run dev`     | Démarre le serveur de développement       |
| `npm run build`   | Build de production                       |
| `npm run start`   | Sert le build de production               |
| `npm run lint`    | Lint ESLint                               |

## Ce que contient le site

- **Site public** : accueil, présentation du programme, liste des éditions
  (`/programmes`) et page de détail par édition, candidature entreprise,
  page producteurs ENR (appel d'offres), FAQ pédagogique, ressources,
  partenaires, contact.
- **Espace membres** (`/espace-membres`) : tableau de bord, documents
  réservés, calendrier du programme, FAQ privée. Protégé par une vraie
  authentification Supabase (magic link par e-mail, sans mot de passe) — voir
  `middleware.ts`, `app/espace-membres/connexion/page.tsx` et
  `app/auth/callback/route.ts`.
- **Modèle de données** (`lib/types.ts`) : `Programme`, `Company`,
  `UserProfile`, `Document`, `FaqItem`, `CalendarStep`, `Application`,
  `Partner`. Programmes/calendrier/partenaires restent statiques
  (`lib/data/`) ; comptes, entreprises, adhésions, documents/FAQ privés et
  candidatures vivent dans Supabase (`supabase/migrations/0001_init.sql`).
- **Formulaires** : candidature entreprise et manifestation d'intérêt
  producteur sont enregistrées dans la table `applications` (Supabase). Le
  formulaire de contact reste un simple accusé de réception, sans
  persistance.

## Documents confidentiels de l'appel d'offres

Le règlement de consultation, le Term Sheet et le formulaire de réponse
producteur (disponibles dans `document territoire energie/` à la racine)
sont soumis à une obligation de confidentialité contractuelle. Ils ne sont
**pas** publiés sur le site : les pages publiques renvoient vers une prise de
contact, conformément au processus réel de l'appel d'offres. Voir la section
correspondante de `CLAUDE.md` avant d'ajouter des documents dans `public/`.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Supabase (Auth + Postgres + RLS)
