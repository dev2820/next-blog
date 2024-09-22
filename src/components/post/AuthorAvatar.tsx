"use client";

import { Avatar, AvatarProps } from "terra-design-system/react";
import { getAuthor } from "@/utils/author";

export type AuthorAvatarProps = AvatarProps;
export function AuthorAvatar(props: AuthorAvatarProps) {
  const { profile } = getAuthor();

  return <Avatar src={profile} {...props} />;
}
