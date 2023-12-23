import * as React from "react";
import { Link, graphql } from "gatsby";

import { Layout, Seo } from "@/layouts";

interface Props {
  data: {
    allMdx: {
      nodes: {
        frontmatter: {
          title: string;
          date: string;
          slug: string;
        };
        id: string;
        excerpt: string;
      }[];
    };
  };
}

export default function AllPostsPage({ data }: Props) {
  const { allMdx } = data;

  return (
    <Layout title="My Blog Posts">
      <p>My cool posts will go in here</p>
      <ul>
        {allMdx.nodes.map(({ frontmatter, id, excerpt }) => (
          <li key={id}>
            <article>
              <h2>
                <Link to={frontmatter.slug}>{frontmatter.title}</Link>
              </h2>
              <small>{frontmatter.date}</small>
              <p>{excerpt}</p>
            </article>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const Head = () => <Seo title="My Blog Posts" />;

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          title
          date(formatString: "YYYY/MM/DD")
          slug
        }
        id
        excerpt(pruneLength: 30)
      }
    }
  }
`;
