import {
  SearchResultRoot,
  SearchResultTitle,
  SearchResultDescription,
} from "@/components/search/SearchResult";
import { Tag } from "@/components/Tag";
import { getAllPosts } from "@/utils/post";
import Link from "next/link";

const BASE_PATH = process.env.basePath ?? "";

export default function PostsPage() {
  /**
   * 포스트 조회, 최신 포스트 보기, 인기 포스트 보기 등 분류 제공
   */
  const posts = getAllPosts();
  const frontMatters = posts
    .map((post) => post.data)
    .filter((post) => post.draft)
    .toSorted((a, b) =>
      new Date(a.published).getTime() < new Date(b.published).getTime() ? 1 : -1
    );
  const tags = [
    ...posts
      .map((p) => p.data.tags)
      .flat()
      .reduce(
        (map, tag) => map.set(tag, (map.get(tag) ?? 0) + 1),
        new Map<string, number>()
      )
      .entries(),
  ];

  return (
    <>
      {/**
       * 태그 검색
       * 태그 표시(w. 갯수)
       */}
      <ul className="flex flex-row gap-3 flex-wrap mb-4">
        {tags.map(([tag, count]) => (
          <li key={tag}>
            <Link href={`${BASE_PATH}/tags/${tag}`} className="rounded-full">
              <Tag>{`${tag} (${count})`}</Tag>
            </Link>
          </li>
        ))}
      </ul>
      {/**
       * 정렬 기능
       */}
      <ul className="w-full">
        {posts.map((post) => (
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
              <div className="mt-4 flex flex-row flex-wrap gap-1">
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
