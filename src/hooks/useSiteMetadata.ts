import { useStaticQuery, graphql } from "gatsby";

type SiteMetadata = {
  title: string;
  description: string;
  siteUrl: string;
};

type Site = {
  siteMetadata: SiteMetadata;
};

export function useSiteMetadata() {
  const { site } = useStaticQuery<{ site: Site }>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);
  const { siteMetadata } = site;
  const { title, description, siteUrl } = siteMetadata;

  return {
    title,
    description,
    siteUrl,
  };
}
