import { Success, Failed } from "@/types/monad";
import type { Author } from "@/types/author";

type RawAuthor = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string;
  location: string;
  email: string | null;
  hireable: null;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export const fetchAuthor = async (githubID: string) => {
  try {
    const res = await fetch(`https://api.github.com/users/${githubID}`);
    const rawAuthor = (await res.json()) as RawAuthor;

    return {
      isFailed: false,
      value: toAuthor(rawAuthor),
      error: null,
    } as Success<Author>;
  } catch (err) {
    return {
      isFailed: true,
      value: null,
      error: err,
    } as Failed<Error>;
  }
};

const toAuthor = (rawAuthor: RawAuthor): Author => {
  return {
    name: rawAuthor.login,
    nickname: rawAuthor.name,
    avatarURL: rawAuthor.avatar_url,
    githubURL: rawAuthor.html_url,
    company: rawAuthor.company ?? undefined,
    location: rawAuthor.location ?? undefined,
    bio: rawAuthor.bio ?? undefined,
  };
};
