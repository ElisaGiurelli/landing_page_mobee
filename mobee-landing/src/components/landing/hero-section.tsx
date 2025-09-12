"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import MoobeLogo from "@/components/ui/mobee-logo";

interface HeroSectionProps {
  openDemoModal: () => void;
}

export default function HeroSection({ openDemoModal }: HeroSectionProps) {
  return (
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
                Sei curioso di scoprire? <ArrowRight className="w-5 h-5 ml-2" />
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
                <MoobeLogo className="text-purple-600" width={140} height={120} />
              </div>

              <div className="grid  gap-4 mb-6">
                <img
                  src="/dashboard-screenshot.png"
                  alt="Dashboard AI Analytics"
                  className="w-full rounded-lg mb-6 scale-110 sm:scale-100 transition-transform duration-300"
                />
              </div>

              <div className="text-center">
                <p className="font-body text-sm text-gray-500 mb-2">
                  Dashboard AI
                </p>
                <p className="font-body font-semibold text-gray-800">
                  Insights intelligenti sui tuoi talenti
                </p>
              </div>

              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 shadow-lg"
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
