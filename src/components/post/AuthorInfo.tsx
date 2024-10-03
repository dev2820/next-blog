"use client";

import { ComponentProps } from "react";
import { cx } from "@/utils/cx";
import { Avatar } from "terra-design-system/react";
import authorData from "@/assets/data/github-profile.json";

export type AuthorInfoProps = ComponentProps<"div">;
export function AuthorInfo(props: AuthorInfoProps) {
  const { className, ...rest } = props;

  return (
    <div
      className={cx("flex flex-row gap-4 items-center", className)}
      {...rest}
    >
      <Avatar size={64} src={authorData?.avatarURL} className="w-16 h-16" />
      <div className="text-pretty flex flex-col gap-2">
        <strong className="inline-block h-6 min-w-36">
          {authorData?.name}{" "}
          {authorData?.nickname && <span>({authorData.nickname})</span>}
        </strong>
        <p className="whitespace-pre-wrap h-6 min-w-64">{authorData?.bio}</p>
      </div>
    </div>
  );
}
