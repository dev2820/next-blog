"use client";

import { PageHeading } from "@/components/PageHeading";
import { Link } from "terra-design-system/react";
import GithubSvg from "@/assets/github.svg";
import LogoFullSvg from "@/assets/logo-full.svg";
import Image from "next/image";

type Project = {
  title: string;
  description: string;
  link: string;
  github?: string;
  img: string;
};
/**
 * 나열할 프로젝트 목록
 */
const PROJECTS: Project[] = [
  {
    title: "VoCue: IELTS 영어 단어장",
    description: "단어와 예문을 기록하고 카드로 반복 복습하는 개인 단어장 앱",
    link: "https://play.google.com/store/apps/details?id=com.dev2820.vocue&hl=ko",
    img: "https://play-lh.googleusercontent.com/6zU7TcKEVn-TRrOooJVddUKvH9NrantyZO1vOHU6nfPXm5CxLZ9e_Hh-8caJgKlq6mS60DFW89DLENsvySmecA=s0-br30",
  },
  {
    title: "Terra Design System",
    description: "개인용 디자인 시스템",
    link: "https://dev2820.github.io/terra-design-system/",
    github: "https://github.com/dev2820/terra-design-system",
    img: "",
  },
  {
    title: "image-optimizer",
    description: "서버를 거치지 않는 안전한 이미지 최적화 서비스",
    link: "https://dev2820.github.io/image-optimizer/",
    github: "https://github.com/dev2820/image-optimizer",
    img: "https://dev2820.github.io/image-optimizer/logo.png",
  },
  {
    title: "tmux-claude-usage",
    description: "tmux에서 클로드 코드 사용량을 조회하는 플러그인",
    link: "https://github.com/dev2820/tmux-claude-usage",
    github: "https://github.com/dev2820/tmux-claude-usage",
    img: "",
  },
] as const;

export default function ProjectsPage() {
  return (
    <>
      <PageHeading>Projects</PageHeading>
      <ul className="flex flex-wrap gap-6">
        {PROJECTS.map((project) => (
          <li key={project.title}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </>
  );
}

const ProjectCard = (props: { project: Project }) => {
  const { project } = props;

  return (
    <div className="group block w-72 overflow-hidden rounded-xl border border-neutral-200 bg-layer transition-shadow hover:shadow-lg">
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
        <div className="aspect-video w-full overflow-hidden bg-neutral-100">
          {project.img ? (
            <Image
              src={project.img}
              alt={project.title}
              width={288}
              height={(288 * 9) / 16}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <LogoFullSvg aria-hidden="true" className="h-10 w-auto text-black dark:text-white" />
            </div>
          )}
        </div>
        <div className="flex h-24 flex-col gap-1 p-4">
          <h3 className="text-lg font-semibold text-fg-title">{project.title}</h3>
          <p className="text-sm text-fg-description">{project.description}</p>
        </div>
      </a>
      <div className="flex h-12 items-center gap-2 border-t border-neutral-200 px-4 py-3">
        {project.github && (
          <Link
            href={project.github}
            target="_blank"
            className="text-fg-caption transition-colors hover:text-fg"
          >
            <GithubSvg fill="currentColor" width={18} height={18} />
          </Link>
        )}
      </div>
    </div>
  );
};
