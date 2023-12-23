import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";

import { Layout, Seo } from "@/layouts";

const TITLE = "Home Page";

export default function MainPage() {
  return (
    <Layout title={TITLE}>
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <StaticImage
        alt="Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera"
        src="https://pbs.twimg.com/media/E1oMV3QVgAIr1NT?format=jpg&name=large"
      />
    </Layout>
  );
}

export const Head = () => <Seo title={TITLE} />;
