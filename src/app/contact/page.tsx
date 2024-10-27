"use client";

import Image from "next/image";
import Link from "next/link";
import { cx } from "@/utils/cx";
import { ComponentProps } from "react";

import logoSVG from "@/assets/logo.svg";
const NICKNAME = process.env.nickname;
const GITHUB_ID = process.env.githubId;
const GITHUB_URL = process.env.githubURL;
const LINKEDIN_ID = process.env.linkedinId;
const LINKEDIN_URL = process.env.linkedinURL;

export default function ContactPage() {
  // QR을 넣을까 말까
  // 모바일용 세로 명함 생성 필요
  return (
    <>
      <BusinessCardFront className="mx-auto mb-8" />
      <BusinessCardBehind className="mx-auto" />
    </>
  );
}

type BusinessCardFrontProps = ComponentProps<"div">;
function BusinessCardFront(props: BusinessCardFrontProps) {
  const { className, ...rest } = props;
  return (
    <div
      className={cx(
        "bg-primary-400 flex flex-col justify-center place-items-center shadow-lg",
        className
      )}
      style={{
        width: "450px",
        height: "250px",
      }}
      {...rest}
    >
      <div className="flex flex-row place-items-center justify-center">
        <Image
          src={logoSVG}
          alt={`${NICKNAME}`}
          priority={true}
          width={64}
          height={64}
          className="mr-2"
        />
        <span className="text-4xl">Terra</span>
      </div>
      <p className="text-sm text-center mt-2">FRONTEND DEVELOPER</p>
    </div>
  );
}

type BusinessCardBehindProps = ComponentProps<"div">;
function BusinessCardBehind(props: BusinessCardBehindProps) {
  const { className, ...rest } = props;
  // 그리드 배치 필요
  // 링크 호버시 이펙트 고려
  return (
    <div
      className={cx(
        "bg-white flex flex-col text-left shadow-lg p-4",
        className
      )}
      style={{
        width: "450px", // 90:50 비율
        height: "250px",
      }}
      {...rest}
    >
      <span className="text-xl">양기조 (Terra)</span>
      <span className="text-sm mb-4">네오사피엔스 / 프론트엔드 개발자</span>
      <span>Seoul</span>
      <span>second28200@gmail.com</span>
      <span>
        Github:{" "}
        <Link
          href={GITHUB_URL!}
          target="_blank"
          className="hover:text-primary transition-colors"
        >
          {GITHUB_ID}
        </Link>
      </span>
      <span>
        LinkedIn:{" "}
        <Link
          href={LINKEDIN_URL!}
          target="_blank"
          className="hover:text-primary transition-colors"
        >
          {LINKEDIN_ID}
        </Link>
      </span>
    </div>
  );
}
