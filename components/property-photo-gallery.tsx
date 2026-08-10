"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { DragScrollCarousel } from "@/components/drag-scroll-carousel";

type PropertyPhotoGalleryProps = {
  images: string[];
  title: string;
};

function getGalleryTileClass(index: number, total: number) {
  if (total === 1) return "sm:col-span-6 sm:row-span-2";
  if (total === 2) return "sm:col-span-3 sm:row-span-2";
  if (index < 2) return "sm:col-span-3";
  return "sm:col-span-2";
}

export function PropertyPhotoGallery({ images, title }: PropertyPhotoGalleryProps) {
  const galleryImages = useMemo(() => images.filter(Boolean), [images]);
  const displayImages = galleryImages.slice(0, 6);
  const galleryTiles = displayImages.slice(1);
  const remainingImageCount = Math.max(0, galleryImages.length - displayImages.length);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
        return;
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => {
          if (current === null) return current;
          return current === 0 ? galleryImages.length - 1 : current - 1;
        });
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => {
          if (current === null) return current;
          return current === galleryImages.length - 1 ? 0 : current + 1;
        });
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, galleryImages.length]);

  if (!displayImages.length) return null;

  const activePhoto =
    activeIndex !== null && galleryImages[activeIndex]
      ? { image: galleryImages[activeIndex], index: activeIndex }
      : null;

  return (
    <>
      <DragScrollCarousel className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth scroll-pl-6 px-6 pb-3 sm:hidden">
        {galleryImages.map((image, index) => (
          <button
            key={`${image}-mobile-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="relative aspect-[4/5] w-[82vw] max-w-[390px] shrink-0 snap-center cursor-pointer overflow-hidden rounded-[1.4rem] bg-slate-100 text-left"
            aria-label={`View ${title} photo ${index + 1}`}
          >
            <img
              src={image}
              alt={`${title} image ${index + 1}`}
              width={900}
              height={1125}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
            <span className="absolute right-3 top-3 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold text-white">
              {index + 1} / {galleryImages.length}
            </span>
          </button>
        ))}
      </DragScrollCarousel>

      <div
        className={`hidden gap-2 overflow-hidden rounded-[1.75rem] bg-white sm:grid sm:gap-3 ${
          galleryTiles.length > 0 ? "lg:grid-cols-[1.05fr_1fr]" : ""
        } lg:h-[420px]`}
      >
        <button
          type="button"
          onClick={() => setActiveIndex(0)}
          className="relative h-[260px] cursor-pointer overflow-hidden bg-slate-100 text-left lg:h-full"
          aria-label={`View ${title} photo 1`}
        >
          <img
            src={displayImages[0]}
            alt={`${title} exterior view`}
            width={1400}
            height={920}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-center transition duration-300 hover:scale-[1.02]"
          />
        </button>

        {galleryTiles.length > 0 ? (
          <div className="grid gap-2 sm:grid-cols-6 sm:grid-rows-2 sm:gap-3 lg:h-full lg:min-h-0">
            {galleryTiles.map((image, index) => {
              const imageIndex = index + 1;
              const isLastTile = index === galleryTiles.length - 1;

              return (
                <button
                  key={`${image}-${imageIndex}`}
                  type="button"
                  onClick={() => setActiveIndex(imageIndex)}
                  className={`relative h-[140px] cursor-pointer overflow-hidden bg-slate-100 text-left sm:h-full sm:min-h-0 ${getGalleryTileClass(index, galleryTiles.length)}`}
                  aria-label={`View ${title} photo ${imageIndex + 1}`}
                >
                  <img
                    src={image}
                    alt={`${title} image ${imageIndex + 1}`}
                    width={720}
                    height={460}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center transition duration-300 hover:scale-[1.03]"
                  />

                  {isLastTile ? (
                    <span className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/35 p-4 text-white">
                      {remainingImageCount > 0 ? (
                        <span className="text-3xl font-semibold leading-none">
                          +{remainingImageCount}
                        </span>
                      ) : null}
                      <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-sky-600 shadow-lg shadow-slate-950/20 transition hover:bg-slate-50">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <rect x="3" y="3" width="7" height="7" rx="1.5" />
                          <rect x="14" y="3" width="7" height="7" rx="1.5" />
                          <rect x="3" y="14" width="7" height="7" rx="1.5" />
                          <rect x="14" y="14" width="7" height="7" rx="1.5" />
                        </svg>
                        Show all photos
                      </span>
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      {activePhoto
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex flex-col bg-slate-950/95 text-white"
              role="dialog"
              aria-modal="true"
              aria-label={`${title} photos`}
            >
              <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
                <p className="text-sm font-semibold">
                  {activePhoto.index + 1} / {galleryImages.length}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="inline-flex h-10 min-w-20 items-center justify-center rounded-full bg-white/10 px-4 text-sm font-semibold transition hover:bg-white/20"
                >
                  Close
                </button>
              </div>

              <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-16 sm:pb-8">
                {galleryImages.length > 1 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex(
                        activePhoto.index === 0
                          ? galleryImages.length - 1
                          : activePhoto.index - 1,
                      )
                    }
                    className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl font-semibold transition hover:bg-white/20 sm:left-6"
                    aria-label="View previous photo"
                  >
                    &lt;
                  </button>
                ) : null}

                <img
                  src={activePhoto.image}
                  alt={`${title} selected photo ${activePhoto.index + 1}`}
                  className="max-h-full max-w-full object-contain"
                />

                {galleryImages.length > 1 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex(
                        activePhoto.index === galleryImages.length - 1
                          ? 0
                          : activePhoto.index + 1,
                      )
                    }
                    className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl font-semibold transition hover:bg-white/20 sm:right-6"
                    aria-label="View next photo"
                  >
                    &gt;
                  </button>
                ) : null}
              </div>

              {galleryImages.length > 1 ? (
                <div className="flex gap-2 overflow-x-auto border-t border-white/10 px-4 py-3 sm:px-6">
                  {galleryImages.map((image, index) => (
                    <button
                      key={`${image}-thumbnail-${index}`}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`h-16 w-24 shrink-0 cursor-pointer overflow-hidden rounded-md border transition ${
                        activeIndex === index ? "border-white" : "border-white/20 opacity-70"
                      }`}
                      aria-label={`View ${title} photo ${index + 1}`}
                    >
                      <img
                        src={image}
                        alt=""
                        width={160}
                        height={110}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-center"
                      />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
