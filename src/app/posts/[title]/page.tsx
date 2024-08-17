import { getAllPostsPath, getPostByPath } from "@/utils/posts";
import { isDateInYear } from "@/utils/date";
import { format } from "date-fns";

type PageProps = {
  params: {
    title: string;
  };
};

export default function PostPage({ params }: PageProps) {
  const { title } = params;
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
        {frontMatters.map((a, i) => (
          <li key={i}>
            {a.title} | {format(new Date(a.created), "yyyy. MM. dd hh:mm")}
          </li>
        ))}
      </ul>
    </main>
  );
}
