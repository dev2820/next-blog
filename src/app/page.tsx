import { Button } from "terra-design-system/react";
import { PageHeading } from "@/components/PageHeading";
import { SearchResult } from "@/components/search/SearchResult";
import { getAllPosts } from "@/utils/post";
import { SeeAllPostsButton } from "@/components/SeeAllPostsButton";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const recentPosts = getAllPosts()
    .toSorted((a, b) =>
      new Date(a.data.published) < new Date(b.data.published) ? 1 : -1
    )
    .slice(0, 3);
  return (
    <>
      <PageHeading>
        <span className="text-primary">Terra</span>의 개발 블로그
      </PageHeading>
      <p className="text-xl">성장을 기록하고 측정하는 곳</p>
      <div className="h-36">
        {/**
         * typed.js로 뭔가 해볼까?
         */}
      </div>
      <section>
        <ul>
          {recentPosts.map((post) => (
            <li key={post.data.slug} className="mb-16 last:mb-0">
              <SearchResult post={post} />
            </li>
          ))}
        </ul>
        <SeeAllPostsButton className="mt-12 w-40 mx-auto" />
      </section>
    </>
  );
}
