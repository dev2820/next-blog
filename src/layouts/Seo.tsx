import * as React from "react";

import { useSiteMetadata } from "../hooks";
import { withPrefix } from "gatsby";

interface Props {
  title: string;
}

export function Seo({ title }: Props) {
  const siteMetadata = useSiteMetadata();

  return (
    <>
      <link href={withPrefix("prism.css")} rel="stylesheet"></link>
      <title>
        {title} | {siteMetadata.title}
      </title>
    </>
  );
}
