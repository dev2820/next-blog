import { getAllPosts, getPostBySlug } from "@/utils/post";
import { isNil } from "@/utils/predicate";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { HeroImage } from "@/components/HeroImage";
import { Heading1 } from "@/components/Heading1";
import { Heading2 } from "@/components/Heading2";
import { Heading3 } from "@/components/Heading3";
import { Heading4 } from "@/components/Heading4";
import { Heading5 } from "@/components/Heading5";
import { Heading6 } from "@/components/Heading6";
import { Paragraph } from "@/components/Paragraph";
import { Image } from "@/components/Image";
import { Code } from "@/components/Code";
import { Emphasize } from "@/components/Emphasize";
import { Strong } from "@/components/Strong";
import { Anchor } from "@/components/Anchor";
import { CodeBlock } from "@/components/CodeBlock";
import { Blockquote } from "@/components/Blockquote";
import { readingTime } from "reading-time-estimator";
import path from "path";
import { cx } from "@/utils/cx";

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
  const basePath = `/posts/${slug}/`;
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
        rehypePlugins: [rehypePrismPlus, rehypeSlug, rehypeAutolinkHeadings],
      },
    },
    components: {
      h1: (props) => <Heading1 {...props} />,
      h2: (props) => <Heading2 {...props} />,
      h3: (props) => <Heading3 {...props} />,
      h4: (props) => <Heading4 {...props} />,
      h5: (props) => <Heading5 {...props} />,
      h6: (props) => <Heading6 {...props} />,
      p: (props) => <Paragraph {...props} />,
      img: ({ alt, src, width, height, ...rest }) => (
        <Image
          src={path.join(basePath, src ?? "")}
          alt={alt ?? ""}
          width={Number(width ?? 704)}
          height={Number(height ?? 300)}
          className="mx-auto my-12 w-full max-w-[704px]"
          {...rest}
        />
      ),
      em: (props) => (
        <Emphasize
          {...props}
          // for caption
          className="[img+&]:block [img+&]:text-center [img+&]:text-gray-400 [img+&]:font-thin [img+&]:not-italic [img+&]:text-sm [img+&]:-translate-y-10"
        />
      ),
      strong: (props) => <Strong {...props} />,
      code: (props) => <Code {...props} />,
      pre: (props) => <CodeBlock {...props} />,
      a: (props) => <Anchor {...props} />,
      blockquote: (props) => <Blockquote {...props} />,
      // table``, li, ol, ul
    },
  });

  const readTime = readingTime(content);
  return (
    <>
      <main className="min-h-screen max-w-[896px] desktop:p-24 p-6">
        {data.hero && (
          <HeroImage
            src={path.join(`/posts/${slug}/`, data.hero)}
            alt="hero image"
            className="max-w-full w-full"
            width="500"
            height="300"
          />
        )}
        <Heading1 id={data.title}>{data.title}</Heading1>
        <span>{format(data.created, "yyyy-MM-dd")}</span>|
        <span>{readTime.minutes} mins</span>
        {CompiledMDX}
      </main>
    </>
  );
}
