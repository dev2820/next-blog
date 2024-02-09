import * as React from "react";

import { useSiteMetadata } from "../hooks";
import { withPrefix } from "gatsby";

interface Props {
  title: string;
}

export function PostSeo({ title }: Props) {
  const siteMetadata = useSiteMetadata();

  return (
    <>
      <title>
        {title} | {siteMetadata.title}
      </title>
      <link href={withPrefix("prism.css")} rel="stylesheet"></link>
    </>
  );
}
