import { PageHeading } from "@/components/PageHeading";
import { SearchResult } from "@/components/search/SearchResult";
import { getAllPosts } from "@/utils/post";
import { SeeMorePosts } from "@/components/SeeMorePosts";
import parrotGif from "@/assets/images/rightparrot.gif";
import Image from "next/image";
import authorData from "@/assets/data/github-profile.json";
import { AuthorProfile } from "@/components/AuthorProfile";

export default function HomePage() {
  const recentPosts = getAllPosts()
    .toSorted((a, b) =>
      new Date(a.data.published) < new Date(b.data.published) ? 1 : -1,
    )
    .slice(0, 3);
  return (
    <>
      <div className="relative">
        <Image
          src={authorData.avatarURL}
          width={224}
          height={224}
          className="mt-20 rounded-full bg-layer border-[3px] border-neutral-subtle"
          alt={"terra's avatar"}
        />
        <div
          aria-hidden
          className="absolute bottom-2 left-2 p-1 border-2 border-neutral-subtler bg-layer rounded-full text-center overflow-hidden shadow-md"
        >
          <Image
            src={parrotGif}
            aria-hidden
            alt="smile"
            className="size-10 p-1px rounded-full"
          />
        </div>
      </div>
      <AuthorProfile />
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
        <SeeMorePosts className="mt-12 w-40 mx-auto" />
      </section>
    </>
  );
}
