import Image, { type ImageProps } from "next/image";

export type HeroImageProps = ImageProps;
export function HeroImage(props: HeroImageProps) {
  const { alt = "", ...rest } = props;
  return <Image alt={alt} {...rest} />;
}
