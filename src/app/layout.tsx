import type { Metadata } from "next";
import "terra-design-system/react/style"; // trds의 style의 우선순위를 낮추기 위해 위에 위치
import "./globals.css";
import localFont from "next/font/local";
import { cx } from "@/utils/cx";
import { GoogleAnalytics } from "@next/third-parties/google";
import LogoFullSVG from "@/assets/logo-full.svg";

import { GlobalNavigationBar } from "@/components/GlobalNavigationBar";
import { ComponentProps } from "react";
import Link from "next/link";
import { ScrollToTop } from "@/components/ScrollToTop";
import { GoToSearch } from "@/components/GoToSearch";
import { DarkModeToggle } from "@/components/DarkModeToggle";

const AUTHOR = process.env.author ?? "";
const NICKNAME = process.env.nickname ?? AUTHOR;
const SITE_URL = process.env.siteURL ?? "";
const TITLE = process.env.title!;
const DESC = process.env.description!;
const HERO_IMAGE = process.env.image!;
const ICON = process.env.favicon!;

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const monospaceNeon = localFont({
  src: "../assets/fonts/MonaspaceNeonVarVF.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-monospace-neon",
});

export const metadata: Metadata = {
  title: `${NICKNAME}'s Devlog`,
  description: `${NICKNAME}'s tech blog`,
  alternates: {
    types: {
      "application/rss+xml": process.env.siteURL + "/rss.xml",
      "application/atom+xml": process.env.siteURL + "/atom.xml",
      "application/json": process.env.siteURL + "/feed.json",
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE,
  },
  icons: ICON,
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESC,
    images: HERO_IMAGE,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="kr"
      className={cx(
        pretendard.variable,
        monospaceNeon.variable,
        "scroll-smooth",
      )}
    >
      <head>
        <meta
          name="naver-site-verification"
          content={process.env.NEXT_PUBLIC_NAVER_SEARCH_CONSOLE}
        />
      </head>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      <body
        className={cx(
          pretendard.className,
          "flex flex-col text-fg bg-layer transition-colors duration-300",
        )}
      >
        <Header className="self-center w-full fixed top-0 z-50"></Header>
        <main className="self-center w-full max-w-screen-md p-4 mt-16">
          {children}
        </main>
        <Footer className="self-center w-full max-w-screen-md h-96" />
        <ScrollToTop />
      </body>
    </html>
  );
}

type HeaderProps = ComponentProps<"header">;
function Header(props: HeaderProps) {
  const { className, ...rest } = props;
  return (
    <header
      className={cx("px-4 py-2 bg-layer-alpha2 backdrop-blur-sm", className)}
      {...rest}
    >
      <div className="flex flex-row justify-center place-items-center w-full max-w-screen-md mx-auto">
        <Link href="/">
          <LogoFullSVG className="color-black dark:color-white" />
        </Link>
        <div className="flex-1" />
        <GlobalNavigationBar />
        <GoToSearch className="mr-2" />
        <DarkModeToggle className="hidden desktop:flex" />
      </div>
    </header>
  );
}

type FooterProps = ComponentProps<"footer">;
function Footer(props: FooterProps) {
  const { className, ...rest } = props;
  return (
    <footer className={cx("px-4", className)} {...rest}>
      {/**
       * TODO: Contact me 추가
       */}
      <p>
        &copy; 2024-{new Date().getFullYear()} {AUTHOR}. All rights reserved.
      </p>
    </footer>
  );
}
