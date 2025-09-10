"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  color: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Card className="h-full card-hover border border-gray-100 bg-white rounded-2xl p-8">
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
  );
}