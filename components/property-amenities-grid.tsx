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

type AmenityIconName =
  | "parking"
  | "bike"
  | "water"
  | "electricity"
  | "road"
  | "security"
  | "wifi"
  | "garden"
  | "balcony"
  | "lift"
  | "furnished"
  | "gym"
  | "pool"
  | "airConditioning"
  | "drainage"
  | "default";

function getAmenityIconName(name: string): AmenityIconName {
  const normalizedName = name.toLowerCase().replace(/[^a-z]/g, "");

  if (normalizedName.includes("bike") || normalizedName.includes("motorbike")) return "bike";
  if (normalizedName.includes("parking") || normalizedName.includes("garage")) return "parking";
  if (normalizedName.includes("water") || normalizedName.includes("tap")) return "water";
  if (normalizedName.includes("electric") || normalizedName.includes("power")) return "electricity";
  if (normalizedName.includes("road") || normalizedName.includes("access")) return "road";
  if (normalizedName.includes("security") || normalizedName.includes("guard") || normalizedName.includes("cctv")) return "security";
  if (normalizedName.includes("wifi") || normalizedName.includes("internet")) return "wifi";
  if (normalizedName.includes("garden") || normalizedName.includes("lawn")) return "garden";
  if (normalizedName.includes("balcony") || normalizedName.includes("terrace")) return "balcony";
  if (normalizedName.includes("lift") || normalizedName.includes("elevator")) return "lift";
  if (normalizedName.includes("furnished") || normalizedName.includes("furniture")) return "furnished";
  if (normalizedName.includes("gym") || normalizedName.includes("fitness")) return "gym";
  if (normalizedName.includes("pool") || normalizedName.includes("swimming")) return "pool";
  if (normalizedName.includes("aircondition") || normalizedName.includes("ac")) return "airConditioning";
  if (normalizedName.includes("drainage") || normalizedName.includes("sewer")) return "drainage";

  return "default";
}

function AmenityIcon({ name }: { name: string }) {
  const iconName = getAmenityIconName(name);
  const className = "size-3.5 fill-none stroke-current stroke-[2] sm:size-4";

  if (iconName === "parking") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M5 13 7 7h10l2 6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 13h16v5H4z" strokeLinejoin="round" />
        <path d="M7 18v2M17 18v2M7 15h.01M17 15h.01" strokeLinecap="round" />
      </svg>
    );
  }

  if (iconName === "bike") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <circle cx="6" cy="17" r="3" />
        <circle cx="18" cy="17" r="3" />
        <path d="M8.5 17h3.5l3-5H9.5l-1 5ZM15 12l3 5M11 9h3M13 9l-1 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (iconName === "water") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z" strokeLinejoin="round" />
        <path d="M9.5 15.5A3 3 0 0 0 12 18" strokeLinecap="round" />
      </svg>
    );
  }

  if (iconName === "electricity") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M13 2 5 14h6l-1 8 9-13h-6l0-7Z" strokeLinejoin="round" />
      </svg>
    );
  }

  if (iconName === "road") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M7 21 10 3M17 21 14 3" strokeLinecap="round" />
        <path d="M12 6v2M12 11v2M12 16v2" strokeLinecap="round" />
      </svg>
    );
  }

  if (iconName === "security") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M12 3 5 6v5c0 4.4 2.8 8 7 10 4.2-2 7-5.6 7-10V6l-7-3Z" strokeLinejoin="round" />
        <path d="m9.5 12 1.7 1.7 3.5-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (iconName === "wifi") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M4.5 9.5a11 11 0 0 1 15 0M8 13a6 6 0 0 1 8 0M11 16.5a1.5 1.5 0 0 1 2 0" strokeLinecap="round" />
        <path d="M12 20h.01" strokeLinecap="round" />
      </svg>
    );
  }

  if (iconName === "garden") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M12 20V10" strokeLinecap="round" />
        <path d="M12 10c-4 0-6-2.5-6-6 4 0 6 2.5 6 6ZM12 13c4 0 6-2.5 6-6-4 0-6 2.5-6 6Z" strokeLinejoin="round" />
      </svg>
    );
  }

  if (iconName === "balcony") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M6 11V5h12v6M4 11h16v8H4z" strokeLinejoin="round" />
        <path d="M8 19v-8M12 19v-8M16 19v-8" strokeLinecap="round" />
      </svg>
    );
  }

  if (iconName === "lift") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M6 3h12v18H6z" strokeLinejoin="round" />
        <path d="m10 8 2-2 2 2M14 16l-2 2-2-2M6 12h12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (iconName === "furnished") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M7 12V8.5A2.5 2.5 0 0 1 9.5 6h5A2.5 2.5 0 0 1 17 8.5V12" />
        <path d="M5 12h14a2 2 0 0 1 2 2v4H3v-4a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
        <path d="M5 20v-2M19 20v-2" strokeLinecap="round" />
      </svg>
    );
  }

  if (iconName === "gym") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12" strokeLinecap="round" />
      </svg>
    );
  }

  if (iconName === "pool") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M4 16c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5M4 20c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5" strokeLinecap="round" />
        <path d="M8 12V5a2 2 0 0 1 4 0M8 8h4" strokeLinecap="round" />
      </svg>
    );
  }

  if (iconName === "airConditioning") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M4 5h16v7H4z" strokeLinejoin="round" />
        <path d="M8 16v.01M12 16v.01M16 16v.01M9 19v.01M15 19v.01M17 8h.01" strokeLinecap="round" />
      </svg>
    );
  }

  if (iconName === "drainage") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M5 7h14M7 7v10a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 11h6M9 15h6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M5 12.5 9.2 16.7 19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
                <AmenityIcon name={facility.name} />
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
