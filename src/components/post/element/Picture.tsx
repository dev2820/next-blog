import { cx } from "@/utils/cx";
import Image, { type ImageProps } from "next/image";

export type PictureProps = ImageProps;
export function Picture(props: PictureProps) {
  const { className, alt = "", ...rest } = props;

  return (
    <Image
      className={cx("object-cover rounded-md", className)}
      alt={alt}
      {...rest}
    ></Image>
  );
}
