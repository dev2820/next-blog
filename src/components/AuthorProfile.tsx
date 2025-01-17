"use client";

import { LinkedinIcon } from "lucide-react";
import { buttonVariants } from "terra-design-system/react";

import authorData from "@/assets/data/github-profile.json";
import GithubSvg from "@/assets/github.svg";
import { cx } from "@/utils/cx";

const LINKEDIN_URL = process.env.linkedinURL ?? "";

export function AuthorProfile() {
  return (
    <section className="mt-10">
      <h3 className="text-3xl font-bold">{authorData.nickname}</h3>
      <p className="my-4">{authorData.bio}</p>
      <ul className="flex flex-row gap-2">
        <li>
          <a
            href={authorData.githubURL}
            target="_blank"
            className={cx(buttonVariants({ variant: "ghost" }), "size-10 p-0")}
          >
            <GithubSvg fill="currentColor" width={28} height={28}></GithubSvg>
          </a>
        </li>
        <li>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            className={cx(buttonVariants({ variant: "ghost" }), "size-10 p-0")}
          >
            <LinkedinIcon size={28} />
          </a>
        </li>
      </ul>
    </section>
  );
}
