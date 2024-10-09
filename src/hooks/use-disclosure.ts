import { useState } from "react";

export const useDisclosure = (defaultOpen: boolean = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  const close = () => {
    setIsOpen(false);
  };
  const open = () => {
    setIsOpen(true);
  };

  return {
    isOpen,
    close,
    open,
  };
};
