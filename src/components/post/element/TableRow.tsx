"use client";

import { cx } from "@/utils/cx";
import {
  Table as _Table,
  type TableProps as _TableProps,
} from "terra-design-system/react";

export type TableRowProps = _TableProps["Row"];
export function TableRow(props: TableRowProps) {
  const { className, ...rest } = props;

  return <_Table.Row className={cx(className)} {...rest} />;
}
