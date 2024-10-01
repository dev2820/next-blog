import React from "react";
import logoSVG from "@/assets/logo-full.svg";
import Image, { ImageProps } from "next/image";

const NICKNAME = process.env.nickname;

export type BrandLogoProps = Omit<ImageProps, "src" | "alt">;
export function BrandLogo(props: BrandLogoProps) {
  const { className, ...rest } = props;

  return <Image src={logoSVG} alt={`${NICKNAME}'s Devlog logo`} {...rest} />;
}
