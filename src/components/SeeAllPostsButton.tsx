"use client";

import { Button } from "terra-design-system/react";
import { useRouter } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";

export function SeeAllPostsButton(props: { className?: string }) {
  const router = useRouter();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    router.push("/posts", { scroll: true });
  };

  return (
    <Button
      variant="ghost"
      theme="primary"
      onClick={handleClick}
      rightIcon={<ChevronRightIcon size={24} />}
      {...props}
    >
      모든 포스트 보기
    </Button>
  );
}
