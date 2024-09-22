import { getAllPosts, getPostBySlug } from "@/utils/post";
import { isNil } from "@/utils/predicate";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import path from "node:path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { HeroImage } from "@/components/HeroImage";
import { Heading1 } from "@/components/post/Heading1";
import { Heading2 } from "@/components/post/Heading2";
import { Heading3 } from "@/components/post/Heading3";
import { Heading4 } from "@/components/post/Heading4";
import { Heading5 } from "@/components/post/Heading5";
import { Heading6 } from "@/components/post/Heading6";
import { Paragraph } from "@/components/post/Paragraph";
import { Image } from "@/components/post/Image";
import { Code } from "@/components/post/Code";
import { Emphasize } from "@/components/post/Emphasize";
import { Strong } from "@/components/post/Strong";
import { Anchor } from "@/components/post/Anchor";
import { CodeBlock } from "@/components/post/CodeBlock";
import { Blockquote } from "@/components/post/Blockquote";
import { readingTime } from "reading-time-estimator";
import { cx } from "@/utils/cx";
import { ListItem } from "@/components/post/ListItem";
import { UnorderedList } from "@/components/post/UnorderedList";
import { OrderedList } from "@/components/post/OrderedList";
import { Table } from "@/components/post/Table";
import { TableHeader } from "@/components/post/TableHeader";
import { TableBody } from "@/components/post/TableBody";
import { TableHead } from "@/components/post/TableHead";
import { TableRow } from "@/components/post/TableRow";
import { TableCell } from "@/components/post/TableCell";

const BASE_PATH = process.env.basePath;

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
  const basePath = `${BASE_PATH}/posts/${slug}/`;
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
      h1: Heading1,
      h2: Heading2,
      h3: Heading3,
      h4: Heading4,
      h5: Heading5,
      h6: Heading6,
      p: Paragraph,
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
      strong: Strong,
      code: Code,
      pre: ({ className, ...rest }) => (
        <CodeBlock
          className={cx("[&_code]:py-0 [&_code]:px-0", className)}
          {...rest}
        />
      ),
      a: Anchor,
      blockquote: Blockquote,
      li: ListItem,
      ul: UnorderedList,
      ol: OrderedList,
      table: Table,
      thead: TableHeader,
      tbody: TableBody,
      tr: TableRow,
      th: TableHead,
      td: TableCell,
    },
  });

  const readTime = readingTime(content);
  return (
    <>
      <main className="min-h-screen max-w-[896px] desktop:p-24 p-6 text-gray-800">
        {data.image && (
          <HeroImage
            src={path.join(basePath, data.image)}
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
