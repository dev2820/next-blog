"use client";

import { Post } from "@/types/post";
import { cx } from "@/utils/cx";
import { ArrowRightIcon } from "lucide-react";
import { ComponentProps } from "react";
import { buttonVariants } from "terra-design-system/react";

export type NextPostProps = Omit<ComponentProps<"div">, "children"> & {
  post: Post;
};
export function NextPost(props: NextPostProps) {
  const { post, className, ...rest } = props;
  return (
    <div
      className={cx(
        buttonVariants({ theme: "neutral", variant: "filled" }),
        "w-72",
        "py-8",
        "hover:bg-primary-200 active:bg-primary-300",
        className
      )}
      {...rest}
    >
      <span className="flex-1 overflow-hidden overflow-ellipsis">
        {post.data.title}
      </span>
      <span className="flex-none">
        <ArrowRightIcon />
      </span>
    </div>
  );
}
