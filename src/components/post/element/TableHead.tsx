"use client";

import { cx } from "@/utils/cx";
import {
  Table as _Table,
  type TableProps as _TableProps,
} from "terra-design-system/react";

export type TableHeadProps = _TableProps["head"];
export function TableHead(props: TableHeadProps) {
  const { className, ...rest } = props;

  return <_Table.Head className={cx(className)} {...rest} />;
}
