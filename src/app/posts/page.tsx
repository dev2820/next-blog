import { getAllPosts, getPostByPath } from "@/utils/post";
import Link from "next/link";

export default function PostsPage() {
  /**
   * 포스트 조회, 최신 포스트 보기, 인기 포스트 보기 등 분류 제공
   */
  const posts = getAllPosts();
  const frontMatters = posts
    .map((post) => post.data)
    .toSorted((a, b) =>
      new Date(a.created).getTime() < new Date(b.created).getTime() ? 1 : -1
    );

  return (
    <>
      <ul>
        {frontMatters.map((fm, i) => (
          <li key={i}>
            <Link href={"/posts/" + fm.title}>{fm.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
