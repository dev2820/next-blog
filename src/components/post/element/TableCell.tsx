"use client";

import { cx } from "@/utils/cx";
import {
  Table as _Table,
  type TableProps as _TableProps,
} from "terra-design-system/react";

export type TableCellProps = _TableProps["Cell"];
export function TableCell(props: TableCellProps) {
  const { className, ...rest } = props;

  return <_Table.Cell className={cx(className)} {...rest} />;
}
