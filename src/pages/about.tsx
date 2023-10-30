import * as React from "react";

import { Layout, Seo } from "../layouts";

export default function About() {
  return (
    <Layout title="About Page">
      <p>I'm about page</p>
    </Layout>
  );
}

export const Head = () => <Seo title="About Page" />;
