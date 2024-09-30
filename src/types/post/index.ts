export type Post = {
  data: PostData;
  content: string;
};

export type PostData = {
  title: string;
  created: string;
  tags: string[];
  modified?: string;
  summary?: string;
  draft?: boolean;
  slug?: string;
  image?: string; // hero image까지의 path
};
