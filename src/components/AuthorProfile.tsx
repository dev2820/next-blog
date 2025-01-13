"use client";

import { LinkedinIcon } from "lucide-react";
import { buttonVariants } from "terra-design-system/react";

import authorData from "@/assets/data/github-profile.json";
import githubSvg from "@/assets/github.svg";
import Image from "next/image";
import { cx } from "@/utils/cx";

const LINKEDIN_URL = process.env.linkedinURL ?? "";

export function AuthorProfile() {
  return (
    <section className="mt-10">
      <h3 className="text-3xl font-bold text-gray-800">
        {authorData.nickname}
      </h3>
      <p className="my-4">{authorData.bio}</p>
      <ul className="flex flex-row gap-2">
        <li>
          <a
            href={authorData.githubURL}
            target="_blank"
            className={cx(buttonVariants({ variant: "ghost" }), "size-10 p-0")}
          >
            <Image
              src={githubSvg}
              width={28}
              height={28}
              alt={"github logo"}
              className="inline-block"
            />
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
