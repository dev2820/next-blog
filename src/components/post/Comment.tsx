"use client";

import Giscus from "@giscus/react";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { ComponentProps } from "react";

export type CommentProps = ComponentProps<"div">;
export function Comment(props: CommentProps) {
  const { className, ...rest } = props;
  const { isDark } = useDarkMode();

  return (
    <>
      {/**
       * giscus (for comment & reaction)
       */}
      <div className={className} {...rest}>
        <Giscus
          id="comments"
          repo="dev2820/blog-posts"
          repoId="R_kgDOLQagPA"
          category="General"
          categoryId="DIC_kwDOLQagPM4CjAtl"
          mapping="og:title"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={isDark ? "dark" : "light"}
          lang="ko"
          loading="lazy"
        />
      </div>
    </>
  );
}
