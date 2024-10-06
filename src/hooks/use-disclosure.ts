import { useCallback, useState } from "react";

export const useDisclosure = (defaultOpen: boolean = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [isOpen]);

  return {
    isOpen,
    close,
    open,
  };
};
