import { cx } from "@/utils/cx";
import _Image, { type ImageProps as _ImageProps } from "next/image";

export type ImageProps = _ImageProps;
export function Image(props: ImageProps) {
  const { className, ...rest } = props;

  return (
    <_Image
      className={cx("object-cover rounded-md", className)}
      {...rest}
    ></_Image>
  );
}
