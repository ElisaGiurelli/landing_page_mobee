"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  metric: string;
  detail: string;
  color: string;
}

interface BenefitCardProps {
  benefit: Benefit;
  index: number;
}

export default function BenefitCard({ benefit, index }: BenefitCardProps) {
  const getBorderColor = () => {
    if (benefit.color.includes("green")) return "border-green-200";
    if (benefit.color.includes("blue")) return "border-blue-200";
    if (benefit.color.includes("purple")) return "border-purple-200";
    return "border-orange-200";
  };

  const getMetricColor = () => {
    if (benefit.color.includes("green")) return "text-green-500";
    if (benefit.color.includes("blue")) return "text-blue-500";
    if (benefit.color.includes("purple")) return "text-purple-500";
    return "text-orange-500";
  };

  const getBorderColorForMetric = () => {
    if (benefit.color.includes("green")) return "border-green-100";
    if (benefit.color.includes("blue")) return "border-blue-100";
    if (benefit.color.includes("purple")) return "border-purple-100";
    return "border-orange-100";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card
        className={`text-center border rounded-2xl p-8 bg-white card-hover h-full ${getBorderColor()}`}
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
            className={`bg-gray-50/50 rounded-lg p-4 border ${getBorderColorForMetric()}`}
          >
            <p className={`text-3xl font-bold mb-1 ${getMetricColor()}`}>
              {benefit.metric}
            </p>
            <p className="font-body text-sm text-gray-600">{benefit.detail}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}