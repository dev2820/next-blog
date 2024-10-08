"use client";

import { IconButton, IconButtonProps } from "terra-design-system/react";
import { SearchIcon } from "lucide-react";
import { cx } from "@/utils/cx";
/**
 * TODO: link 안에 버튼을 넣으면 안된다.
 */
export type SearchButtonProps = IconButtonProps;
export function SearchButton(props: SearchButtonProps) {
  const { className, ...rest } = props;

  return (
    <IconButton size="md" variant="ghost" className={cx(className)} {...rest}>
      <SearchIcon />
    </IconButton>
  );
}
