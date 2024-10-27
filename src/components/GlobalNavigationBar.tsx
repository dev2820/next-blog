"use client";

import { cx } from "@/utils/cx";
import Link from "next/link";
import { ComponentProps, useState } from "react";
import { usePathname } from "next/navigation";
import { useScreen } from "@/hooks/use-screen";
import { Drawer, IconButton } from "terra-design-system/react";
import { MenuIcon, XIcon } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { useDisclosure } from "@/hooks/use-disclosure";

const NAVIGATION_MENUS = [
  {
    href: "/posts",
    label: "Posts",
    enabled: true,
  },
  {
    href: "/tags",
    label: "Tags",
    enabled: true,
  },
  {
    href: "/about",
    label: "About Me",
    enabled: false,
  },
  {
    href: "/contact",
    label: "Contact",
    enabled: true,
  },
];

export type GlobalNavigationBarProps = ComponentProps<"nav">;
export function GlobalNavigationBar(props: GlobalNavigationBarProps) {
  const { className, ...rest } = props;
  const { isSmallerThanDesktop } = useScreen();
  const pathname = usePathname();
  const drawerHandler = useDisclosure(false);

  if (isSmallerThanDesktop) {
    return (
      <Drawer.Root
        open={drawerHandler.isOpen}
        onInteractOutside={drawerHandler.close}
        onEscapeKeyDown={drawerHandler.close}
      >
        <Drawer.Trigger asChild>
          <IconButton
            variant="ghost"
            className={cx(className)}
            onClick={drawerHandler.open}
          >
            <MenuIcon />
          </IconButton>
        </Drawer.Trigger>
        <Drawer.Content className="w-svw max-w-96 flex flex-col">
          <Drawer.Title className="w-full mt-4 self-start px-4 flex flex-row justify-between items-center">
            <BrandLogo />
            <Drawer.CloseTrigger asChild onClick={drawerHandler.close}>
              <IconButton variant="ghost">
                <XIcon strokeWidth={1} size={24} />
              </IconButton>
            </Drawer.CloseTrigger>
          </Drawer.Title>
          <Drawer.Body className="mt-8">
            <nav>
              <menu className="flex flex-col divide-y">
                {NAVIGATION_MENUS.map((m) => (
                  <li
                    key={m.href}
                    className={cx(m.enabled && "hover:bg-black/5 duration-200")}
                  >
                    <Link
                      href={m.enabled ? m.href : ""}
                      aria-disabled={!m.enabled}
                      onClick={drawerHandler.close}
                    >
                      <NavigationItem
                        active={pathname.startsWith(m.href)}
                        disabled={!m.enabled}
                        className="h-12 leading-[48px] px-2 text-center"
                      >
                        {m.label}
                      </NavigationItem>
                    </Link>
                  </li>
                ))}
              </menu>
            </nav>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    );
  }

  return (
    <nav className={cx(className)} {...rest}>
      <menu className="flex flex-row gap-8">
        {NAVIGATION_MENUS.map((m) => (
          <li key={m.href}>
            <Link href={m.enabled ? m.href : ""} aria-disabled={!m.enabled}>
              <NavigationItem
                active={pathname.startsWith(m.href)}
                disabled={!m.enabled}
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
