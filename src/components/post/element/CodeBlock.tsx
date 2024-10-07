"use client";

import { cx } from "@/utils/cx";
import { isNil } from "@/utils/predicate";
import {
  Children,
  isValidElement,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import {
  CodeBlock as _CodeBlock,
  CodeBlockProps as _CodeBlockProps,
  CodeProps as _CodeProps,
} from "react-code-block";
import { themes } from "prism-react-renderer";
import { ClipboardIcon } from "lucide-react";
import { IconButton, Tooltip } from "terra-design-system/react";
import { useDisclosure } from "@/hooks/use-disclosure";
import { copyTextToClipboard } from "@/utils/clipboard";

export type CodeBlockProps = ComponentProps<"pre">;
export function CodeBlock(props: CodeBlockProps) {
  const { children, className, ...rest } = props;
  const child = Children.only(children);
  const tooltipHandler = useDisclosure(false);
  const tooltipCloseRef = useRef<NodeJS.Timeout>();

  if (isNil(child) || !isValidElement<HTMLElement>(child)) {
    throw new Error("CodeBlock must have Child");
  }

  const [, language] = child.props.className.split("language-");
  const code = String(child.props.children);

  const handleCopyCode = () => {
    copyTextToClipboard(code);
    if (!tooltipHandler.isOpen) {
      tooltipHandler.open();
    }
    if (tooltipCloseRef.current) {
      clearTimeout(tooltipCloseRef.current);
    }
    tooltipCloseRef.current = setTimeout(() => {
      tooltipHandler.close();
    }, 3000);
  };

  return (
    <_CodeBlock code={code} language={language} theme={themes.dracula}>
      <div className="relative">
        <_CodeBlock.Code
          className={cx("py-4 px-8 bg-[#282a36] rounded-md", className)}
          {...rest}
        >
          <div className="table-row">
            <_CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
            <_CodeBlock.LineContent className="table-cell">
              <_CodeBlock.Token />
            </_CodeBlock.LineContent>
          </div>
        </_CodeBlock.Code>
        <Tooltip.Root
          theme="neutral"
          positioning={{
            placement: "top",
            offset: { mainAxis: 12 },
          }}
          open={tooltipHandler.isOpen}
          closeOnPointerDown={false}
          closeOnClick={false}
        >
          <Tooltip.Trigger asChild>
            <IconButton
              variant="outline"
              theme="whiteAlpha"
              className="absolute right-2 top-2 text-white"
              onClick={handleCopyCode}
            >
              <ClipboardIcon />
            </IconButton>
          </Tooltip.Trigger>
          <Tooltip.Content>Copied!</Tooltip.Content>
        </Tooltip.Root>
      </div>
    </_CodeBlock>
  );
}
