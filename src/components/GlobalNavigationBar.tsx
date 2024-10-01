"use client";

import { cx } from "@/utils/cx";
import Link from "next/link";
import { ComponentProps } from "react";
import { usePathname } from "next/navigation";

const NAVIGATION_MENUS = [
  {
    href: "/posts",
    label: "Posts",
  },
];
export type GlobalNavigationBarProps = ComponentProps<"nav">;
export function GlobalNavigationBar(props: GlobalNavigationBarProps) {
  const { className, ...rest } = props;
  const pathname = usePathname();

  return (
    <nav className={cx("", className)} {...rest}>
      <menu className="flex flex-row gap-8">
        {NAVIGATION_MENUS.map((m) => (
          <li key={m.href}>
            <Link href={m.href}>
              <NavigationItem isActive={pathname.startsWith(m.href)}>
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
  isActive?: boolean;
};
const NavigationItem = (props: NavigationItemProps) => {
  const { isActive, children, className, ...rest } = props;
  return (
    <div
      className={cx(
        "cursor-pointer",
        "text-gray-700 hover:text-gray-900 duration-200 font-medium",
        isActive && "text-primary hover:text-primary",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
