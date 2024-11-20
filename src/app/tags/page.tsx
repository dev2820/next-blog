/**
 * TODO: tag 꾸미기
 * TODO: tag skeleton 애니메이션
 */
import Link from "next/link";
import { cx } from "@/utils/cx";
import { getAllPosts } from "@/utils/post";
import { Tag } from "@/components/Tag";
import { PageHeading } from "@/components/PageHeading";

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
  const compare = (a: [string, number], b: [string, number]) => {
    const aCount = a[1];
    const bCount = b[1];
    return aCount < bCount ? 1 : -1;
  };
  const sortedTags = tags.toSorted(compare);

  return (
    <div className={cx("rounded-md flex flex-col items-center")}>
      <PageHeading>Tags</PageHeading>
      <ul className="flex flex-row flex-wrap gap-3 min-w-72 max-w-12 w-full justify-center">
        {sortedTags.map(([tag, count]) => (
          <li key={tag} className="mb-2.5">
            <Link href={`tags/${encodeURIComponent(tag)}`}>
              <Tag theme="secondary">
                {tag} ({count})
              </Tag>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
