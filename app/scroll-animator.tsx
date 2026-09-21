"use client";
import { useEffect } from "react";

export function ScrollAnimator() {
  useEffect(() => {
    // Fade-up / fade-in elements
    const els = document.querySelectorAll(".fade-up, .fade-in");
    if (els.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      els.forEach((el) => io.observe(el));
    }

    // Section-level visible class for eyebrow underline + proof counters
    const sections = document.querySelectorAll(".section, .page-hero");
    if (sections.length) {
      const sio = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              sio.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08 }
      );
      sections.forEach((s) => sio.observe(s));
      return () => sio.disconnect();
    }
  }, []);
  return null;
}
