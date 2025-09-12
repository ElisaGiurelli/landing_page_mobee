import {
  Bot,
  Target,
  TrendingUp,
  TrendingDown,
  Users,
  Star,
  Briefcase,
  ClipboardList,
  User,
} from "lucide-react";

export const features = [
  {
    icon: Bot,
    title: "Assistant AI e Alert",
    description:
      "Assistente virtuale che supporta team leader e HR con notifiche, suggerimenti e report automatici",
    benefits: [
      "Alert per potenziali problemi di team",
      "Report automatici su engagement",
      "Planning & scheduling facilitato",
    ],
    color: "from-purple-200 to-purple-300",
  },
  {
    icon: Target,
    title: "Allocazioni Intelligenti",
    description:
      "Sistema di matching avanzato tra risorse interne e necessità aziendali basato su AI",
    benefits: [
      "Matching tra progetti e competenze",
      "Ottimizzazione basata su disponibilità",
      "Previsione di carico di lavoro",
    ],
    color: "from-yellow-200 to-orange-200",
  },
  {
    icon: TrendingUp,
    title: "Skill Gap Analysis",
    description:
      "Valutazione AI delle competenze esistenti e mancanti con suggerimenti personalizzati di crescita",
    benefits: [
      "Mappatura competenze del team",
      "Percorsi di crescita personalizzati",
      "Raccomandazioni formative specifiche",
    ],
    color: "from-green-200 to-teal-300",
  },
];

export const benefits = [
  {
    icon: TrendingUp,
    title: "Più engagement",
    description:
      "Dipendenti più coinvolti e produttivi grazie all'allocazione intelligente",
    metric: "+32%",
    detail: "Incremento medio engagement",
    color: "bg-green-50 text-green-600 border-green-200",
  },
  {
    icon: Users,
    title: "Più retention",
    description:
      "Fidelizzazione dei talenti attraverso percorsi di crescita personalizzati",
    metric: "-27%",
    detail: "Riduzione abbandono",
    color: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    icon: Star,
    title: "Più motivazione",
    description:
      "Collaboratori più motivati grazie a ruoli allineati alle loro competenze",
    metric: "+40%",
    detail: "Aumento soddisfazione",
    color: "bg-purple-50 text-purple-500 border-purple-200",
  },
  {
    icon: TrendingDown,
    title: "Meno costi turnover",
    description:
      "Riduzione significativa dei costi legati al turnover e onboarding",
    metric: "-35%",
    detail: "Risparmio medio annuo",
    color: "bg-orange-50 text-orange-600 border-orange-200",
  },
];

export const targetAudience = [
  {
    icon: Briefcase,
    title: "Per i CEO",
    description: "Che vogliono crescita senza perdita di talenti.",
    color: "text-purple-500",
  },
  {
    icon: ClipboardList,
    title: "Per l'HR",
    description: "Che vuole tempo per la strategia e meno operatività.",
    color: "text-purple-500",
  },
  {
    icon: Users,
    title: "Per i Manager",
    description: "Che vogliono team motivati, produttivi e autonomi.",
    color: "text-purple-500",
  },
  {
    icon: User,
    title: "Per le Persone",
    description: "Che vogliono essere ascoltate, valorizzate e crescere.",
    color: "text-purple-500",
  },
];

export const navigationLinks = [
  { href: "#funzionalita", label: "Funzionalità" },
  { href: "#vantaggi", label: "Vantaggi" },
];

export const footerLinks = {
  quickLinks: ["Home", "Funzionalità", "Vantaggi"],
};

export const contactInfo = {
  email: "mobee.mirai@gmail.com",
  phone: "+39 338 1903839",
  location: "Roma, Italia",
};

export const problemStats = [
  {
    stat: "1/3",
    title: "Dipendenti Insoddisfatti",
    description: "non è soddisfatto del proprio ruolo*",
    note: "*Randstad Employer Brand Research 2023",
    color: "bg-red-50 border-red-200 text-red-800",
  },
  {
    stat: "73.1%",
    title: "Aziende in Difficoltà",
    description: "cerca attivamente soluzioni HR innovative",
    note: "",
    color: "bg-blue-50 border-blue-200 text-blue-800",
  },
  {
    stat: "5%",
    title: "Engagement Reale",
    description: "dei dipendenti è veramente coinvolto",
    note: "",
    color: "bg-yellow-50 border-yellow-200 text-yellow-800",
  },
];

export const solutionFeatures = [
  { icon: Briefcase, label: "Valutazione AI" },
  { icon: Users, label: "Allocazione intelligente" },
  { icon: TrendingUp, label: "Crescita personalizzata" },
];

// Animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.8 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.8, delay: 0.2 },
};
