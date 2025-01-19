import { useEffect, useState } from "react";
import { changeMode, isDarkMode } from "@/utils/darkmode";

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    setIsDark(isDarkMode());
  }, []);

  useEffect(() => {
    changeMode(isDark);
  }, [isDark]);

  const on = () => {
    setIsDark(true);
  };
  const off = () => {
    setIsDark(false);
  };
  const toggle = () => {
    setIsDark(!isDark);
  };

  return {
    on,
    off,
    toggle,
    isDark,
  };
};
