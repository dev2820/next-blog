"use client";

import { ComponentProps } from "react";
import { cx } from "@/utils/cx";
import { Avatar, Link } from "terra-design-system/react";
import authorData from "@/assets/data/github-profile.json";
import githubLogo from "@/assets/images/github-mark.png";
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
        "flex flex-row gap-4 items-center bg-gray-100 h-32 px-4 rounded-lg",
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
        <Link href={GITHUB_URL}>
          <strong className="text-lg inline-block h-6 min-w-36">
            {`${authorData?.name}${
              authorData.nickname && " (" + authorData.nickname + ")"
            }`}
          </strong>
        </Link>
        <p className="text-sm whitespace-pre-wrap h-6 min-w-64">
          {authorData?.bio}
        </p>
        <ul className="flex flex-row gap-3">
          <li>
            <a href={GITHUB_URL} target="_blank">
              <Image src={githubLogo} alt={"github logo"} className="w-5 h-5" />
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
