import { useEffect, useState } from "react";
import { changeMode, isDarkMode } from "@/utils/darkmode";

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const targetNode = document.documentElement;

    const config = { attributes: true };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const isDark = isDarkMode();
          setIsDark(isDark);
          changeMode(isDark);
        }
      }
    });

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    // Later, you can stop observing
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const isDark = isDarkMode();
    setIsDark(isDark);
    changeMode(isDark);
  }, []);

  const on = () => {
    setIsDark(true);
    changeMode(true);
  };
  const off = () => {
    setIsDark(false);
    changeMode(false);
  };
  const toggle = () => {
    setIsDark(!isDark);
    changeMode(!isDark);
  };

  return {
    on,
    off,
    toggle,
    isDark,
  };
};
