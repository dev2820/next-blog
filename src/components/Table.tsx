"use client";

import { cx } from "@/utils/cx";
import {
  Table as _Table,
  type TableProps as _TableProps,
} from "terra-design-system/react";

export type TableProps = _TableProps["root"];
export function Table(props: TableProps) {
  const { className, ...rest } = props;

  return <_Table.Root className={cx(className)} {...rest} />;
}
