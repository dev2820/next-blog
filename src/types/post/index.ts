export type * from "./table-of-contents";

export type Post = {
  data: PostData;
  content: string;
};

export type PostData = {
  title: string;
  published: string;
  tags: string[];
  slug: string;
  modified?: string;
  summary?: string;
  draft?: boolean;
  image?: string; // hero image까지의 path
};
