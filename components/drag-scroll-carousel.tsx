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
  const interactionPauseMs = 10000;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const isHoveringRef = useRef(false);
  const isTouchingRef = useRef(false);
  const pauseUntilRef = useRef(0);
  const didDragRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  function pauseAutoScroll() {
    pauseUntilRef.current = Date.now() + interactionPauseMs;
  }

  useEffect(() => {
    if (!autoScrollIntervalMs) return;

    const intervalId = window.setInterval(() => {
      const scroller = scrollerRef.current;
      if (
        !scroller ||
        isDraggingRef.current ||
        isHoveringRef.current ||
        isTouchingRef.current ||
        Date.now() < pauseUntilRef.current
      ) {
        return;
      }

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

  function handleMouseEnter() {
    isHoveringRef.current = true;
    pauseAutoScroll();
  }

  function handleMouseLeave() {
    isHoveringRef.current = false;
    stopDragging();
    pauseAutoScroll();
  }

  function handleMouseDown(event: MouseEvent<HTMLDivElement>) {
    if (event.button !== 0 || !scrollerRef.current) return;

    pauseAutoScroll();
    isDraggingRef.current = true;
    didDragRef.current = false;
    startXRef.current = event.clientX;
    scrollLeftRef.current = scrollerRef.current.scrollLeft;
    setIsDragging(true);
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current;
    if (!isDraggingRef.current || !scroller) return;

    pauseAutoScroll();
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
    pauseAutoScroll();

    if (!didDragRef.current) return;

    event.preventDefault();
    event.stopPropagation();
    didDragRef.current = false;
  }

  function handleTouchStart() {
    isTouchingRef.current = true;
    pauseAutoScroll();
  }

  function handleTouchMove() {
    pauseAutoScroll();
  }

  function handleTouchEnd() {
    isTouchingRef.current = false;
    pauseAutoScroll();
  }

  return (
    <div
      ref={scrollerRef}
      className={`${className} ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
      onClickCapture={handleClickCapture}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onTouchCancel={handleTouchEnd}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
    >
      {children}
    </div>
  );
}
