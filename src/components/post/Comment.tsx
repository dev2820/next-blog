"use client";

import { cx } from "@/utils/cx";
import Script from "next/script";
import { ComponentProps, useEffect } from "react";
import { isDarkMode } from "@/utils/darkmode";
export type CommentProps = ComponentProps<"div">;
export function Comment(props: CommentProps) {
  const { className, ...rest } = props;

  useEffect(() => {
    const targetNode = document.documentElement;

    const config = { attributes: true };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver((mutationList) => {
      console.log(mutationList);
      for (const mutation of mutationList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const isDarkMode =
            document.documentElement.classList.contains("dark");
          const iframe = document.querySelector<HTMLIFrameElement>(
            "iframe.giscus-frame"
          );
          iframe?.contentWindow?.postMessage(
            {
              giscus: {
                setConfig: {
                  theme: isDarkMode ? "dark" : "light",
                },
              },
            },
            "https://giscus.app"
          );
        }
      }
    });

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    // Later, you can stop observing
    return () => {
      observer.disconnect();
    };
  }, []);
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
        data-theme={"light"}
        data-lang="ko"
        data-loading="lazy"
        cross-origin="anonymous"
        async
      ></Script>
      <div className={cx("giscus", className)} {...rest}></div>
    </>
  );
}
