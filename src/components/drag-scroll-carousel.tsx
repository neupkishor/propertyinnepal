"use client";

import type { MouseEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type DragScrollCarouselProps = {
  autoScrollIntervalMs?: number;
  children: ReactNode;
  className?: string;
};

export function DragScrollCarousel({
  autoScrollIntervalMs,
  children,
  className = "",
}: DragScrollCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const didDragRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!autoScrollIntervalMs) return;

    const intervalId = window.setInterval(() => {
      const scroller = scrollerRef.current;
      if (!scroller || isDraggingRef.current) return;

      const snapItems = Array.from(scroller.children).filter(
        (child): child is HTMLElement => child instanceof HTMLElement,
      );
      if (snapItems.length < 2) return;

      const currentIndex = snapItems.findIndex(
        (item) => item.offsetLeft >= scroller.scrollLeft - 2,
      );
      const nextIndex =
        currentIndex === -1 || currentIndex >= snapItems.length - 1
          ? 0
          : currentIndex + 1;
      const scrollPaddingLeft =
        Number.parseFloat(window.getComputedStyle(scroller).scrollPaddingLeft) || 0;

      scroller.scrollTo({
        left: snapItems[nextIndex].offsetLeft - scrollPaddingLeft,
        behavior: "smooth",
      });
    }, autoScrollIntervalMs);

    return () => window.clearInterval(intervalId);
  }, [autoScrollIntervalMs]);

  function handleMouseDown(event: MouseEvent<HTMLDivElement>) {
    if (event.button !== 0 || !scrollerRef.current) return;

    isDraggingRef.current = true;
    didDragRef.current = false;
    startXRef.current = event.clientX;
    scrollLeftRef.current = scrollerRef.current.scrollLeft;
    setIsDragging(true);
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current;
    if (!isDraggingRef.current || !scroller) return;

    const deltaX = event.clientX - startXRef.current;
    if (Math.abs(deltaX) > 4) {
      didDragRef.current = true;
      event.preventDefault();
    }

    scroller.scrollLeft = scrollLeftRef.current - deltaX;
  }

  function stopDragging() {
    isDraggingRef.current = false;
    setIsDragging(false);
  }

  function handleClickCapture(event: MouseEvent<HTMLDivElement>) {
    if (!didDragRef.current) return;

    event.preventDefault();
    event.stopPropagation();
    didDragRef.current = false;
  }

  return (
    <div
      ref={scrollerRef}
      className={`${className} ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
      onClickCapture={handleClickCapture}
      onMouseDown={handleMouseDown}
      onMouseLeave={stopDragging}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
    >
      {children}
    </div>
  );
}
