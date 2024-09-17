"use client";

import { cx } from "@/utils/cx";
import {
  Table as _Table,
  type TableProps as _TableProps,
} from "terra-design-system/react";

export type TableHeaderProps = _TableProps["header"];
export function TableHeader(props: TableHeaderProps) {
  const { className, ...rest } = props;

  return <_Table.Header className={cx(className)} {...rest} />;
}
