'use client';

import { useEffect, useRef, useState } from "react";

type PropertyAmenity = {
  name: string;
  value: string;
};

type PropertyAmenitiesGridProps = {
  amenities: PropertyAmenity[];
  surface?: "default" | "tinted";
};

const AMENITY_CARD_MIN_WIDTH = 120;
const AMENITY_GRID_GAP = 12;

export function PropertyAmenitiesGrid({
  amenities,
  surface = "default",
}: PropertyAmenitiesGridProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [collapsedRowCount, setCollapsedRowCount] = useState(1);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const updateCollapsedRowCount = () => {
      const width = grid.clientWidth;
      if (!width) return;

      const nextCount = Math.max(
        1,
        Math.floor((width + AMENITY_GRID_GAP) / (AMENITY_CARD_MIN_WIDTH + AMENITY_GRID_GAP)),
      );

      setCollapsedRowCount(nextCount);
    };

    updateCollapsedRowCount();

    const observer = new ResizeObserver(() => {
      updateCollapsedRowCount();
    });

    observer.observe(grid);

    return () => {
      observer.disconnect();
    };
  }, []);

  const showToggle = amenities.length > collapsedRowCount;
  const visibleAmenities = isExpanded ? amenities : amenities.slice(0, collapsedRowCount);
  const cardClassName =
    surface === "tinted"
      ? "cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-4 text-center transition-colors duration-200 hover:border-brand-deep/35 hover:bg-sky-50/75"
      : "cursor-pointer rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 text-center transition-colors duration-200 hover:border-brand-deep/30 hover:bg-slate-100/90";
  const buttonClassName =
    surface === "tinted"
      ? "inline-flex cursor-pointer items-center justify-center rounded-full border border-brand-deep/15 bg-white/85 px-4 py-2 text-sm font-semibold text-brand-deep shadow-[0_8px_24px_rgba(31,59,123,0.08)] transition-colors duration-200 hover:bg-white"
      : "inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-brand-deep transition-colors duration-200 hover:bg-slate-100";

  return (
    <>
      <div
        ref={gridRef}
        className="mt-5 grid gap-3"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}
      >
        {visibleAmenities.map((facility) => (
          <div
            key={`${facility.name}-${facility.value}`}
            className={cardClassName}
          >
            <div className="flex min-h-[72px] flex-col items-center justify-center sm:min-h-[80px]">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(180deg,rgba(0,180,234,0.14),rgba(31,59,123,0.08))] text-brand-deep sm:size-9">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-3.5 fill-none stroke-current stroke-[2] sm:size-4"
                >
                  <path
                    d="M5 12.5 9.2 16.7 19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-2 line-clamp-2 text-center text-xs font-semibold leading-[1.15] text-slate-950 sm:text-[13px] sm:leading-[1.2]">
                {facility.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {!isExpanded && showToggle ? (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            aria-expanded={isExpanded}
            className={buttonClassName}
          >
            See more
          </button>
        </div>
      ) : null}
    </>
  );
}
