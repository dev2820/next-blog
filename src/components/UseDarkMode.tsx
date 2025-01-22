"use client";

import { isDarkMode } from "@/utils/darkmode";
import { useEffect } from "react";

export function UseDarkMode() {
  useEffect(() => {
    console.log("use dark mode", isDarkMode());
    if (isDarkMode()) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return <></>;
}
