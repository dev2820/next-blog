import { cx } from "@/utils/cx";
import { ComponentProps, createContext } from "react";

export type SearchResultRootProps = ComponentProps<"section">;
export function SearchResultRoot(props: SearchResultRootProps) {
  const { className, children, ...rest } = props;

  return (
    <section className={cx(className)} {...rest}>
      {children}
    </section>
  );
}

export type SearchResultTitleProps = ComponentProps<"h3">;
export function SearchResultTitle(props: SearchResultTitleProps) {
  const { className, children, ...rest } = props;

  return (
    <h3 className={cx("text-2xl font-semibold", className)} {...rest}>
      {children}
    </h3>
  );
}

export type SearchResultDescriptionProps = ComponentProps<"p">;
export function SearchResultDescription(props: SearchResultDescriptionProps) {
  const { className, children, ...rest } = props;

  return (
    <p className={cx("text-gray-500 mt-4", className)} {...rest}>
      {children}
    </p>
  );
}
