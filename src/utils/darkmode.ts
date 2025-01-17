const DARKMODE_KEY = "_darkMode";

export const changeMode = (isDarkmode: boolean) => {
  localStorage.setItem(DARKMODE_KEY, isDarkmode ? "true" : "false");
  document.documentElement.classList.toggle("dark");
};
export const isDarkMode = () => {
  const persist = localStorage?.getItem(DARKMODE_KEY);

  return persist === "true" ? true : false;
};
