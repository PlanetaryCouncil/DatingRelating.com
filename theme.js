// Day / night toggle. Loaded in <head> on every page so the saved choice applies before
// the first paint (no flash). Without a saved choice the page follows the device setting.
(function () {
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("dr-theme"); } catch {}
  if (saved === "light" || saved === "dark") root.dataset.theme = saved;

  const isDark = () => root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  window.isDarkTheme = isDark;

  document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("nav");
    if (!nav) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    const paint = () => {
      const dark = isDark();
      btn.textContent = dark ? "☀ Day" : "☾ Night";
      btn.setAttribute("aria-label", dark ? "Switch to day mode" : "Switch to night mode");
    };
    btn.addEventListener("click", () => {
      root.dataset.theme = isDark() ? "light" : "dark";
      try { localStorage.setItem("dr-theme", root.dataset.theme); } catch {}
      paint();
    });
    paint();
    nav.querySelector(".logo")?.after(btn);
  });
})();
