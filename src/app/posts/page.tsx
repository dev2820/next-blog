import { getAllPosts } from "@/utils/post";
import Link from "next/link";

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

  return (
    <>
      {/**
       * 태그 검색
       * 태그 표시(w. 갯수)
       */}
      <ul>
        {/**
         * 모든 포스트 최신순 정렬
         * 정렬 변경 (최신순, 역순)
         */}
        {frontMatters.map((fm, i) => (
          <li key={i}>
            <Link href={"/posts/" + fm.slug}>{fm.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
