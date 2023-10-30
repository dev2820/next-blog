import React, { ReactNode } from "react";
import { graphql } from "gatsby";

import { Layout, Seo } from "../../layouts";

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

  return <Layout title={frontmatter.title}>{children}</Layout>;
}

export const Head = ({ data }: Props) => (
  <Seo title={data.mdx.frontmatter.title} />
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
