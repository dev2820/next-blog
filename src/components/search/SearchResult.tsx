import { Post } from "@/types/post";
import { cx } from "@/utils/cx";
import RouterLink from "next/link";
import { ComponentProps } from "react";
import { Tag } from "@/components/Tag";
import { format } from "date-fns";

export type SearchResultProps = Omit<SearchResultRootProps, "children"> & {
  post: Post;
};
export function SearchResult(props: SearchResultProps) {
  const { post, className, ...rest } = props;

  const dateStr = format(new Date(post.data.published), "yyyy년 MM월 dd일");
  return (
    <SearchResultRoot className={cx("", className)} {...rest}>
      <RouterLink href={`/posts/${post.data.slug}`}>
        <SearchResultTitle className="hover:underline">
          {post.data.title}
        </SearchResultTitle>
      </RouterLink>
      <SearchResultSummary>{post.data.summary}</SearchResultSummary>
      <SearchResultInfo>{dateStr}</SearchResultInfo>
      <div className="mt-4 flex flex-row flex-wrap gap-2.5">
        {post.data.tags.map((tag) => (
          <RouterLink href={`/tags/${encodeURIComponent(tag)}`} key={tag}>
            <Tag theme="secondary">{tag}</Tag>
          </RouterLink>
        ))}
      </div>
    </SearchResultRoot>
  );
}

type SearchResultRootProps = ComponentProps<"section">;
function SearchResultRoot(props: SearchResultRootProps) {
  const { className, children, ...rest } = props;

  return (
    <section className={cx(className)} {...rest}>
      {children}
    </section>
  );
}

type SearchResultTitleProps = ComponentProps<"h3">;
function SearchResultTitle(props: SearchResultTitleProps) {
  const { className, children, ...rest } = props;

  return (
    <h3
      className={cx(
        "inline-block text-3xl lg:text-4xl leading-[1.2] font-semibold",
        className
      )}
      {...rest}
    >
      {children}
    </h3>
  );
}

type SearchResultSummaryProps = ComponentProps<"p">;
function SearchResultSummary(props: SearchResultSummaryProps) {
  const { className, children, ...rest } = props;

  return (
    <p
      className={cx(
        "text-gray-800 font-light text-lg lg:text-xl mt-4",
        className
      )}
      {...rest}
    >
      {children}
    </p>
  );
}

type SearchResultInfoProps = ComponentProps<"i">;
function SearchResultInfo(props: SearchResultInfoProps) {
  const { className, children, ...rest } = props;

  return (
    <i
      className={cx(
        "inline-block text-gray-400 font-light text-md lg:text-lg mt-4",
        className
      )}
      {...rest}
    >
      {children}
    </i>
  );
}
