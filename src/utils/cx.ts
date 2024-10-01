import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export function cx(...classes: ClassValue[]): string {
  return twMerge(clsx(...classes));
}
