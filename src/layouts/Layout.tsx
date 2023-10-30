import * as React from "react";
import type { ReactNode } from "react";
import { Link } from "gatsby";

import { useSiteMetadata } from "../hooks";

interface Props {
  title: string;
  children?: ReactNode;
}

export function Layout({ title, children }: Props) {
  const siteMetadata = useSiteMetadata();

  return (
    <>
      <header>
        <p>{siteMetadata.description}</p>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Me</Link>
          </li>
        </ul>
      </nav>
      <h1>{title}</h1>
      <main>{children}</main>
    </>
  );
}
