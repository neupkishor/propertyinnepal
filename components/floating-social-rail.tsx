"use client";

import { useEffect, useRef } from "react";
import { SocialIcon, socialLinks } from "@/components/social-links";

const ACTIVE_SECTION_CLASS = "social-rail-section-active";

function updateActiveSection(sections: HTMLElement[]) {
  const probeY = window.innerHeight * 0.5;
  let activeSection: HTMLElement | null = null;

  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= probeY && rect.bottom >= probeY) {
      activeSection = section;
      break;
    }
  }

  for (const section of sections) {
    section.classList.toggle(ACTIVE_SECTION_CLASS, section === activeSection);
  }
}

export function FloatingSocialRail() {
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px) and (max-width: 1439px)");
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-social-rail-section]"),
    );

    if (sections.length === 0) return;

    const clearState = () => {
      for (const section of sections) {
        section.classList.remove(ACTIVE_SECTION_CLASS);
      }
    };

    const syncSections = () => {
      if (!mediaQuery.matches) {
        clearState();
        return;
      }

      updateActiveSection(sections);
    };

    const requestSync = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        syncSections();
      });
    };

    syncSections();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    mediaQuery.addEventListener("change", requestSync);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      mediaQuery.removeEventListener("change", requestSync);
      clearState();
    };
  }, []);

  return (
    <aside
      aria-label="Social media links"
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 rounded-[1.75rem] border border-white/55 bg-white/16 p-1.5 shadow-[0_20px_48px_rgba(15,23,42,0.16)] ring-1 ring-white/30 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/14 lg:block"
    >
      <div className="pointer-events-none absolute inset-x-2 top-1 h-8 rounded-full bg-linear-to-b from-white/55 to-transparent blur-md" />
      <div className="relative flex flex-col gap-2">
        {socialLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="inline-flex size-11 items-center justify-center rounded-2xl border border-white/25 bg-white/14 text-slate-700/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.42)] transition duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/28 hover:text-brand-deep hover:shadow-[0_12px_24px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,0.56)] focus-visible:-translate-y-0.5 focus-visible:border-white/55 focus-visible:bg-white/30 focus-visible:text-brand-deep focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/30"
          >
            <SocialIcon icon={item.icon} className="size-5" />
          </a>
        ))}
      </div>
    </aside>
  );
}
