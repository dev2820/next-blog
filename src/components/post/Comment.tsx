"use client";

import { useDarkMode } from "@/hooks/use-dark-mode";
import { cx } from "@/utils/cx";
import Script from "next/script";
import { ComponentProps, useEffect } from "react";

export type CommentProps = ComponentProps<"div">;
export function Comment(props: CommentProps) {
  const { className, ...rest } = props;
  const { isDark } = useDarkMode();

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );
    iframe?.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme: isDark ? "dark" : "light",
          },
        },
      },
      "https://giscus.app"
    );
  }, [isDark]);

  return (
    <>
      {/**
       * giscus (for comment & reaction)
       */}
      <Script
        src="https://giscus.app/client.js"
        data-repo="dev2820/blog-posts"
        data-repo-id="R_kgDOLQagPA"
        data-category="General"
        data-category-id="DIC_kwDOLQagPM4CjAtl"
        data-mapping="og:title"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme={isDark ? "dark" : "light"}
        data-lang="ko"
        data-loading="lazy"
        cross-origin="anonymous"
        async
      ></Script>
      <div id="comment" className={cx("giscus", className)} {...rest}></div>
    </>
  );
}
