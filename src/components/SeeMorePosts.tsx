"use client";

import { Link } from "terra-design-system/react";
import { useRouter } from "next/navigation";
import { ArrowUpRightIcon } from "lucide-react";

export function SeeMorePosts(props: { className?: string }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/posts", { scroll: true });
  };

  return (
    <Link theme="primary" onClick={handleClick} {...props}>
      더 많은 포스트 보기 <ArrowUpRightIcon size={24} />
    </Link>
  );
}
