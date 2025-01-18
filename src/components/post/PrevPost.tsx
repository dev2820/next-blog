"use client";

import { Post } from "@/types/post";
import { cx } from "@/utils/cx";
import { ArrowLeftIcon } from "lucide-react";
import { ComponentProps } from "react";
import { buttonVariants } from "terra-design-system/react";

export type PrevPostProps = Omit<ComponentProps<"div">, "children"> & {
  post: Post;
};
export function PrevPost(props: PrevPostProps) {
  const { post, className, ...rest } = props;
  return (
    <div
      className={cx(
        buttonVariants({ theme: "neutral", variant: "filled" }),
        "w-full max-w-80",
        "py-8",
        "hover:bg-primary-200 active:bg-primary-300",
        className
      )}
      {...rest}
    >
      <div className="flex-none">
        <ArrowLeftIcon />
      </div>
      <div className="flex-1 overflow-hidden overflow-ellipsis">
        {post.data.title}
      </div>
    </div>
  );
}
