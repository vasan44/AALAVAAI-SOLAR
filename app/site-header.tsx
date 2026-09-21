"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import Image from "next/image";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const btnRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/career", label: "Careers" },
    { href: "/contact", label: "Contact" },
  ];
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
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
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onOutside = (e: MouseEvent) => {
      const nav = document.getElementById("mobile-nav");
      if (
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

  const mobileNav = (
    <nav
      id="mobile-nav"
      className="mobile-nav"
      aria-label="Mobile navigation"
      style={{ display: open ? "flex" : "none" }}
    >
      {navLinks.map(({ href, label }) => (
        <a key={href} href={href} className={isActive(href) ? "nav-active" : ""} onClick={() => setOpen(false)}>{label}</a>
      ))}
      <a href="/contact" className="mobile-nav-cta" onClick={() => setOpen(false)}>
        Get in Touch
      </a>
    </nav>
  );

  return (
    <>
      <header className={`site-header${scrolled ? " scrolled" : ""}${pathname !== "/" ? " solid" : ""}`} ref={headerRef}>
        <a className="brand" href="/" aria-label="AALAVAAI SOLAR home">
          <span className="brand-mark">
            <Image src="/logo.png" alt="AALAVAAI SOLAR" width={96} height={69} style={{ width: "100%", height: "100%", objectFit: "contain" }} priority />
          </span>
          <span>
            AALAVAAI SOLAR
            <small>LIGHT TODAY | SAVE TOMORROW</small>
          </span>
        </a>
        <nav aria-label="Main navigation">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} className={isActive(href) ? "nav-active" : ""}>{label}</a>
          ))}
        </nav>
        <div className="header-right">
          <a className="call-chip" href="/contact">Get in Touch</a>
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
        </div>
      </header>
      {mounted && createPortal(mobileNav, document.body)}
    </>
  );
}
