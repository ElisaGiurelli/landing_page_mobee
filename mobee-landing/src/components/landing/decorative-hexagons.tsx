"use client";

import React from "react";
import { Hexagon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function DecorativeHexagons() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 25]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Main decorative hexagons */}
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
  );
}

// Component for solution section animated hexagons
export function SolutionHexagons() {
  return (
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
  );
}