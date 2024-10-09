/**
 * TODO: tag 꾸미기
 * TODO: tag skeleton 애니메이션
 */
import Link from "next/link";
import { cx } from "@/utils/cx";
import { Skeleton } from "terra-design-system/react";
import { getAllPosts } from "@/utils/post";

export default function TagsPage() {
  const posts = getAllPosts();
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
    <div className={cx("rounded-md flex flex-col items-center")}>
      <h2 className="text-5xl font-bold mb-8">Tag</h2>
      <ul>
        {tags.map(([tag, count], idx) => (
          <li key={tag}>
            {/* <Skeleton isLoaded={true}> */}
            <Link href={`tags/${tag}`}>
              {tag} ({count})
            </Link>
            {/* </Skeleton> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
