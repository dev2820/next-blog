import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

export type GlobalNavigationBarProps = ComponentProps<"nav">;
export function GlobalNavigationBar(props: GlobalNavigationBarProps) {
  const { className, ...rest } = props;
  return <nav className={cx(className)} {...rest}>gnb</nav>;
}
