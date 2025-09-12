"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DemoModal from "@/components/demo-modal";
import KlaroConsent from "@/components/klaro-consent";
import { Toaster } from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  Linkedin,
} from "lucide-react";
import { motion } from "framer-motion";

// Import UI components
import MoobeLogo from "@/components/ui/mobee-logo";

// Import our new components
import HeroSection from "@/components/landing/hero-section";
import ProblemStats from "@/components/landing/problem-stats";
import FeatureCard from "@/components/landing/feature-card";
import BenefitCard from "@/components/landing/benefit-card";
import DecorativeHexagons, {
  SolutionHexagons,
} from "@/components/landing/decorative-hexagons";

// Import data
import {
  features,
  benefits,
  targetAudience,
  navigationLinks,
  footerLinks,
  contactInfo,
  solutionFeatures,
  fadeInUp,
  fadeInLeft,
  scaleIn,
} from "@/lib/landing-data";

export default function LandingPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const openDemoModal = () => setIsDemoModalOpen(true);
  const closeDemoModal = () => setIsDemoModalOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-yellow-50/20 overflow-x-hidden">
      <DecorativeHexagons />

      {/* Header */}
      <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-purple-100/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MoobeLogo className="text-purple-600" width={160} height={130} />
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {navigationLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
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

      <HeroSection openDemoModal={openDemoModal} />
      <ProblemStats />

      {/* Solution Section */}
      <section className="section-padding bg-gradient-to-r from-purple-100 to-purple-200 text-gray-700 relative overflow-hidden">
        <SolutionHexagons />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInLeft}>
              <h2 className="section-title mb-6 text-gray-800">
                AI per valorizzare i{" "}
                <span className="text-purple-500">talenti esistenti</span>
              </h2>
              <p className="font-body text-xl text-gray-600 mb-8">
                Moobe è la prima piattaforma AI Assistant in Italia per Talent
                Management che aumenta l&apos;engagement e semplifica la
                pianificazione in base a skill, disponibilità e preferenze.
              </p>

              <div className="flex gap-4 mb-8 ms-10 sm:ms-0">
                {solutionFeatures.map((item, index) => (
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

            <motion.div {...scaleIn} className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <img
                  src="/screenshot-dashboard.png"
                  alt="Dashboard AI Analytics"
                  className="w-full rounded-lg mb-6 scale-110 sm:scale-100 transition-transform duration-300"
                />
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
      <section id="funzionalita" className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="section-title text-gray-900 mb-6">
              Le Funzionalità di Moobe
            </h2>
            <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto">
              Le tre funzionalità chiave della nostra piattaforma AI per talent
              management
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
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
      <section id="vantaggi" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="section-title mb-6">
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
              <BenefitCard key={index} benefit={benefit} index={index} />
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
                Monitora e <span className="text-purple-600">valorizza</span>{" "}
                ogni talento
              </h3>
              <p className="font-body text-gray-600 mb-6">
                Dashboard intelligenti per HR manager che trasformano i dati in
                decisioni strategiche per la crescita
              </p>
              <div className="mx-auto md:max-w-2xl grid gap-4">
                <img
                  src="/screenshot-dashboard.2.png"
                  alt="Dashboard AI Analytics"
                  className="w-full rounded-lg mb-6 scale-110 sm:scale-100 transition-transform duration-300"
                />
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 flex items-center justify-center h-12">
                <p className="font-body text-sm text-gray-700 font-medium">
                  Profilo del talento · Vista HR
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="section-title text-gray-900 mb-6">
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
                <Card className="h-full bg-white text-center p-8 rounded-2xl border-gray-200 card-hover hover:shadow-purple-100 hover:shadow-lg hover:-translate-y-1">
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
      <section className="section-padding bg-gradient-to-r from-purple-200 to-purple-300 text-gray-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="section-title mb-6 text-gray-800">
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
          <div className="grid md:grid-cols-3 gap-8">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center gap-3 ">
                <MoobeLogo
                  className="text-purple-400"
                  width={140}
                  height={120}
                />
              </div>
              <p className="font-body text-gray-400 leading-relaxed">
                Aiutiamo le aziende a valorizzare il talento che hanno già, come
                un alveare dove ogni persona conta.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer-heading">Link rapidi</h4>
              <div className="space-y-2">
                {footerLinks.quickLinks.map((link) => (
                  <a key={link} href="#" className="footer-link">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="footer-heading">Contatti</h4>
              <div className="space-y-3">
                <a 
                  href={`mailto:${contactInfo.email}?subject=🐝 Richiesta informazioni Moobe`}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-body">{contactInfo.email}</span>
                </a>
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-5 h-5" />
                  <span className="font-body">{contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-5 h-5" />
                  <span className="font-body">{contactInfo.location}</span>
                </div>
                
                <div className="mt-6">
                  <h5 className="font-heading text-white text-sm font-semibold mb-3">Seguici</h5>
                  <div className="flex gap-3">
                    <a
                      href="https://www.linkedin.com/company/moobeeai?trk=public_profile_experience-item_profile-section-card_image-click"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
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
                  href="/privacy-policy"
                  className="font-body hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/termini-servizio"
                  className="font-body hover:text-white transition-colors"
                >
                  Termini di Servizio
                </a>
                <a
                  href="/cookie-policy"
                  className="font-body hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.klaro) {
                      try {
                        // Klaro espone la funzione show() direttamente
                        if (typeof window.klaro.show === 'function') {
                          window.klaro.show();
                        } else {
                          console.warn('Klaro show function not available');
                          console.log('Available Klaro methods:', Object.keys(window.klaro));
                        }
                      } catch (error) {
                        console.error('Error showing cookie manager:', error);
                      }
                    } else {
                      console.warn('Klaro not loaded yet. Please wait a moment and try again.');
                    }
                  }}
                  className="font-body hover:text-white transition-colors text-gray-400 text-sm"
                >
                  Gestisci Cookie
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <DemoModal isOpen={isDemoModalOpen} onClose={closeDemoModal} />
      <KlaroConsent />
      <Toaster />
    </div>
  );
}
