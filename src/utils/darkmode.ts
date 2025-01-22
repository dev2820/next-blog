const DARKMODE_KEY = "_darkMode";

export const changeMode = (isDarkmode: boolean) => {
  console.log(isDarkmode);
  localStorage.setItem(DARKMODE_KEY, isDarkmode ? "true" : "false");
  if (isDarkmode && !document.documentElement.classList.contains("dark")) {
    console.log("?");
    document.documentElement.classList.add("dark");
  } else if (
    !isDarkmode &&
    document.documentElement.classList.contains("dark")
  ) {
    document.documentElement.classList.remove("dark");
  }
};
export const isDarkMode = () => {
  const persist = localStorage?.getItem(DARKMODE_KEY);

  return persist === "true" ? true : false;
};
