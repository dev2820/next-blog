import { generateTOC, getPostBySlug } from "@/utils/post";
import { isNil } from "@/utils/predicate";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import path from "node:path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { HeroImage } from "@/components/post/HeroImage";
import { readingTime } from "reading-time-estimator";
import {
  Anchor,
  Blockquote,
  Code,
  CodeBlock,
  Emphasize,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  ListItem,
  OrderedList,
  Paragraph,
  Strong,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  UnorderedList,
} from "@/components/post/element";
import { AuthorInfo } from "@/components/post/AuthorInfo";
import { ShareButton } from "@/components/post/ShareButton";
import { TableOfContents } from "@/components/post/TableOfContents";
import { remarkSectionize } from "@/utils/remark";
import { Comment } from "@/components/post/Comment";
import { Ficture } from "@/components/post/element/Ficture";

const BASE_PATH = process.env.basePath ?? "";
const TITLE = process.env.title ?? "";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: PageProps) {
  const { slug } = params;
  const post = getPostBySlug(slug);
  const basePath = `${BASE_PATH}/posts/${slug}`;
  if (isNil(post)) {
    notFound();
  }

  const { data, content } = post;

  const toc = generateTOC(content);

  const { content: CompiledMDX } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkSectionize],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
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
        <Ficture
          src={path.join(basePath, src ?? "")}
          alt={alt ?? ""}
          width={0}
          height={0}
          className="mx-auto my-12 w-full max-w-[704px] max-h-[600px] object-contain"
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
      pre: ({ children }) => {
        return <CodeBlock>{children}</CodeBlock>;
      },
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
  // TODO: localization 고려
  const publishedAt = format(data.published, "yyyy-MM-dd");
  return (
    <>
      <article className="relative">
        <header id="post-meta">
          {data.image && (
            <HeroImage
              src={path.join(basePath, data.image)}
              alt="hero image"
              className="max-w-full w-full rounded-md"
              width={0}
              height={0}
            />
          )}
          <Heading1 id={data.title}>{data.title}</Heading1>
          <time
            dateTime={publishedAt}
            aria-label={`Published on ${publishedAt}`}
          >
            {format(data.published, "yyyy-MM-dd")}
          </time>{" "}
          |{" "}
          <time
            dateTime={`PT${readTime.minutes}M`}
            aria-label="Estimated reading time"
          >
            {readTime.minutes} mins
          </time>
        </header>

        <div id="content" className="relative">
          <aside className="absolute -right-12 translate-x-full h-full w-52 desktop:block hidden">
            <TableOfContents toc={toc} className="sticky top-24" />
          </aside>
          {CompiledMDX}
          <div className="text-center my-36">
            <ShareButton
              size="lg"
              shareData={{
                title: `${TITLE} - ${data.title}`,
                text: data.summary,
                url: basePath,
              }}
              aria-label="Share this article"
            />
          </div>
        </div>
        <section id="author">
          <AuthorInfo />
        </section>
        <section id="comments-and-reaction">
          <Comment className="w-full" />
        </section>
      </article>
    </>
  );
}
