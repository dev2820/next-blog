import Script from "next/script";

export function Comment() {
  return (
    <section>
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
        data-theme="light"
        data-lang="ko"
        data-loading="lazy"
        cross-origin="anonymous"
        async
      ></Script>
      <div className="giscus w-full min-w-screen-md"></div>
    </section>
  );
}
