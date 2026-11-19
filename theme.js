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

  // Snappy page switches: the menu pages are fetched in the background as soon as a page
  // opens, and a page is fully pre-built when its link is hovered or pressed, so the tap
  // lands on a ready page (Chrome, Edge, Android). Other browsers get a plain prefetch on
  // hover / touch.
  if (HTMLScriptElement.supports && HTMLScriptElement.supports("speculationrules")) {
    const rules = document.createElement("script");
    rules.type = "speculationrules";
    rules.textContent = JSON.stringify({
      prefetch: [{ where: { selector_matches: "nav a" }, eagerness: "eager" }],
      prerender: [{ where: { href_matches: "/*" }, eagerness: "moderate" }],
    });
    document.head.append(rules);
  } else {
    const done = new Set([location.pathname]);
    const warm = (e) => {
      const a = e.target.closest && e.target.closest("a[href^='/']");
      if (!a || a.origin !== location.origin || done.has(a.pathname)) return;
      done.add(a.pathname);
      const l = document.createElement("link");
      l.rel = "prefetch"; l.href = a.pathname;
      document.head.append(l);
    };
    addEventListener("pointerover", warm, { passive: true });
    addEventListener("touchstart", warm, { passive: true });
  }

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
