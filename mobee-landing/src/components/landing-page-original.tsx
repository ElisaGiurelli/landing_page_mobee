"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DemoModal from "@/components/demo-modal";
import { Toaster } from "react-hot-toast";
import {
  CheckCircle,
  Users,
  Bot,
  Target,
  TrendingUp,
  TrendingDown,
  Star,
  Briefcase,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  Hexagon,
  Zap,
  ClipboardList,
  User,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const openDemoModal = () => setIsDemoModalOpen(true);
  const closeDemoModal = () => setIsDemoModalOpen(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 25]);

  const features = [
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

  const benefits = [
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
  const targetAudience = [
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-yellow-50/20 overflow-x-hidden">
      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 right-10 text-yellow-200/40"
        >
          <Hexagon className="w-32 h-32" />
        </motion.div>
        <motion.div
          style={{ y: y2 }}
          className="absolute top-40 left-10 text-purple-200/40"
        >
          <Hexagon className="w-24 h-24" />
        </motion.div>
        <motion.div
          style={{ y: y1 }}
          className="absolute bottom-40 right-1/4 text-yellow-300/30"
        >
          <Hexagon className="w-20 h-20" />
        </motion.div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-purple-100/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Hexagon className="w-10 h-10 text-purple-500 fill-yellow-400" />
                <Sparkles className="w-4 h-4 text-purple-500 absolute top-1 right-1" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-gray-900">
                  moobee
                </h1>
                <p className="text-xs text-purple-500 font-body font-medium">
                  AI Talent Management
                </p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#funzionalita"
                className="text-gray-600 hover:text-purple-500 font-body font-medium transition-colors"
              >
                Funzionalità
              </a>
              <a
                href="#vantaggi"
                className="text-gray-600 hover:text-purple-500 font-body font-medium transition-colors"
              >
                Vantaggi
              </a>
              <Button
                onClick={openDemoModal}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6"
              >
                Demo
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-heading text-5xl md:text-6xl font-bold leading-tight mb-6">
                Costruisci un lavoro dove i{" "}
                <span className="text-yellow-500">talenti</span>
                <br /> scelgono di
                <span className="text-purple-600"> restare</span>
                <br />
              </h1>

              <p className="font-body text-xl text-gray-600 mb-8 leading-relaxed">
                Moobe è la piattaforma che aiuta PMI e mid-market a eliminare il
                caos organizzativo e far crescere il business partendo dalle
                persone che hanno già.
              </p>

              <div className="bg-yellow-100/60 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
                <p className="italic font-body text-gray-700 font-medium">
                  &ldquo;Aiutiamo le aziende a valorizzare il talento che hanno
                  già, come un alveare dove ogni persona conta&rdquo;
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={openDemoModal}
                  size="lg"
                  className="font-heading font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-4 text-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Prenota una Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-heading font-semibold border-purple-200 text-purple-700 hover:bg-purple-50 rounded-full px-8 py-4 text-lg"
                >
                  Sei curioso di scoprire?{" "}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Hexagon className="w-8 h-8 text-purple-500 fill-yellow-400" />
                  <span className="font-heading font-bold text-xl text-gray-900">
                    moobee
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-16 rounded-lg ${
                        i < 3 ? "bg-yellow-200" : "bg-gray-100"
                      }`}
                    />
                  ))}
                </div>

                <div className="text-center">
                  <p className="font-body text-sm text-gray-500 mb-2">
                    Dashboard AI
                  </p>
                  <p className="font-body font-semibold text-gray-800">
                    Insights intelligenti sui tuoi talenti
                  </p>
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4  bg-yellow-400 rounded-full p-3 shadow-lg"
                >
                  <Zap className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Un problema che viviamo ogni giorno
            </h2>
            <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto">
              Le aziende faticano a coinvolgere i dipendenti e collocarli nei
              ruoli giusti, causando insoddisfazione, turnover elevato e perdita
              di talenti.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
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
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card
                  className={`text-center border-2 ${item.color
                    .replace("text-", "border-")
                    .replace(
                      "-800",
                      "-200"
                    )} hover:shadow-lg transition-all duration-300`}
                >
                  <CardHeader className="pb-4">
                    <CardTitle
                      className={`text-6xl font-bold ${
                        item.color.split(" ")[2]
                      } mb-4`}
                    >
                      {item.stat}
                    </CardTitle>
                    <h3 className="text-xl font-bold text-gray-900">
                      {item.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    {item.note && (
                      <p className="text-xs text-gray-400">{item.note}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gradient-to-r from-purple-100 to-purple-200 text-gray-700 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 6,
                delay: i * 1,
                repeat: Infinity,
              }}
              className={`absolute text-yellow-300/20 ${
                i % 2 === 0 ? "top-10" : "bottom-10"
              } ${i < 3 ? "left-1/4" : "right-1/4"}`}
            >
              <Hexagon className="w-12 h-12" />
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                AI per valorizzare i{" "}
                <span className="text-purple-500">talenti esistenti</span>
              </h2>
              <p className="font-body text-xl text-gray-600 mb-8">
                Moobe è la prima piattaforma AI Assistant in Italia per Talent
                Management che aumenta l&apos;engagement e semplifica la
                pianificazione in base a skill, disponibilità e preferenze.
              </p>

              <div className="flex gap-4 mb-8 ms-10 sm:ms-0">
                {[
                  { icon: Briefcase, label: "Valutazione AI" },
                  { icon: Users, label: "Allocazione intelligente" },
                  { icon: TrendingUp, label: "Crescita personalizzata" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="text-center"
                  >
                    <div className="bg-[#f8f0ff] rounded-full p-4 mb-3 inline-block">
                      <item.icon className="w-6 h-6 text-purple-500" />
                    </div>
                    <p className="font-body text-sm font-medium">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-purple-200">
                <p className="font-body text-lg font-semibold mb-2 text-gray-800">
                  Risultati: Più engagement, più retention, meno caos operativo
                </p>
                <p className="font-body text-gray-600">
                  La differenza? Non solo dashboard: Moobe AI propone la
                  prossima azione chiara e prioritaria.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-12 rounded-lg ${
                        [0, 1, 4, 5].includes(i)
                          ? "bg-purple-100"
                          : "bg-gray-50"
                      }`}
                    />
                  ))}
                </div>

                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="font-heading text-purple-700 font-semibold">
                    Dashboard AI
                  </p>
                  <p className="font-body text-purple-500 text-sm">
                    Insights intelligenti sui tuoi talenti
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funzionalita" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Le Funzionalità di Moobe
            </h2>
            <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto">
              Le tre funzionalità chiave della nostra piattaforma AI per talent
              management
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-md transition-all duration-500 border border-gray-100 bg-white rounded-2xl p-8">
                  <CardHeader className="text-center pb-6">
                    <div
                      className={`mx-auto mb-4 p-4 rounded-2xl bg-gradient-to-r ${feature.color} inline-block`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="font-heading text-2xl font-bold text-gray-800 mb-3">
                      {feature.title}
                    </CardTitle>
                    <p className="font-body text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="font-body font-semibold text-gray-900 mb-4">
                        Funzioni principali:
                      </p>
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="font-body text-gray-600">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-6 inline-block">
              <div className="flex items-center gap-2 text-purple-500">
                <Sparkles className="w-5 h-5" />
                <p className="font-body font-semibold text-gray-700">
                  Tutte le funzionalità sono completamente integrate tra loro
                  per un&apos;esperienza utente fluida
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="vantaggi" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Investire nei <span className="text-yellow-500">talenti</span>{" "}
              conviene
            </h2>
            <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto">
              Scopri come Moobe trasforma la gestione dei talenti in un
              vantaggio competitivo misurabile per la tua azienda
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`text-center border rounded-2xl p-8 bg-white hover:shadow-md transition-all duration-500 h-full ${
                    benefit.color.includes("green")
                      ? "border-green-200"
                      : benefit.color.includes("blue")
                      ? "border-blue-200"
                      : benefit.color.includes("purple")
                      ? "border-purple-200"
                      : "border-orange-200"
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div
                      className={`mx-auto mb-4 p-3 rounded-full ${benefit.color} inline-block`}
                    >
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="font-heading text-xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </CardTitle>
                    <p className="font-body text-gray-600 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`bg-gray-50/50 rounded-lg p-4 border ${
                        benefit.color.includes("green")
                          ? "border-green-100"
                          : benefit.color.includes("blue")
                          ? "border-blue-100"
                          : benefit.color.includes("purple")
                          ? "border-purple-100"
                          : "border-orange-100"
                      }`}
                    >
                      <p
                        className={`text-3xl font-bold mb-1 ${
                          benefit.color.includes("green")
                            ? "text-green-500"
                            : benefit.color.includes("blue")
                            ? "text-blue-500"
                            : benefit.color.includes("purple")
                            ? "text-purple-500"
                            : "text-orange-500"
                        }`}
                      >
                        {benefit.metric}
                      </p>
                      <p className="font-body text-gray-600 text-sm">
                        {benefit.detail}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-white rounded-2xl p-8 border border-purple-100 shadow-sm">
              <h3 className="font-heading text-2xl font-bold text-gray-800 mb-4">
                Meno caos operativo, più risultati
              </h3>
              <p className="font-body text-gray-600 mb-6">
                Visualizzazione dashboard con metriche di performance del team
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-8 rounded ${
                      i < 6 ? "bg-green-100" : "bg-gray-100"
                    }`}
                  />
                ))}
              </div>
              <p className="font-body text-sm text-gray-600 mt-4 font-medium">
                Dashboard Performance Team
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Per chi è Moobe?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {targetAudience.map((target, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full bg-white text-center p-8 rounded-2xl border-gray-200 hover:shadow-purple-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <target.icon className="w-6 h-6 text-purple-500" />
                    </div>
                  </div>
                  <h3
                    className={`font-heading text-xl font-bold ${target.color} mb-3`}
                  >
                    {target.title}
                  </h3>
                  <p className="font-body text-gray-600 leading-relaxed">
                    {target.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-200 to-purple-300 text-gray-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Pronto a valorizzare i talenti nella tua azienda?
            </h2>
            <p className="font-body text-xl text-gray-600 mb-10">
              Richiedi una demo personalizzata e scopri come Moobe può
              trasformare il tuo team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={openDemoModal}
                size="lg"
                className="font-heading font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-4 text-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Prenota una Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Hexagon className="w-8 h-8 text-purple-400 fill-yellow-400" />
                <span className="font-heading text-2xl font-bold">moobee</span>
              </div>
              <p className="font-body text-gray-400 leading-relaxed">
                Aiutiamo le aziende a valorizzare il talento che hanno già, come
                un alveare dove ogni persona conta.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-4">
                Link rapidi
              </h4>
              <div className="space-y-2">
                {["Home", "Funzionalità", "Vantaggi", "Pricing", "Blog"].map(
                  (link) => (
                    <a
                      key={link}
                      href="#"
                      className="font-body block text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-4">Risorse</h4>
              <div className="space-y-2">
                {[
                  "Documentazione",
                  "Case Study",
                  "FAQ",
                  "Assistenza",
                  "Webinar",
                ].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="font-body block text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-bold text-lg mb-4">Contatti</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-5 h-5" />
                  <span className="font-body">mobee.mirai@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-5 h-5" />
                  <span className="font-body">+39 338 1903839</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-5 h-5" />
                  <span className="font-body">Milano, Italia</span>
                </div>
              </div>

              <div className="mt-6">
                <h5 className="font-body font-semibold mb-3">Newsletter</h5>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Ricevi aggiornamenti"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <Button
                    size="sm"
                    className="bg-purple-500 hover:bg-purple-700"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="font-body text-gray-400">
                © 2025 Moobe. Tutti i diritti riservati.
              </p>
              <div className="flex gap-6 text-gray-400">
                <a
                  href="#"
                  className="font-body hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="font-body hover:text-white transition-colors"
                >
                  Termini di Servizio
                </a>
                <a
                  href="#"
                  className="font-body hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      <DemoModal isOpen={isDemoModalOpen} onClose={closeDemoModal} />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
