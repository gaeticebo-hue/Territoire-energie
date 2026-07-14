import type { FaqItem } from "@/lib/types"

export const faqItems: FaqItem[] = [
  // Achat groupé
  {
    id: "faq-ag-1",
    category: "achat-groupe",
    visibility: "public",
    question: "Qu'est-ce que l'achat groupé d'électricité renouvelable ?",
    answer:
      "L'achat groupé consiste à réunir plusieurs entreprises consommatrices au sein d'un collectif pour négocier ensemble, avec un producteur d'électricité renouvelable, des conditions d'achat plus favorables qu'une entreprise ne pourrait obtenir seule : volumes plus importants, meilleure visibilité pour le producteur, mutualisation des coûts de structuration juridique et technique.",
  },
  {
    id: "faq-ag-2",
    category: "achat-groupe",
    visibility: "public",
    question: "Pourquoi rejoindre un collectif plutôt que négocier seul un contrat d'énergie ?",
    answer:
      "Individuellement, la plupart des ETI et entreprises industrielles n'ont pas la taille critique pour intéresser un producteur à un contrat d'achat direct de long terme. En se regroupant, les entreprises atteignent un volume suffisant pour accéder à un PPA, tout en bénéficiant d'un accompagnement juridique et technique mutualisé, moins coûteux que s'il était supporté individuellement.",
  },
  {
    id: "faq-ag-3",
    category: "achat-groupe",
    visibility: "public",
    question: "Quel est le volume d'électricité visé par le programme ?",
    answer:
      "Pour l'édition en cours (Territoire Avenir Énergie #2), le collectif recherche un approvisionnement compris entre 10 et 13 GWh par an, réparti entre les entreprises membres au prorata de leurs besoins. Ce volume peut faire l'objet d'ajustements marginaux au cours de la négociation avec le producteur retenu.",
  },
  {
    id: "faq-ag-4",
    category: "achat-groupe",
    visibility: "public",
    question: "Mon entreprise est-elle éligible pour rejoindre le collectif ?",
    answer:
      "Le programme s'adresse en priorité aux ETI et entreprises industrielles localisées au Pays Basque et en Nouvelle-Aquitaine, disposant d'une consommation électrique significative et récurrente. D'autres profils peuvent être étudiés au cas par cas : le meilleur point de départ est de déposer une candidature via la page dédiée, qui sera examinée par l'équipe de coordination.",
  },

  // PPA
  {
    id: "faq-ppa-1",
    category: "ppa",
    visibility: "public",
    question: "Qu'est-ce qu'un PPA (Power Purchase Agreement) ?",
    answer:
      "Un PPA est un contrat d'achat direct d'électricité conclu entre un consommateur et un producteur, en dehors des mécanismes classiques de fourniture. Il permet de sécuriser un prix et un volume d'électricité sur une longue durée, indépendamment des variations du marché de gros, tout en garantissant l'origine renouvelable de l'énergie consommée.",
  },
  {
    id: "faq-ppa-2",
    category: "ppa",
    visibility: "public",
    question: "Qu'est-ce qu'un PPA « multi-acheteurs » ?",
    answer:
      "Dans un PPA multi-acheteurs, un même producteur conclut des contrats individuels avec chacune des entreprises du collectif, selon des conditions harmonisées négociées collectivement. Chaque entreprise dispose ainsi d'un contrat propre avec le producteur, mais bénéficie des conditions obtenues grâce à la mutualisation du volume du collectif.",
  },
  {
    id: "faq-ppa-3",
    category: "ppa",
    visibility: "public",
    question: "Comment le prix de l'électricité est-il fixé ?",
    answer:
      "Le règlement de consultation impose aux producteurs candidats de proposer un prix fixe sur toute la durée du contrat, garanties d'origine incluses. Cela permet aux entreprises membres de se couvrir contre la volatilité des prix de marché. Des variantes (prix indexé, durée plus courte) peuvent être proposées par le producteur en complément, mais l'offre de référence reste un prix fixe.",
  },
  {
    id: "faq-ppa-4",
    category: "ppa",
    visibility: "public",
    question: "Qu'est-ce que le mode « pay-as-produced » ?",
    answer:
      "Le collectif s'engage à enlever l'électricité au fil de sa production par la centrale, plutôt qu'un volume fixe à chaque instant. La facturation reflète donc la production réelle (ou une estimation régularisée périodiquement), ce qui est la pratique standard des PPA d'électricité renouvelable.",
  },
  {
    id: "faq-ppa-5",
    category: "ppa",
    visibility: "public",
    question: "Que se passe-t-il si une entreprise membre du collectif fait défaut ?",
    answer:
      "Un mécanisme de solidarité, encadré par un taux de défaut maximal, prévoit que les autres membres du collectif reprennent temporairement les volumes libérés par un membre défaillant, dans une certaine limite. Ce mécanisme protège le producteur et la stabilité du contrat pour l'ensemble du collectif.",
  },
  {
    id: "faq-ppa-6",
    category: "ppa",
    visibility: "public",
    question: "Sur quelle durée les entreprises s'engagent-elles ?",
    answer:
      "Le règlement de consultation retient une durée de PPA de quinze ans à compter de la mise en service de la centrale, ce qui correspond aux standards du marché pour ce type de contrat et permet d'amortir l'investissement du producteur tout en offrant une visibilité de long terme aux entreprises.",
  },

  // Producteurs
  {
    id: "faq-prod-1",
    category: "producteurs",
    visibility: "public",
    question: "Qui peut candidater en tant que producteur ?",
    answer:
      "Tout producteur d'électricité d'origine renouvelable (solaire, éolien, ou toute autre source visée par le code de l'énergie) porteur d'un projet ou d'un actif déjà en exploitation en France métropolitaine peut candidater. Les projets situés en Nouvelle-Aquitaine bénéficient d'une meilleure notation, sans être une condition d'éligibilité.",
  },
  {
    id: "faq-prod-2",
    category: "producteurs",
    visibility: "public",
    question: "Comment se déroule la sélection du producteur ?",
    answer:
      "La sélection suit un processus d'appel d'offres structuré : dépôt des candidatures, questions-réponses avec l'AMO, présélection de trois candidats invités à un entretien, remise d'une offre définitive, puis entrée en négociation exclusive avec le candidat le mieux noté. Le détail de la procédure figure dans le règlement de consultation, transmis aux producteurs intéressés.",
  },
  {
    id: "faq-prod-3",
    category: "producteurs",
    visibility: "public",
    question: "Sur quels critères les offres des producteurs sont-elles jugées ?",
    answer:
      "Les offres sont évaluées selon quatre critères pondérés : le prix proposé (part prépondérante), la flexibilité offerte au collectif (garanties demandées, capacité à absorber des variations de volumes), l'impact carbone, social et environnemental du projet, et le bénéfice apporté au territoire d'implantation de la centrale.",
  },
  {
    id: "faq-prod-4",
    category: "producteurs",
    visibility: "public",
    question: "Comment obtenir le règlement de consultation et le Term Sheet ?",
    answer:
      "Ces documents sont soumis à une obligation de confidentialité et transmis uniquement aux producteurs ayant manifesté un intérêt confirmé pour la consultation. Utilisez la page Producteurs pour signaler votre intérêt : l'équipe de coordination vous recontactera pour vous transmettre les documents et modalités de participation.",
  },

  // Programme
  {
    id: "faq-pg-1",
    category: "programme",
    visibility: "public",
    question: "Qui coordonne le programme Territoire Avenir Énergie ?",
    answer:
      "Le programme est coordonné par un assistant à maîtrise d'ouvrage (AMO) composé de GREENBIRDIE, du Club des ETI de Nouvelle-Aquitaine, de Pays Basque Industries et de Mutandis Avocat pour le volet juridique. Retrouvez le rôle de chacun sur la page Partenaires.",
  },
  {
    id: "faq-pg-2",
    category: "programme",
    visibility: "public",
    question: "Le programme comportera-t-il plusieurs éditions ?",
    answer:
      "Oui. Territoire Avenir Énergie est conçu comme un programme évolutif, susceptible de comporter plusieurs éditions annuelles ou sectorielles. Une deuxième édition est en cours (appel d'offres producteurs ouvert), et une troisième édition est à l'étude pour élargir le périmètre géographique et sectoriel du collectif.",
  },
  {
    id: "faq-pg-3",
    category: "programme",
    visibility: "public",
    question: "Les contenus de ce site ont-ils une valeur contractuelle ?",
    answer:
      "Non. Les informations présentées sur ce site sont fournies à titre pédagogique et indicatif. Seuls les documents contractuels (règlement de consultation, Term Sheet, PPA, accord-cadre du collectif) font foi entre les parties.",
  },

  // Espace membres
  {
    id: "faq-em-1",
    category: "espace-membres",
    visibility: "public",
    question: "Comment accéder à l'espace membres ?",
    answer:
      "L'espace membres est réservé aux entreprises intégrées au programme. Un accès nominatif est communiqué à chaque entreprise membre après validation de sa candidature. La version actuelle du site présente une démonstration de cet espace, en attendant l'activation de l'authentification sécurisée.",
  },
  {
    id: "faq-em-2",
    category: "espace-membres",
    visibility: "public",
    question: "Quelles informations retrouve-t-on dans l'espace membres ?",
    answer:
      "L'espace membres centralise les documents réservés au programme (comptes rendus, supports, documentation contractuelle), le calendrier détaillé des étapes, l'avancement du programme, et une FAQ privée propre à l'édition à laquelle l'entreprise participe.",
  },

  // FAQ privée (réservée aux entreprises membres, propre à l'édition en cours)
  {
    id: "faq-priv-1",
    category: "espace-membres",
    visibility: "private",
    programmeId: "prog-2",
    question: "Comment est calculé mon coefficient de répartition ?",
    answer:
      "Votre coefficient est déterminé collectivement entre les membres du collectif, sur la base de votre consommation annuelle déclarée. Il pourra être ajusté à l'arrivée de nouveaux membres ou à votre demande, sous réserve d'accord du collectif. Le détail du calcul retenu pour l'édition 2 vous sera communiqué par l'AMO lors de la phase de contractualisation.",
  },
  {
    id: "faq-priv-2",
    category: "espace-membres",
    visibility: "private",
    programmeId: "prog-2",
    question: "Quand vais-je recevoir mon contrat PPA individuel à signer ?",
    answer:
      "Le PPA individuel de chaque membre sera transmis après la conclusion du Term Sheet avec le producteur retenu, une fois la négociation exclusive achevée. Le calendrier indicatif de l'édition 2 vise une signature au premier trimestre 2027 ; vous serez notifié directement via cet espace dès que votre document sera disponible.",
  },
  {
    id: "faq-priv-3",
    category: "espace-membres",
    visibility: "private",
    programmeId: "prog-2",
    question: "Qui contacter en cas de question sur ma facturation à venir ?",
    answer:
      "Les modalités de facturation (mensuelle, individualisée par coefficient de répartition) seront précisées dans votre PPA. En attendant, toute question peut être adressée à GREENBIRDIE, interlocuteur de référence du collectif pour les entreprises membres.",
  },
]

export function getFaqByCategory(category: FaqItem["category"]): FaqItem[] {
  return faqItems.filter((f) => f.category === category)
}
