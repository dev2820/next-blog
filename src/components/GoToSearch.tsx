"use client";

import { SearchIcon } from "lucide-react";
import { cx } from "@/utils/cx";
import { Link, buttonVariants } from "terra-design-system/react";

export function GoToSearch() {
  return (
    <Link
      href="/search"
      className={cx(
        "ml-1 desktop:ml-8",
        buttonVariants({ variant: "ghost" }),
        "size-11"
      )}
    >
      <SearchIcon />
    </Link>
  );
}
