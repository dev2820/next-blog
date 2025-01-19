"use client";

import { SearchIcon } from "lucide-react";
import { cx } from "@/utils/cx";
import RouterLink from "next/link";
import { LinkProps, buttonVariants } from "terra-design-system/react";

export type GoToSearchProps = LinkProps;
export function GoToSearch(props: GoToSearchProps) {
  const { className, ...rest } = props;
  return (
    <RouterLink
      href="/search"
      className={cx(
        "ml-1 desktop:ml-8",
        buttonVariants({ variant: "ghost" }),
        "size-11 p-0",
        className
      )}
      {...rest}
    >
      <SearchIcon size={20} />
    </RouterLink>
  );
}
