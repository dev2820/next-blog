import { getPostBySlug, serializeContent } from "@/utils/post";
import { isNil } from "@/utils/predicate";
import { notFound } from "next/navigation";
import { format } from "date-fns";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: PageProps) {
  const { slug } = params;
  const post = getPostBySlug(slug);

  if (isNil(post)) {
    notFound();
  }

  const { data, content } = post;
  const source = await serializeContent(content);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{data.title}</h1>
      <span>{format(data.created, "yyyy-MM-dd")}</span>
      {source}
    </main>
  );
}
