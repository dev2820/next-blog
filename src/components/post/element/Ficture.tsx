import { cx } from "@/utils/cx";
import Image, { type ImageProps } from "next/image";

export type FictureProps = ImageProps;
export function Ficture(props: FictureProps) {
  const { className, alt = "", ...rest } = props;

  return (
    <Image
      className={cx("object-cover rounded-md", className)}
      alt={alt}
      {...rest}
    ></Image>
  );
}
