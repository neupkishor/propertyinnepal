import type { Metadata } from "next";
import Link from "next/link";
import { fetchProperties } from "@/lib/property-api";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse live properties from Property in Nepal with current listings and details.",
};

type PropertiesPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

function formatListingPrice(propertyPrice: string, onCalling: string) {
  if (onCalling === "1") return "On Call";
  return `NRS ${propertyPrice}`;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const currentPage = Math.max(1, Number(resolvedSearchParams.page ?? "1") || 1);
  const payload = await fetchProperties(currentPage);
  const properties = payload.data ?? [];
  const meta = payload.meta;
  const hasPrev = (meta?.current_page ?? currentPage) > 1;
  const hasNext = (meta?.current_page ?? currentPage) < (meta?.last_page ?? currentPage);

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-6 pb-10 pt-12 lg:px-8 lg:pt-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-deep/70">
            Properties
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            Live property listings from Property in Nepal
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Browse current inventory and open any listing to view complete property
            details, features, and media.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-12 lg:px-8 lg:pb-16">
        {properties.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
            No properties found right now.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <article
                key={property.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <Link
                  href={`/properties/${property.slug}`}
                  className="block overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                >
                  <img
                    src={property.images?.[0] ?? "/logo.png"}
                    alt={property.name}
                    width={960}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    className="h-52 w-full object-cover object-center transition duration-300 hover:scale-[1.02]"
                  />
                </Link>

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {property.for} • {property.type}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-950">
                      <Link href={`/properties/${property.slug}`}>{property.name}</Link>
                    </h2>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    ID: {property.code}
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-600">
                  {property.location}, {property.city}
                </p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">
                  {formatListingPrice(property.price, property.on_calling)}
                </p>
                <p className="mt-2 text-sm text-slate-600">Area: {property.area}</p>

                <div className="mt-4">
                  <Link
                    href={`/properties/${property.slug}`}
                    className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-200"
                  >
                    View details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {meta ? (
          <div className="mt-8 flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-sm text-slate-600">
              Page {meta.current_page} of {meta.last_page} • {meta.total} listings
            </p>
            <div className="flex gap-2">
              <Link
                href={hasPrev ? `/properties?page=${meta.current_page - 1}` : "#"}
                aria-disabled={!hasPrev}
                className={`rounded-md px-3 py-1.5 text-sm font-semibold transition ${
                  hasPrev
                    ? "bg-slate-100 text-slate-800 hover:bg-slate-200"
                    : "cursor-not-allowed bg-slate-100 text-slate-400"
                }`}
              >
                Previous
              </Link>
              <Link
                href={hasNext ? `/properties?page=${meta.current_page + 1}` : "#"}
                aria-disabled={!hasNext}
                className={`rounded-md px-3 py-1.5 text-sm font-semibold transition ${
                  hasNext
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "cursor-not-allowed bg-slate-100 text-slate-400"
                }`}
              >
                Next
              </Link>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
