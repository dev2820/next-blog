"use client";

import { ComponentProps } from "react";
import { cx } from "@/utils/cx";
import { Avatar, Skeleton } from "terra-design-system/react";
import { useAuthor } from "@/hooks/use-author";

export type AuthorInfoProps = ComponentProps<"div">;
export function AuthorInfo(props: AuthorInfoProps) {
  const { className, ...rest } = props;
  const { isFetching, author } = useAuthor();

  // TODO: show profile skeleton

  return (
    <div
      className={cx("flex flex-row gap-4 items-center", className)}
      {...rest}
    >
      <Skeleton isLoaded={!isFetching} className="!rounded-full">
        <Avatar size="xl" src={author?.avatarURL} className="w-16 h-16" />
      </Skeleton>
      <div className="text-pretty">
        <Skeleton isLoaded={!isFetching} className="max-w-36 h-6 mb-2">
          <strong>
            {author?.name}{" "}
            {author?.nickname && <span>({author.nickname})</span>}
          </strong>
        </Skeleton>
        <Skeleton isLoaded={!isFetching} className="min-w-64 h-6">
          <p className="whitespace-pre-wrap">{author?.bio}</p>
        </Skeleton>
      </div>
    </div>
  );
}
