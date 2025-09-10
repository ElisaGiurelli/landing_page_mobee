"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { problemStats, fadeInUp } from "@/lib/landing-data";

export default function ProblemStats() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="section-title text-gray-900 mb-6">
            Un problema che viviamo ogni giorno
          </h2>
          <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto">
            Le aziende faticano a coinvolgere i dipendenti e collocarli nei
            ruoli giusti, causando insoddisfazione, turnover elevato e perdita
            di talenti.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {problemStats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="h-full"
            >
              <Card
                className={`text-center border-2 h-full flex flex-col ${item.color
                  .replace("text-", "border-")
                  .replace("-800", "-200")} card-hover`}
              >
                <CardHeader className="pb-4 flex-shrink-0">
                  <CardTitle
                    className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${
                      item.color.split(" ")[2]
                    } mb-4`}
                  >
                    {item.stat}
                  </CardTitle>
                  <h3 className="font-heading text-lg sm:text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="font-body text-sm sm:text-base text-gray-600 mb-2">{item.description}</p>
                  {item.note && (
                    <p className="font-body text-xs text-gray-400 mt-auto">{item.note}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}