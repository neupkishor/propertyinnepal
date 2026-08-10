"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

type PropertyFloatingAgentSidebarProps = {
  children: ReactNode;
};

const HEADER_GAP = 112;
const FOOTER_GAP = 24;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function PropertyFloatingAgentSidebar({
  children,
}: PropertyFloatingAgentSidebarProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);

  const updatePosition = useCallback(() => {
    frameRef.current = null;

    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    if (window.innerWidth < 1024) {
      card.style.transform = "";
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const containerTop = containerRect.top + window.scrollY;
    const containerHeight = container.offsetHeight;
    const cardHeight = card.offsetHeight;
    const maxOffset = Math.max(0, containerHeight - cardHeight);
    const viewportRoom = window.innerHeight - HEADER_GAP - FOOTER_GAP;
    const nextOffset =
      cardHeight <= viewportRoom
        ? window.scrollY + HEADER_GAP - containerTop
        : window.scrollY + window.innerHeight - FOOTER_GAP - cardHeight - containerTop;

    card.style.transform = `translate3d(0, ${clamp(nextOffset, 0, maxOffset)}px, 0)`;
  }, []);

  const schedulePositionUpdate = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(updatePosition);
  }, [updatePosition]);

  useEffect(() => {
    schedulePositionUpdate();

    window.addEventListener("scroll", schedulePositionUpdate, { passive: true });
    window.addEventListener("resize", schedulePositionUpdate);

    const observer = new ResizeObserver(schedulePositionUpdate);
    if (containerRef.current) observer.observe(containerRef.current);
    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      window.removeEventListener("scroll", schedulePositionUpdate);
      window.removeEventListener("resize", schedulePositionUpdate);
      observer.disconnect();

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [schedulePositionUpdate]);

  return (
    <aside
      ref={containerRef}
      className="pointer-events-none hidden lg:absolute lg:inset-y-0 lg:left-1/2 lg:z-30 lg:block lg:w-full lg:max-w-[1440px] lg:-translate-x-1/2 lg:px-8"
    >
      <div
        ref={cardRef}
        className="pointer-events-auto absolute right-8 top-0 w-[360px] will-change-transform"
      >
        {children}
      </div>
    </aside>
  );
}
