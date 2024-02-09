export function loadScript(url: string, callback?: () => void) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if (callback) {
    script.onload = callback;
  }
  script.src = url;
  document.head.appendChild(script);
}
