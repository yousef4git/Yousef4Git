"use client";
import { useEffect } from "react";

// Old links still point at the four Noon cases, #noon, #method and #yax. Two
// cases now sit inside folded <details>, and each Selected work card keeps its
// own fold. This opens every fold between the target and the page, then
// scrolls again, so a shared link lands on content rather than on a closed
// control.
export default function HashOpener() {
  useEffect(() => {
    const reveal = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      let opened = false;
      let fold = target.closest("details");
      while (fold) {
        if (!fold.open) {
          fold.open = true;
          opened = true;
        }
        fold = fold.parentElement?.closest("details") ?? null;
      }
      const own = target.querySelector<HTMLDetailsElement>("details[data-hash-open]");
      if (own && !own.open) {
        own.open = true;
        opened = true;
      }
      if (opened) requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, []);
  return null;
}
