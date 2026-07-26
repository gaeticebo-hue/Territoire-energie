import type { Partner } from "@/lib/types"

export const partners: Partner[] = [
  {
    id: "greenbirdie",
    name: "GREENBIRDIE",
    role: "Coordinateur du programme (AMO)",
    description:
      "GREENBIRDIE accompagne les entreprises dans leur stratégie énergétique et pilote la coordination d'ensemble du programme Territoire Avenir Énergie, en lien avec les partenaires territoriaux et le conseil juridique. GREENBIRDIE est l'interlocuteur central des entreprises et des producteurs.",
    website: "https://www.greenbirdie.com/",
    contactName: "Gaëtan Collin, Président",
    contactEmail: "gaetan.collin@greenbirdie.fr",
    city: "Paris",
    logoUrl: "/logos/greenbirdie.png",
  },
  {
    id: "club-eti-na",
    name: "Club des ETI de Nouvelle-Aquitaine",
    role: "Partenaire territorial",
    description:
      "Le Club des ETI de Nouvelle-Aquitaine fédère les entreprises de taille intermédiaire de la région et porte, aux côtés de Pays Basque Industries, l'ambition du programme auprès de ses adhérents.",
    website: "https://www.clubeti-na.fr/",
    contactName: "Grégoire Le Taillandier, Délégué Général",
    contactEmail: "gregoire.letaillandier@clubeti-na.fr",
    city: "Saint-Jean-d'Illac",
    logoUrl: "/logos/club-eti-na.png",
  },
  {
    id: "pays-basque-industries",
    name: "Pays Basque Industries",
    role: "Partenaire territorial",
    description:
      "Association d'entreprises industrielles du Pays Basque, Pays Basque Industries est à l'initiative du programme Territoire Avenir Énergie et mobilise son réseau d'adhérents autour de la démarche collective.",
    website: "https://paysbasque-industries.com/",
    contactName: "Thibaut Hourquebie, Délégué Général",
    contactEmail: "t.hourquebie@paysbasque-industries.com",
    city: "Bayonne",
    logoUrl: "/logos/pays-basque-industries.png",
  },
  {
    id: "mutandis-avocat",
    name: "Mutandis Avocat",
    role: "Conseil juridique",
    description:
      "Mutandis Avocat sécurise juridiquement la structuration du programme, la rédaction des documents contractuels (Term Sheet, PPA, accord-cadre du collectif) et la conduite de la négociation avec le producteur retenu.",
    website: "https://www.mutandis-avocat.fr/",
    contactName: "Me Benoit Denis",
    contactEmail: "b.denis@mutandis-avocat.fr",
    city: "Paris",
    logoUrl: "/logos/mutandis-avocat.png",
  },
  {
    id: "region-nouvelle-aquitaine",
    name: "Région Nouvelle-Aquitaine",
    role: "Partenaire institutionnel (édition 1)",
    description:
      "La Région Nouvelle-Aquitaine a initié dès 2021, avec le Club des ETI de Nouvelle-Aquitaine, le dispositif d'accompagnement des ETI à la contractualisation de PPA à l'origine de la première édition du programme.",
    website: "https://www.neo-terra.fr",
    city: "Bordeaux",
    showcase: false,
  },
  {
    id: "llc-avocats",
    name: "LLC Avocats",
    role: "Conseil juridique (édition 1)",
    description:
      "LLC Avocats a assuré le conseil juridique et contractuel pour la structuration et la négociation du PPA multi-acheteurs de la première édition du programme.",
    showcase: false,
  },
]
