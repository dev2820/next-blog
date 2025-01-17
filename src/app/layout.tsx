import type { Metadata } from "next";
import "terra-design-system/react/style"; // trds의 style의 우선순위를 낮추기 위해 위에 위치
import "./globals.css";
import localFont from "next/font/local";
import { cx } from "@/utils/cx";
import { GoogleAnalytics } from "@next/third-parties/google";

import { GlobalNavigationBar } from "@/components/GlobalNavigationBar";
import { ComponentProps } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import Link from "next/link";
import { ScrollToTop } from "@/components/ScrollToTop";
import { GoToSearch } from "@/components/GoToSearch";

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
          "w-dvw overflow-x-hidden flex flex-col text-gray-800"
        )}
      >
        <Header className="self-center w-screen max-w-screen-md px-4 fixed top-0 z-50 bg-white/75 backdrop-blur-sm"></Header>
        <main className="self-center w-full max-w-screen-md p-4 mt-16 text-gray-800">
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
      className={cx(
        "flex flex-row justify-center py-2 items-center",
        className
      )}
      {...rest}
    >
      <Link href="/">
        <BrandLogo height={48} />
      </Link>
      <div className="flex-1" />
      <GlobalNavigationBar />
      <GoToSearch />
    </header>
  );
}
