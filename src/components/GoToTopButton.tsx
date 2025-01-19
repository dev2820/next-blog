"use client";

import { scrollToTop } from "@/utils/scroll";
import { ArrowUpToLineIcon } from "lucide-react";
import {
  IconButton,
  IconButtonProps,
  Tooltip,
} from "terra-design-system/react";

type GoToTopButtonProps = Omit<IconButtonProps, "onClick">;
export function GoToTopButton(props: GoToTopButtonProps) {
  const { size = "lg", theme = "neutral", ...rest } = props;

  const handleClickBtn = () => {
    scrollToTop();
  };
  return (
    <Tooltip.Root theme="neutral">
      <Tooltip.Trigger asChild>
        <IconButton
          size={size}
          theme="neutral"
          onClick={handleClickBtn}
          {...rest}
        >
          <ArrowUpToLineIcon />
        </IconButton>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>
          <Tooltip.Arrow>
            <Tooltip.ArrowTip />
          </Tooltip.Arrow>
          Go to top
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  );
}
