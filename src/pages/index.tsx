import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";

import { Layout, Seo } from "@/layouts";

const TITLE = "Home Page";

export default function MainPage() {
  return (
    <Layout title={TITLE}>
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <StaticImage
        alt="우리가게 정상영업합니다."
        src={"../assets/images/hero.jpg"}
      />
    </Layout>
  );
}

export const Head = () => <Seo title={TITLE} />;
