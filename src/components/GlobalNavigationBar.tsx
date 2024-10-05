"use client";

import { cx } from "@/utils/cx";
import Link from "next/link";
import { ComponentProps } from "react";
import { usePathname } from "next/navigation";

const NAVIGATION_MENUS = [
  {
    href: "/posts",
    label: "Posts",
    disabled: false,
  },
  {
    href: "/about",
    label: "About Me",
    disabled: true,
  },
  {
    href: "/contact",
    label: "Contact",
    disabled: true,
  },
];

export type GlobalNavigationBarProps = ComponentProps<"nav">;
export function GlobalNavigationBar(props: GlobalNavigationBarProps) {
  const { className, ...rest } = props;
  const pathname = usePathname();

  return (
    <nav className={className} {...rest}>
      <menu className="flex flex-row gap-8">
        {NAVIGATION_MENUS.map((m) => (
          <li key={m.href}>
            <Link href={m.disabled ? "" : m.href} aria-disabled={m.disabled}>
              <NavigationItem
                active={pathname.startsWith(m.href)}
                disabled={m.disabled}
              >
                {m.label}
              </NavigationItem>
            </Link>
          </li>
        ))}
      </menu>
    </nav>
  );
}

type NavigationItemProps = ComponentProps<"div"> & {
  active?: boolean;
  disabled?: boolean;
};
const NavigationItem = (props: NavigationItemProps) => {
  const { active, disabled, children, className, ...rest } = props;
  return (
    <div
      className={cx(
        "cursor-pointer",
        "text-neutral-500 hover:text-neutral-900 duration-200 font-medium",
        active && "text-primary hover:text-primary",
        disabled && "cursor-not-allowed text-muted hover:text-muted",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
