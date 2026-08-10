"use client";

import { useMemo, useState } from "react";

import { DragScrollCarousel } from "@/components/drag-scroll-carousel";

type LifeCategory = "Essentials" | "Dining" | "Transport" | "Lifestyle" | "Character";

type LifeAroundItem = {
  category: LifeCategory;
  description: string;
  label: string;
  rating: number;
  icon: "bag" | "cup" | "fork" | "bus" | "car" | "bank" | "heart" | "park" | "sparkle" | "shield";
};

type PropertyLifeAroundAreaProps = {
  areaName: string;
};

const CATEGORY_FILTERS = ["All", "Essentials", "Dining", "Transport", "Lifestyle", "Character"] as const;

const LIFE_AROUND_ITEMS: LifeAroundItem[] = [
  {
    category: "Essentials",
    description: "Daily shopping and household basics nearby",
    icon: "bag",
    label: "Shopping",
    rating: 4,
  },
  {
    category: "Essentials",
    description: "Banks, ATMs, and routine services within the area",
    icon: "bank",
    label: "Daily Services",
    rating: 4,
  },
  {
    category: "Dining",
    description: "Restaurants and local food options around the neighborhood",
    icon: "fork",
    label: "Restaurants",
    rating: 4,
  },
  {
    category: "Dining",
    description: "Cafes and casual meeting spots nearby",
    icon: "cup",
    label: "Cafes",
    rating: 3,
  },
  {
    category: "Transport",
    description: "Public transport access for daily movement",
    icon: "bus",
    label: "Transit Friendly",
    rating: 4,
  },
  {
    category: "Transport",
    description: "Road access suitable for private vehicles",
    icon: "car",
    label: "Car Friendly",
    rating: 4,
  },
  {
    category: "Lifestyle",
    description: "Parks, open spaces, or greenery in the wider area",
    icon: "park",
    label: "Green Access",
    rating: 3,
  },
  {
    category: "Lifestyle",
    description: "Fitness, wellness, and recreation options nearby",
    icon: "heart",
    label: "Wellness",
    rating: 3,
  },
  {
    category: "Character",
    description: "A lived-in residential area with regular local activity",
    icon: "sparkle",
    label: "Vibrant",
    rating: 4,
  },
  {
    category: "Character",
    description: "Residential surroundings suited for everyday living",
    icon: "shield",
    label: "Residential",
    rating: 4,
  },
];

function LifeIcon({ icon }: { icon: LifeAroundItem["icon"] }) {
  const className = "size-5 fill-none stroke-current stroke-[1.8]";

  if (icon === "bag") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
        <path d="M9 8a3 3 0 0 1 6 0" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "cup") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M6 8h10v5a5 5 0 0 1-10 0V8Z" strokeLinejoin="round" />
        <path d="M16 9h1.5a2.5 2.5 0 0 1 0 5H16M5 20h13" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "fork") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M7 4v16M4.5 4v5a2.5 2.5 0 0 0 5 0V4M16 4v16M16 4c2 1 3 2.8 3 5.5S18 14 16 14" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "bus") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M6 5h12a2 2 0 0 1 2 2v9H4V7a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
        <path d="M7 19h.1M17 19h.1M7 9h10M8 16l-1 3M16 16l1 3" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "car") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="m5 13 2-5h10l2 5M5 13h14v5H5v-5Z" strokeLinejoin="round" />
        <path d="M8 17h.1M16 17h.1" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "bank") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M4 10h16L12 5 4 10ZM6 10v7M10 10v7M14 10v7M18 10v7M4 19h16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "heart") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M20 8.5c0 5-8 10.5-8 10.5S4 13.5 4 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 2.5Z" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "park") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M12 20V8M8 12l4-8 4 8H8ZM6 16h12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "shield") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path d="M12 21s7-3.5 7-10V5l-7-2-7 2v6c0 6.5 7 10 7 10Z" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 3 14.2 9.8 21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2L12 3Z" strokeLinejoin="round" />
      <path d="M5 4v3M3.5 5.5h3M19 17v3M17.5 18.5h3" strokeLinecap="round" />
    </svg>
  );
}

function Rating({ value }: { value: number }) {
  return (
    <div className="mt-3 flex items-center justify-center gap-1" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={`h-2.5 w-2.5 rounded-full ${index < value ? "bg-brand-deep" : "bg-slate-300"}`}
        />
      ))}
    </div>
  );
}

export function PropertyLifeAroundArea({ areaName }: PropertyLifeAroundAreaProps) {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORY_FILTERS)[number]>("All");

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return LIFE_AROUND_ITEMS;
    return LIFE_AROUND_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="w-full">
      <div className="mx-auto max-w-[1440px] px-6 py-8 sm:px-8 lg:px-8 lg:py-10 lg:pr-[calc(360px+40px+2rem)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-950 lg:text-2xl">
              Life Around This Area
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Nearby lifestyle signals for {areaName || "this area"}, grouped by daily needs,
              movement, and neighborhood feel.
            </p>
          </div>
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-brand-deep">
            <LifeIcon icon="sparkle" />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {CATEGORY_FILTERS.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`inline-flex cursor-pointer items-center justify-center rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "border-brand-deep bg-brand-deep text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-brand-deep/30 hover:bg-slate-100"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <DragScrollCarousel
          key={activeCategory}
          autoScrollIntervalMs={6500}
          className="no-scrollbar -mx-6 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth scroll-pl-6 px-6 pb-3 sm:-mx-8 sm:scroll-pl-8 sm:px-8"
        >
          {filteredItems.map((item) => (
            <article
              key={`${item.category}-${item.label}`}
              className="w-[68vw] max-w-[230px] shrink-0 snap-start cursor-pointer rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 text-center transition-colors duration-200 hover:border-brand-deep/30 hover:bg-slate-100/90 sm:w-[210px] lg:w-[178px] xl:w-[190px]"
            >
              <div className="flex min-h-[112px] flex-col items-center justify-center sm:min-h-[124px]">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(180deg,rgba(0,180,234,0.14),rgba(31,59,123,0.08))] text-brand-deep sm:size-10">
                  <LifeIcon icon={item.icon} />
                </div>
                <h3 className="mt-3 text-center text-sm font-semibold leading-[1.2] text-slate-950 sm:text-base">
                  {item.label}
                </h3>
                <Rating value={item.rating} />
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-600">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </DragScrollCarousel>

        <p className="mt-5 max-w-3xl text-xs leading-5 text-slate-500">
          These signals are general area insights for the listed property and should not be
          interpreted as ratings of service quality or guaranteed distance.
        </p>
      </div>
    </section>
  );
}
