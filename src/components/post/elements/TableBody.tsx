"use client";

import { cx } from "@/utils/cx";
import {
  Table as _Table,
  type TableProps as _TableProps,
} from "terra-design-system/react";

export type TableBodyProps = _TableProps["body"];
export function TableBody(props: TableBodyProps) {
  const { className, ...rest } = props;

  return <_Table.Body className={cx(className)} {...rest} />;
}
