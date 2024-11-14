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
      className={cx(
        "flex flex-row gap-4 items-center bg-gray-100 h-28 px-4 rounded-lg",
        className
      )}
      {...rest}
    >
      <Avatar
        size={72}
        src={authorData?.avatarURL}
        className="w-16 h-16 flex-none"
      />
      <div className="text-pretty flex flex-col gap-2">
        <strong className="text-lg inline-block h-6 min-w-36">
          {authorData?.name}
          {authorData?.nickname && <span>({authorData.nickname})</span>}
        </strong>
        <p className="text-sm whitespace-pre-wrap h-6 min-w-64">
          {authorData?.bio}
        </p>
      </div>
    </div>
  );
}
