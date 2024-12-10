import { getPostsByTag } from "@/utils/post";
import { SearchResult } from "@/components/search/SearchResult";
import { PageHeading } from "@/components/PageHeading";

type PageProps = {
  params: {
    tag: string;
  };
};

export default function TagPage({ params }: PageProps) {
  const { tag: _tag } = params;
  const tag = decodeURI(decodeURIComponent(_tag)); // 어째서?
  const posts = getPostsByTag(tag);
  const taggedPosts = posts.filter((p) => p.data.tags.includes(tag));

  return (
    <>
      <PageHeading>Tag: {tag}</PageHeading>
      <ul className="w-full">
        {taggedPosts.map((post) => (
          <li key={post.data.title} className="mb-16 last:mb-0">
            <SearchResult className="p-4" post={post} />
          </li>
        ))}
      </ul>
    </>
  );
}
