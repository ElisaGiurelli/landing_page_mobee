"use client";

import React from "react";
import Image from "next/image";

interface MoobeLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function MoobeLogo({
  className = "",
  width = 120,
  height = 100,
}: MoobeLogoProps) {
  return (
    <Image
      src="/logoMobeeV3.svg"
      alt="Moobe Logo"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
