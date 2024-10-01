"use client";

import React from "react";
import logoFullSVG from "@/assets/logo-full.svg";
import logoSVG from "@/assets/logo.svg";
import Image, { ImageProps } from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";

const NICKNAME = process.env.nickname;

export type BrandLogoProps = Omit<ImageProps, "src" | "alt">;
export function BrandLogo(props: BrandLogoProps) {
  const { className, ...rest } = props;

  const isMobile = useMediaQuery("(max-width: 568px)");

  const src = isMobile ? logoSVG : logoFullSVG;

  return <Image src={src} alt={`${NICKNAME}'s Devlog logo`} {...rest} />;
}
