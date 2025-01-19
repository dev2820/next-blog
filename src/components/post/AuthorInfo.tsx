"use client";

import { ComponentProps } from "react";
import { cx } from "@/utils/cx";
import { Avatar } from "terra-design-system/react";
import authorData from "@/assets/data/github-profile.json";
import GithubLogo from "@/assets/github.svg";
import linkedinLogo from "@/assets/images/linkedin-mark.png";
import Image from "next/image";

const GITHUB_URL = process.env.githubURL ?? "";
const LINKEDIN_URL = process.env.linkedinURL ?? "";

export type AuthorInfoProps = ComponentProps<"div">;
export function AuthorInfo(props: AuthorInfoProps) {
  const { className, ...rest } = props;

  return (
    <div
      className={cx(
        "flex flex-row gap-4 items-center bg-layer-fill h-32 px-4 rounded-lg",
        className
      )}
      {...rest}
    >
      <Avatar
        size={96}
        src={authorData?.avatarURL}
        className="w-24 h-24 flex-none"
      />
      <div className="text-pretty flex flex-col gap-2">
        <strong className="text-xl inline-block h-6 min-w-36 font-semibold">
          {authorData?.nickname}{" "}
          <span className="font-light">
            {authorData.name && " (" + authorData.name + ")"}
          </span>
        </strong>
        <p className="text-sm whitespace-pre-wrap h-6 min-w-64">
          {authorData?.bio}
        </p>
        <ul className="flex flex-row gap-3">
          <li>
            <a href={GITHUB_URL} target="_blank">
              <GithubLogo
                alt={"github logo"}
                className="w-5 h-5 fill-current text-fg"
              />
            </a>
          </li>
          <li>
            <a href={LINKEDIN_URL} target="_blank">
              <Image
                src={linkedinLogo}
                alt={"github logo"}
                className="h-5 w-5 object-cover object-left-top"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
