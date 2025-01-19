"use client";

import { ComponentProps } from "react";
import { IconButton, Toast, Tooltip } from "terra-design-system/react";
import { ShareIcon, XIcon } from "lucide-react";
import { cx } from "@/utils/cx";
import { share } from "@/utils/share";
import { isFailed } from "@/utils/predicate";

export type ShareButtonProps = ComponentProps<typeof IconButton> & {
  shareData: ShareData;
};

export function ShareButton(props: ShareButtonProps) {
  const { children, className, size, shareData, ...rest } = props;

  const toaster = Toast.createToaster({
    placement: "bottom",
    overlap: true,
    gap: 16,
    removeDelay: 300,
    duration: 3000,
  });

  const onShareSuccess = () => {
    toaster.create({
      title: "🙇‍♂️ Successfully shared your content!",
    });
  };

  const handleClickShare = async () => {
    const result = await share(shareData);
    if (isFailed(result)) {
      return;
    }

    onShareSuccess();
  };

  return (
    <>
      <Tooltip.Root theme="neutral">
        <Tooltip.Trigger asChild>
          <IconButton
            size={size}
            variant="outline"
            className={cx(className)}
            onClick={handleClickShare}
            {...rest}
          >
            <ShareIcon size={24} />
          </IconButton>
        </Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>
            <Tooltip.Arrow>
              <Tooltip.ArrowTip />
            </Tooltip.Arrow>
            Share with others!
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
      <Toast.Toaster toaster={toaster}>
        {(toast) => (
          <Toast.Root key={toast.id} className="bg-gray-800">
            <Toast.Title className="text-white text-left  mb-0 font-normal text-md">
              {toast.title}
            </Toast.Title>
            <Toast.Description className="text-white font-light text-sm">
              {toast.description}
            </Toast.Description>
            <Toast.CloseTrigger asChild>
              <IconButton
                size="xs"
                theme="whiteAlpha"
                variant="ghost"
                className="text-white -mt-0.5"
              >
                <XIcon size={16} />
              </IconButton>
            </Toast.CloseTrigger>
          </Toast.Root>
        )}
      </Toast.Toaster>
    </>
  );
}
