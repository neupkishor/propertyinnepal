"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationItem } from "@/lib/site";

type HeaderNavProps = {
  items: NavigationItem[];
};

export function HeaderNav({ items }: HeaderNavProps) {
  const pathname = usePathname();
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  const isItemActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const activeHref = items.find((item) => isItemActive(item.href))?.href ?? "/";

  const targetHref = hoveredHref ?? activeHref;
  const highlightIsActive = !hoveredHref;

  const moveHighlightTo = (href: string) => {
    const nav = navRef.current;
    if (!nav) return;
    const el = nav.querySelector<HTMLElement>(`[data-nav-item="${href}"]`);
    if (!el) return;

    nav.style.setProperty("--nav-pill-left", `${el.offsetLeft}px`);
    nav.style.setProperty("--nav-pill-width", `${el.offsetWidth}px`);
  };

  useEffect(() => {
    moveHighlightTo(targetHref);
    const onResize = () => moveHighlightTo(targetHref);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [targetHref]);

  return (
    <nav
      ref={navRef}
      className="relative hidden items-center gap-2 rounded-xl p-1 md:flex"
      onMouseLeave={() => {
        setHoveredHref(null);
        moveHighlightTo(activeHref);
      }}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-y-1 left-[var(--nav-pill-left,0px)] w-[var(--nav-pill-width,0px)] rounded-lg transition-all duration-300 ${
          highlightIsActive ? "bg-slate-200/80" : "bg-slate-100/90"
        }`}
      />

      {items.map((item) => {
        const isActive = isItemActive(item.href);
        const isHighlighted = item.href === targetHref;

        return (
          <Link
            key={item.href}
            href={item.href}
            data-nav-item={item.href}
            aria-current={isActive ? "page" : undefined}
            onMouseEnter={() => {
              setHoveredHref(item.href);
              moveHighlightTo(item.href);
            }}
            className={`relative z-10 rounded-lg px-4 py-2 text-sm transition-colors duration-200 focus-visible:outline-none ${
              isActive
                ? "font-bold text-slate-950"
                : isHighlighted
                  ? "font-medium text-slate-950"
                  : "font-medium text-slate-600 hover:text-slate-950"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
