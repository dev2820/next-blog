const DARKMODE_KEY = "_darkMode";

export const changeMode = (isDarkmode: boolean) => {
  localStorage.setItem(DARKMODE_KEY, isDarkmode ? "true" : "false");
  if (isDarkmode && !document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
export const isDarkMode = () => {
  const persist = localStorage?.getItem(DARKMODE_KEY);

  return persist === "true" ? true : false;
};
