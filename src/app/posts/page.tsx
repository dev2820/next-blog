import { getAllPostsPath, getPostByPath } from "@/utils/posts";
export default function PostsPage() {
  const paths = getAllPostsPath();
  const frontMatters = paths
    .map(getPostByPath)
    .map((post) => post.data)
    .toSorted((a, b) =>
      new Date(a.created).getTime() < new Date(b.created).getTime() ? 1 : -1
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        {frontMatters.map((fm, i) => (
          <li key={i}>{fm.title}</li>
        ))}
      </ul>
    </main>
  );
}
