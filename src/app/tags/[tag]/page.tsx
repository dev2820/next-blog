import Link from "next/link";
import { getPostsByTag } from "@/utils/post";
import {
  SearchResultDescription,
  SearchResultRoot,
  SearchResultTitle,
} from "@/components/search/SearchResult";
import { Tag } from "@/components/Tag";
import { PageHeading } from "@/components/PageHeading";

const BASE_PATH = process.env.basePath ?? "";

type PageProps = {
  params: {
    tag: string;
  };
};

export default function TagPage({ params }: PageProps) {
  const { tag: _tag } = params;
  const tag = decodeURIComponent(_tag);
  const posts = getPostsByTag(tag);
  const taggedPosts = posts.filter((p) => p.data.tags.includes(tag));

  return (
    <>
      <PageHeading>Tag: {tag}</PageHeading>
      <ul className="w-full">
        {taggedPosts.map((post) => (
          <li
            key={post.data.title}
            className="mb-4 last:mb-0 border-b first:border-t"
          >
            <SearchResultRoot className="p-4">
              <Link
                href={`/posts/${post.data.slug}`}
                className="hover:underline"
              >
                <SearchResultTitle>{post.data.title}</SearchResultTitle>
              </Link>
              <SearchResultDescription>
                {post.data.summary}
              </SearchResultDescription>
              <div className="mt-4 flex flex-row flex-wrap gap-2.5">
                {post.data.tags.map((tag) => (
                  <Link href={`${BASE_PATH}/tags/${tag}`} key={tag}>
                    <Tag theme="secondary">{tag}</Tag>
                  </Link>
                ))}
              </div>
            </SearchResultRoot>
          </li>
        ))}
      </ul>
    </>
  );
}
