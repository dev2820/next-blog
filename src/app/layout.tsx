import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { cx } from "@/utils/cx";

import "terra-design-system/react/style";
import { GlobalNavigationBar } from "@/components/GlobalNavigationBar";
import { ComponentProps } from "react";

const AUTHOR = process.env.author ?? "";

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
  title: "Create Next App",
  description: "Generated by create next app",
  alternates: {
    types: {
      "application/rss+xml": process.env.siteURL + "/rss.xml",
      "application/atom+xml": process.env.siteURL + "/atom.xml",
      "application/json": process.env.siteURL + "/feed.json",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={cx(pretendard.variable, monospaceNeon.variable)}>
      <body className={cx(pretendard.className, "flex flex-col")}>
        <div className="w-full max-w-screen-md self-center">
          <Header></Header>
          <main className="p-6 text-gray-800">{children}</main>
          <footer>
            {/**
             * TODO: Contact me 추가
             */}
            <p>
              &copy; 2024-{new Date().getFullYear()} {AUTHOR}. All rights
              reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}

type HeaderProps = ComponentProps<"header">;
function Header(props: HeaderProps) {
  const { className, ...rest } = props;
  return (
    <header className={cx("flex flex-row justify-center", className)} {...rest}>
      {/** logo */}
      <GlobalNavigationBar />
    </header>
  );
}
