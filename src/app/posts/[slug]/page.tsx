import { getAllPosts, getPostBySlug, rehypeImgTransformer } from "@/utils/post";
import { isNil } from "@/utils/predicate";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Heading2 } from "@/components/Heading2";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Heading1 } from "@/components/Heading1";
import { Heading3 } from "@/components/Heading3";
import { Heading4 } from "@/components/Heading4";
import { Heading5 } from "@/components/Heading5";
import { Heading6 } from "@/components/Heading6";
import { Paragraph } from "@/components/Paragraph";
import { readingTime } from "reading-time-estimator";

type PageProps = {
  params: {
    slug: string;
  };
};
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((p) => ({
    slug: p.data.slug,
  }));
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = params;
  const post = getPostBySlug(slug);

  if (isNil(post)) {
    notFound();
  }

  const { data, content } = post;

  const { content: CompiledMDX } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypePrismPlus,
          rehypeSlug,
          rehypeAutolinkHeadings,
          rehypeImgTransformer,
        ],
      },
    },
    components: {
      h1: (props) => <Heading1 {...props} />,
      h2: (props) => <Heading2 {...props} />,
      h3: (props) => <Heading3 {...props} />,
      h4: (props) => <Heading4 {...props} />,
      h5: (props) => <Heading5 {...props} />,
      h6: (props) => <Heading6 {...props} />,
      paragraph: (props) => <Paragraph {...props} />,
    },
  });

  const readTime = readingTime(content);
  return (
    <main className="min-h-screen p-24">
      <Heading1 id={data.title}>{data.title}</Heading1>
      <span>{format(data.created, "yyyy-MM-dd")}</span>|
      <span>{readTime.minutes} mins</span>
      {CompiledMDX}
    </main>
  );
}
