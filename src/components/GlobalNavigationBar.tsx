import { cx } from "@/utils/cx";
import Link from "next/link";
import { ComponentProps } from "react";

export type GlobalNavigationBarProps = ComponentProps<"nav">;
export function GlobalNavigationBar(props: GlobalNavigationBarProps) {
  const { className, ...rest } = props;
  return (
    <nav className={cx(className)} {...rest}>
      <menu className="flex flex-row gap-8">
        <li>
          <Link href="/posts">Posts</Link>
        </li>
      </menu>
    </nav>
  );
}
