import { getAllPosts } from "@/utils/post";
import Link from "next/link";

export default function SearchPage() {
  /**
   * 검색하기(with Params, with feed.json)
   * 은근슬쩍 포스트 추천하기
   */
  const posts = getAllPosts();
  const frontMatters = posts
    .map((post) => post.data)
    .toSorted((a, b) =>
      new Date(a.published).getTime() < new Date(b.published).getTime() ? 1 : -1
    );

  return (
    <>
      {/**
       * 검색바
       */}
      {/**
       * 태그 검색
       * 태그 표시(w. 갯수)
       */}
      {/**
       * 검색 결과
       */}
      {/**
       * 이런 포스트는 어떠세요
       */}
    </>
  );
}
