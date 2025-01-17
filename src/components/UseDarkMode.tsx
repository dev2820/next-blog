"use client";

import { isDarkMode } from "@/utils/darkmode";
import { useEffect } from "react";

export function UseDarkMode() {
  useEffect(() => {
    if (isDarkMode()) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return <></>;
}
