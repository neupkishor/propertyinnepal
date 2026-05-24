import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { featuredProperties } from "@/lib/site";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse curated homes, plots, and commercial spaces across Nepal.",
};

const filters = ["All", "Apartments", "Villas", "Plots", "Commercial"];

export default function PropertiesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-12 lg:px-8 lg:pt-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-deep/70">
            Properties
          </p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-slate-950 sm:text-6xl">
            Curated properties that are easier to evaluate and easier to move on.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            From premium apartments to investment land, this collection is built
            for buyers who want quality information and a cleaner shortlist.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <div className="flex flex-wrap gap-3 rounded-[2rem] border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur">
          {filters.map((filter, index) => (
            <span
              key={filter}
              className={
                index === 0
                  ? "rounded-full bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] px-4 py-2 text-sm font-semibold text-white"
                  : "rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600"
              }
            >
              {filter}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <SectionHeading
          eyebrow="Current inventory"
          title="A balanced mix of homes, land, and commercial opportunities."
          description="Every listing is framed to help high-intent clients compare, qualify, and take the next step quickly."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProperties.map((property) => (
            <article
              key={property.name}
              className="rounded-[1.75rem] border border-white/80 bg-white/85 p-6 shadow-sm backdrop-blur"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-brand-deep/75">
                    {property.type}
                  </p>
                  <h2 className="mt-2 font-display text-2xl text-slate-950">
                    {property.name}
                  </h2>
                </div>
                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-brand-deep">
                  {property.highlight}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {property.location}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-600">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Price
                  </p>
                  <p className="mt-2 font-semibold text-slate-950">
                    {property.price}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Area
                  </p>
                  <p className="mt-2 font-semibold text-slate-950">
                    {property.area}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  {property.beds}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  {property.baths}
                </span>
              </div>

              <Link
                href="/contact"
                className="mt-6 inline-flex text-sm font-semibold text-brand-deep transition hover:text-brand"
              >
                Schedule a viewing
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}