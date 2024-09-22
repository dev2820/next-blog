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
      <Skeleton isLoaded={!isFetching} className="rounded-full">
        <Avatar size="2xl" src={author?.avatarURL} className="w-16 h-16" />
      </Skeleton>
      <div className="text-pretty flex flex-col gap-2">
        <Skeleton isLoaded={!isFetching} className="h-fit w-fit">
          <strong className="inline-block h-6 min-w-36">
            {author?.name}{" "}
            {author?.nickname && <span>({author.nickname})</span>}
          </strong>
        </Skeleton>
        <Skeleton isLoaded={!isFetching} className="h-fit w-fit">
          <p className="whitespace-pre-wrap h-6 min-w-64">{author?.bio}</p>
        </Skeleton>
      </div>
    </div>
  );
}
