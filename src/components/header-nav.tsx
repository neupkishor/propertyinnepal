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
  const [openMenuHref, setOpenMenuHref] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedHref, setMobileExpandedHref] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  const isLinkActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const isItemActive = (item: NavigationItem): boolean =>
    isLinkActive(item.href) || item.children?.some(isItemActive) === true;

  const activeHref = items.find((item) => isItemActive(item))?.href ?? items[0]?.href ?? "/";

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

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <button
        type="button"
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen((current) => !current)}
        className="inline-flex size-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-slate-50 md:hidden"
      >
        <svg aria-hidden viewBox="0 0 24 24" fill="none" className="size-6">
          {mobileMenuOpen ? (
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
            />
          ) : (
            <>
              <path d="M4 7H20" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
              <path d="M4 12H20" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
              <path d="M4 17H20" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      <nav
        ref={navRef}
        className="relative hidden items-center gap-2 rounded-xl p-1 md:flex"
        onMouseLeave={() => {
          setHoveredHref(null);
          setOpenMenuHref(null);
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
          const isActive = isItemActive(item);
          const isHighlighted = item.href === targetHref;
          const hasChildren = (item.children?.length ?? 0) > 0;
          const isMenuOpen = openMenuHref === item.href;
          const panelColumns = (item.children?.length ?? 0) > 4 ? "sm:grid-cols-2" : "sm:grid-cols-1";

          return (
            <div
              key={item.href}
              onMouseEnter={() => {
                setHoveredHref(item.href);
                moveHighlightTo(item.href);
                setOpenMenuHref(hasChildren ? item.href : null);
              }}
              onFocusCapture={() => {
                setHoveredHref(item.href);
                moveHighlightTo(item.href);
                setOpenMenuHref(hasChildren ? item.href : null);
              }}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setOpenMenuHref((current) => (current === item.href ? null : current));
                  setHoveredHref(null);
                  moveHighlightTo(activeHref);
                }
              }}
              className="relative"
            >
              {hasChildren ? (
                <>
                  <button
                    type="button"
                    data-nav-item={item.href}
                    aria-current={isActive ? "page" : undefined}
                    aria-expanded={isMenuOpen}
                    className={`relative z-10 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors duration-200 focus-visible:outline-none ${
                      isActive
                        ? "font-bold text-slate-950"
                        : isHighlighted
                          ? "font-medium text-slate-950"
                          : "font-medium text-slate-600 hover:text-slate-950"
                    }`}
                  >
                    {item.label}
                    <svg
                      aria-hidden
                      viewBox="0 0 20 20"
                      fill="none"
                      className={`size-4 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <div
                    className={`absolute left-0 top-full z-30 pt-4 transition duration-200 ${
                      isMenuOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="min-w-[19rem] rounded-3xl border border-white/70 bg-white/95 p-3 shadow-[0_22px_70px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/60 backdrop-blur-xl">
                      <div className={`grid gap-2 ${panelColumns}`}>
                        {item.children?.map((child) => {
                          const isChildActive = isLinkActive(child.href);

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`group rounded-2xl px-4 py-3 transition duration-200 ${
                                isChildActive
                                  ? "bg-[linear-gradient(135deg,rgba(0,180,234,0.14),rgba(31,59,123,0.14))] text-slate-950"
                                  : "text-slate-700 hover:bg-slate-100/90 hover:text-slate-950"
                              }`}
                            >
                              <span className="block text-sm font-semibold">{child.label}</span>
                              <span className="mt-1 block text-xs text-slate-500 transition group-hover:text-slate-600">
                                Explore {child.label.toLowerCase()} options
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  data-nav-item={item.href}
                  aria-current={isActive ? "page" : undefined}
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
              )}
            </div>
          );
        })}
      </nav>

      <div
        className={`fixed inset-0 top-[88px] z-40 bg-slate-950/20 backdrop-blur-sm transition md:hidden ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <nav
        className={`fixed inset-x-4 top-[96px] z-50 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-[2rem] border border-white/70 bg-white/95 p-4 shadow-[0_28px_80px_rgba(15,23,42,0.24)] ring-1 ring-slate-200/60 backdrop-blur-xl transition duration-300 md:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="grid gap-3">
          {items.map((item) => {
            const isActive = isItemActive(item);
            const hasChildren = (item.children?.length ?? 0) > 0;
            const isExpanded = mobileExpandedHref === item.href;

            if (!hasChildren) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[linear-gradient(135deg,rgba(0,180,234,0.16),rgba(31,59,123,0.16))] text-slate-950"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.href} className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80 p-2">
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() =>
                    setMobileExpandedHref((current) => (current === item.href ? null : item.href))
                  }
                  className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm transition ${
                    isActive ? "text-slate-950" : "text-slate-700"
                  }`}
                >
                  <span className="font-semibold">{item.label}</span>
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`size-5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div className={`grid overflow-hidden transition-all duration-300 ${isExpanded ? "grid-rows-[1fr] pt-2" : "grid-rows-[0fr]"}`}>
                  <div className="min-h-0">
                    <div className="grid gap-2">
                      {item.children?.map((child) => {
                        const isChildActive = isLinkActive(child.href);

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`rounded-2xl px-4 py-3 text-sm transition ${
                              isChildActive
                                ? "bg-white text-slate-950 shadow-sm"
                                : "bg-white/70 text-slate-700 hover:bg-white hover:text-slate-950"
                            }`}
                          >
                            <span className="block font-semibold">{child.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20"
          >
            Talk to an advisor
          </Link>
        </div>
      </nav>
    </>
  );
}
