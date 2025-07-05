import { generateTOC, getPostBySlug } from "@/utils/post";
import { isNil } from "@/utils/predicate";
import { notFound } from "next/navigation";
import RouterLink from "next/link";
import { format } from "date-fns";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import path from "node:path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { HeroImage } from "@/components/post/HeroImage";
import { readingTime } from "@/utils/reading-time";
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
import { Comment } from "@/components/post/Comment";
import { Picture } from "@/components/post/element/Picture";
import { CalendarDaysIcon, CoffeeIcon, FeatherIcon } from "lucide-react";
import Link from "next/link";
import { Tag } from "@/components/Tag";
import { NextPost } from "@/components/post/NextPost";
import { PrevPost } from "@/components/post/PrevPost";
import { cx } from "@/utils/cx";
import { GoToTopButton } from "@/components/GoToTopButton";

const BASE_PATH = process.env.basePath ?? "";
const TITLE = process.env.title ?? "";
const GITHUB_URL = process.env.githubURL ?? "";
const AUTHOR = process.env.author ?? "";
const NICK_NAME = process.env.nickname ?? "";

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
        remarkPlugins: [remarkGfm],
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
        <Picture
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
          className="[img+&]:block [img+&]:text-center [img+&]:text-fg-caption! [img+&]:font-normal [img+&]:not-italic [img+&]:text-sm [img+&]:-translate-y-10"
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
  const publishedAt = format(data.published, "yyyy-MM-dd");
  const prevPost = data.prev ? getPostBySlug(data.prev) : null;
  const nextPost = data.next ? getPostBySlug(data.next) : null;
  return (
    <>
      <article className="relative">
        <header id="post-meta" className="text-fg-title">
          {data.image && (
            <HeroImage
              src={path.join(basePath, data.image)}
              alt="hero image"
              className="max-w-full w-full rounded-md h-96 object-contain"
              width={0}
              height={96 * 4}
            />
          )}
          <Heading1 id={data.title}>{data.title}</Heading1>
          <div className="flex flex-row place-items-center gap-2 text-fg-description">
            <FeatherIcon size={20} />
            <span className="text-md leading-8 mt-0.5">
              <Anchor href={GITHUB_URL} target="_blank" theme="primary">
                {AUTHOR} ({NICK_NAME})
              </Anchor>
            </span>
          </div>
          <time
            dateTime={publishedAt}
            aria-label={`Published on ${publishedAt}`}
            className="flex flex-row place-items-center gap-2 text-fg-description"
          >
            <CalendarDaysIcon size={20} />
            <span className="text-md leading-8 mt-0.5">
              {format(data.published, "yyyy년 MM월 dd일")}
            </span>
          </time>
          <time
            dateTime={`PT${readTime.minutes}M`}
            aria-label="Estimated reading time"
            className="flex flex-row place-items-center gap-2 text-fg-description"
          >
            <CoffeeIcon size={20} />
            <span className="text-md leading-8 mt-0.5">
              {readTime.minutes} 분
            </span>
          </time>
        </header>

        <div id="content" className="relative">
          {CompiledMDX}
          <div className="flex flex-row gap-3 justify-center my-12">
            <ShareButton
              size="lg"
              theme="primary"
              variant="filled"
              shareData={{
                title: `${TITLE} - ${data.title}`,
                text: data.summary,
                url: basePath,
              }}
              aria-label="Share this article"
            />
            <GoToTopButton />
          </div>

          <ul className="flex flex-row gap-3 flex-wrap justify-start mb-20">
            {data.tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="rounded-full"
                >
                  <Tag theme="secondary">{tag}</Tag>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <section
          id="another-posts"
          className={cx("flex flex-col justify-between mb-10", "sm:flex-row")}
        >
          {prevPost && prevPost.data.draft && (
            <RouterLink
              href={`/posts/${prevPost.data.slug}`}
              className="flex-none self-start"
            >
              <PrevPost post={prevPost} />
            </RouterLink>
          )}
          <div className="flex-1 min-w-4 min-h-4"></div>
          {nextPost && nextPost.data.draft && (
            <RouterLink
              href={`/posts/${nextPost.data.slug}`}
              className="flex-none self-end"
            >
              <NextPost post={nextPost} />
            </RouterLink>
          )}
        </section>
        <section id="author" className="mb-4">
          <AuthorInfo />
        </section>
        <section id="comments-and-reaction">
          <Comment className="w-full" />
        </section>
        <aside className="h-full absolute top-0 -right-12 translate-x-full w-52 desktop-lg:block hidden">
          <TableOfContents toc={toc} className="sticky top-24" />
        </aside>
      </article>
    </>
  );
}
