"use client";

import { cx } from "@/utils/cx";
import { Building, MailIcon, MapPinIcon, LinkedinIcon } from "lucide-react";
import { Avatar, Link } from "terra-design-system/react";
import authorData from "@/assets/data/github-profile.json";
import GithubSvg from "@/assets/github.svg";
import { PropsWithChildren } from "react";

const NAME = process.env.name;
const NICKNAME = process.env.nickname;
const EMAIL = process.env.email;
const POSITION = process.env.position;
const COMPANY = process.env.company;
const COMPANY_URL = process.env.companyURL;
const GITHUB_ID = process.env.githubId;
const GITHUB_URL = process.env.githubURL;
const LINKEDIN_ID = process.env.linkedinId;
const LINKEDIN_URL = process.env.linkedinURL;
const COUNTRY = process.env.country;
const REGION = process.env.region;

export default function ContactPage() {
  return (
    <div className="flex flex-col place-items-center mb-20">
      <PaperCard
        className={cx(
          "bg-zinc-50  flex flex-col shadow-xl w-full max-w-[24rem] rounded-xl p-8",
        )}
      >
        {/* Business card layout with vertical flow */}
        <div className="flex flex-col h-full justify-between w-full">
          <Avatar
            size={128}
            src={authorData?.avatarURL}
            className="size-32 flex-none mb-10 bg-black-500 self-center mt-10"
          />
          <div className="flex-1" />
          {/* Name and Title Section */}
          <div className="flex flex-col pb-6">
            <div className="text-3xl font-bold mb-2">{NAME}</div>
            <div className="text-base text-text-neutral mb-1">{NICKNAME}</div>
            <div className="text-sm text-text-neutral mt-1">{POSITION}</div>
          </div>

          {/* Contact Information Section */}
          <div className="flex flex-col space-y-4 flex-1 justify-start pt-10">
            <div className="flex items-center gap-3">
              <Building size={20} className="text-text-neutral flex-shrink-0" />
              <Link href={COMPANY_URL!} target="_blank" className="text-sm">
                {COMPANY}
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <MailIcon size={20} className="text-text-neutral flex-shrink-0" />
              <Link href={`mailto:${EMAIL}`} className="text-sm">
                {EMAIL}
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <GithubSvg fill="currentColor" width={20} height={20}></GithubSvg>
              <Link href={GITHUB_URL!} target="_blank" className="text-sm">
                {GITHUB_ID}
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <LinkedinIcon size={20} />
              <Link href={LINKEDIN_URL!} target="_blank" className="text-sm">
                Linked in
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <MapPinIcon
                size={20}
                className="text-text-neutral flex-shrink-0"
              />
              <span className="text-sm uppercase">
                {REGION}, {COUNTRY}
              </span>
            </div>
          </div>
        </div>
      </PaperCard>
    </div>
  );
}
const PaperCard = ({
  children,
  className = "",
}: PropsWithChildren & { className: string }) => {
  return (
    <div
      className={`relative overflow-hidden bg-[#fdfaf0] shadow-xl ${className}`}
      style={{
        borderRadius: "2px",
        aspectRatio: "5/9",
      }}
    >
      {/* 종이 질감 레이어 (SVG Noise) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 은은한 그림자/그라데이션 (종이의 굴곡 표현) */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/20 via-transparent to-black/5" />

      {/* 실제 내용이 들어가는 영역 */}
      <div className="relative z-10 h-full flex flex-col items-start w-full">
        {children}
      </div>
    </div>
  );
};
