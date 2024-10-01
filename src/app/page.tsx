import Link from "next/link";

export default function HomePage() {
  return (
    <>
      Home Page
      <Link href="./posts">to all posts</Link>
    </>
  );
}
