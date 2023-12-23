import * as React from "react";

import { useSiteMetadata } from "../hooks";

interface Props {
  title: string;
}

export function Seo({ title }: Props) {
  const siteMetadata = useSiteMetadata();

  return (
    <title>
      {title} | {siteMetadata.title}
    </title>
  );
}
