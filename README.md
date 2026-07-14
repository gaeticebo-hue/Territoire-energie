# Territoire Avenir Énergie

Site du programme **Territoire Avenir Énergie** : achat groupé d'électricité
renouvelable pour ETI et entreprises industrielles du Pays Basque et de
Nouvelle-Aquitaine, via un contrat d'achat direct d'énergie (PPA)
multi-acheteurs.

Programme coordonné par GREENBIRDIE, le Club des ETI de Nouvelle-Aquitaine,
Pays Basque Industries et Mutandis Avocat.

## Lancer le site en local

Prérequis : Node.js 20+.

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

Aucune variable d'environnement n'est requise pour le moment (voir
`.env.example` — réservé à la future intégration Supabase).

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
  réservés, calendrier du programme, FAQ privée. **Il s'agit actuellement
  d'une démonstration d'interface, sans authentification réelle** — voir
  le bandeau affiché sur ces pages et `lib/auth/session.ts`.
- **Modèle de données** (`lib/types.ts`) : `Programme`, `Company`,
  `UserProfile`, `Document`, `FaqItem`, `CalendarStep`, `Application`,
  `Partner`. Données statiques dans `lib/data/`.
- **Formulaires** : candidature entreprise, manifestation d'intérêt
  producteur, contact. Ils appellent des routes API (`app/api/*`) qui
  valident et acquittent la requête, sans persistance ni CRM — voir
  `CLAUDE.md` pour le raccordement futur à Supabase.

## Documents confidentiels de l'appel d'offres

Le règlement de consultation, le Term Sheet et le formulaire de réponse
producteur (disponibles dans `document territoire energie/` à la racine)
sont soumis à une obligation de confidentialité contractuelle. Ils ne sont
**pas** publiés sur le site : les pages publiques renvoient vers une prise de
contact, conformément au processus réel de l'appel d'offres. Voir la section
correspondante de `CLAUDE.md` avant d'ajouter des documents dans `public/`.

## Prochaines étapes techniques

Voir `CLAUDE.md` (section « Prochaines étapes ») pour le raccordement à
Supabase : authentification, documents privés réels, gestion des rôles.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4
