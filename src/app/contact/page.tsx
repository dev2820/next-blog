"use client";

import { cx } from "@/utils/cx";
import { Building, MailIcon, MapPinIcon } from "lucide-react";
import { Link } from "terra-design-system/react";
import githubLogo from "@/assets/images/github-mark.png";
import linkedinLogo from "@/assets/images/linkedin-mark.png";
import Image from "next/image";

const NAME = process.env.name;
const NICKNAME = process.env.nickname;
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
  // QR을 넣을까 말까
  return (
    <div className="flex flex-col place-items-center">
      <div
        className={cx(
          "bg-[#F1F1EF] flex flex-col text-left shadow-lg shadow-[#c8c8c7] p-8 w-full max-w-[30rem] rounded-lg"
        )}
      >
        <div className="text-3xl mb-1">
          {NAME} ({NICKNAME})
        </div>
        <div className="text-md mb-4">{POSITION}</div>
        <div className="mt-8 grid grid-cols-[24px_1fr] gap-x-2 gap-y-2 items-center">
          <Building size={24} />
          <Link href={COMPANY_URL!} target="_blank">
            {COMPANY}
          </Link>
          <MailIcon size={24} />
          <span>second28200@gmail.com</span>
          <Image src={githubLogo} alt={"github logo"} className="w-6 h-6" />
          <Link href={GITHUB_URL!} target="_blank">
            {GITHUB_ID}
          </Link>
          <Image
            src={linkedinLogo}
            alt={"github logo"}
            className="h-6 w-6 object-cover object-left-top"
          />
          <Link href={LINKEDIN_URL!} target="_blank">
            {LINKEDIN_ID}
          </Link>
          <MapPinIcon size={24} />
          <span>
            {COUNTRY} / {REGION}
          </span>
        </div>
      </div>
    </div>
  );
}
