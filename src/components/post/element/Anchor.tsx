"use client";

import { cx } from "@/utils/cx";
import { Link, type LinkProps } from "terra-design-system/react";

export type AnchorProps = LinkProps;
export function Anchor(props: AnchorProps) {
  const { className, target = "_blank", ...rest } = props;

  return <Link className={cx(className)} target={target} {...rest} />;
}
