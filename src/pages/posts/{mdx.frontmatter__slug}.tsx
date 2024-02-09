import React, { ReactNode, useEffect } from "react";
import { graphql, withPrefix } from "gatsby";

import { Layout, PostSeo } from "@/layouts";
import { loadScript } from "@/utils/loadScript";

interface Props {
  data: {
    mdx: {
      frontmatter: {
        title: string;
      };
    };
  };
  children: ReactNode;
}
export default function Post({ data, children }: Props) {
  const { mdx } = data;
  const { frontmatter } = mdx;

  useEffect(() => {
    const prismUrl = withPrefix("prism.js");
    document
      .querySelectorAll("pre")
      .forEach(($pre) => $pre.classList.add("line-numbers"));
    loadScript(prismUrl);
  }, []);

  return <Layout title={frontmatter.title}>{children}</Layout>;
}

export const Head = ({ data }: Props) => (
  <PostSeo title={data.mdx.frontmatter.title} />
);

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;
