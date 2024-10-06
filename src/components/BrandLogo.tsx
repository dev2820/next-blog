"use client";

import React from "react";
import logoFullSVG from "@/assets/logo-full.svg";
import Image, { ImageProps } from "next/image";

const NICKNAME = process.env.nickname;

export type BrandLogoProps = Omit<ImageProps, "src" | "alt">;
export function BrandLogo(props: BrandLogoProps) {
  const { className, ...rest } = props;

  const src = logoFullSVG;

  return (
    <Image
      src={src}
      alt={`${NICKNAME}'s Devlog logo`}
      priority={false}
      {...rest}
    />
  );
}
