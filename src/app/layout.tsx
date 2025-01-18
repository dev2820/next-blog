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
import { UseDarkMode } from "@/components/UseDarkMode";

const AUTHOR = process.env.author ?? "";
const NICKNAME = process.env.nickname ?? AUTHOR;

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
        "scroll-smooth"
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
          "w-dvw overflow-x-hidden flex flex-col text-fg bg-base"
        )}
      >
        <UseDarkMode />
        <Header className="self-center w-screen fixed top-0 z-50"></Header>
        <main className="self-center w-full max-w-screen-md p-4 mt-16">
          {children}
        </main>
        <footer className="self-center w-screen max-w-screen-md px-4 h-96">
          {/**
           * TODO: Contact me 추가
           */}
          <p>
            &copy; 2024-{new Date().getFullYear()} {AUTHOR}. All rights
            reserved.
          </p>
        </footer>
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
          <LogoFullSVG />
        </Link>
        <div className="flex-1" />
        <GlobalNavigationBar />
        <GoToSearch />
      </div>
    </header>
  );
}
