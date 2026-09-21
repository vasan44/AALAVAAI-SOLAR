"use client";

import { useEffect, useRef, useState } from "react";

export function MenuToggle() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Keep --header-h in sync with actual header height
  useEffect(() => {
    const header = document.querySelector(".site-header") as HTMLElement | null;
    if (!header) return;
    const update = () =>
      document.documentElement.style.setProperty(
        "--header-h",
        `${header.getBoundingClientRect().height}px`
      );
    update();
    const ro = new ResizeObserver(update);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const nav = document.getElementById("mobile-nav");
    if (!nav) return;
    nav.hidden = !open;

    const links = nav.querySelectorAll("a");
    const closeOnClick = () => setOpen(false);
    links.forEach((l) => l.addEventListener("click", closeOnClick));
    return () => links.forEach((l) => l.removeEventListener("click", closeOnClick));
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onOutside = (e: MouseEvent) => {
      const nav = document.getElementById("mobile-nav");
      if (
        open &&
        nav &&
        !nav.contains(e.target as Node) &&
        !btnRef.current?.contains(e.target as Node)
      ) setOpen(false);
    };
    const onResize = () => { if (window.innerWidth >= 720) setOpen(false); };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onOutside);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onOutside);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <button
      ref={btnRef}
      className="menu-toggle"
      aria-label={open ? "Close navigation" : "Open navigation"}
      aria-expanded={open}
      aria-controls="mobile-nav"
      onClick={() => setOpen((v) => !v)}
    >
      {open ? "\u2715" : "\u2630"}
    </button>
  );
}
