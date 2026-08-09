import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PropertyPhotoGallery } from "@/components/property-photo-gallery";
import { PropertyShareButton } from "@/components/property-share-button";
import { fetchPropertyBySlug } from "@/lib/property-api";

type PropertyDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PropertyDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await fetchPropertyBySlug(slug);

  if (!property) {
    return {
      title: "Property Not Found",
    };
  }

  return {
    title: property.name,
    description: `${property.location}, ${property.city} • ${property.price}`,
  };
}

function renderPrice(price: string, onCalling: string) {
  if (onCalling === "1") return "मूल्य सम्पर्कमा";

  const formattedPrice = price
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());

  return `NRs. ${formattedPrice}`;
}

function toTitleCase(value: string) {
  return value.toLowerCase().replace(/\b\w/g, (character) => character.toUpperCase());
}

function renderTeam(team: { id?: string; name?: string; position?: string } | string | null) {
  if (!team) return "N/A";
  if (typeof team === "string") return team;
  if (team.name && team.position) return `${team.name} (${team.position})`;
  if (team.name) return team.name;
  return "N/A";
}

export default async function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const { slug } = await params;
  const property = await fetchPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <>
      {property.images?.length > 0 ? (
        <section className="mx-auto max-w-[1440px] px-6 pb-10 pt-3 lg:px-8 lg:pt-4">
          <PropertyPhotoGallery images={property.images} title={property.name} />
        </section>
      ) : null}

      <section className="mx-auto max-w-[1440px] px-6 pb-10 lg:px-8">
        <div className="max-w-5xl">
          <p className="text-xs font-medium text-slate-500 sm:text-sm">
            Property ID: {property.code}
            <span className="mx-2 inline-block h-1 w-1 rounded-full bg-slate-300 align-middle" />
            {property.type}
            <span className="mx-2 inline-block h-1 w-1 rounded-full bg-slate-300 align-middle" />
            {toTitleCase(property.for)}
          </p>

          <div className="mt-1">
            <h1 className="max-w-4xl text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">
              <span>{property.name}</span>
              <span className="inline-block w-4" aria-hidden="true" />
              <PropertyShareButton title={property.name} />
            </h1>
          </div>

          <p className="mt-0.5 text-xl font-semibold text-brand-deep sm:text-2xl">
            {renderPrice(property.price, property.on_calling)}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-slate-600">
            <p>
              {property.location}, {property.city}
            </p>
            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
            <p>Area: {property.area}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-12 lg:px-8 lg:pb-16">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">Description</h2>
            <div
              className="mt-4 text-sm leading-7 text-slate-700"
              dangerouslySetInnerHTML={{
                __html: property.description || "No description provided.",
              }}
            />
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">Quick Facts</h2>
            <div className="mt-4 grid gap-2 text-sm text-slate-700">
              <p>
                <span className="font-semibold">Views:</span> {property.views}
              </p>
              <p>
                <span className="font-semibold">Listed:</span>{" "}
                {property.created_at_human || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Team:</span> {renderTeam(property.team)}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-12 lg:px-8 lg:pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">Features</h2>
            <div className="mt-4 grid gap-2">
              {property.features?.length ? (
                property.features.map((feature) => (
                  <p key={`${feature.name}-${feature.value}`} className="text-sm text-slate-700">
                    <span className="font-semibold">{feature.name}:</span> {feature.value}
                  </p>
                ))
              ) : (
                <p className="text-sm text-slate-600">No features listed.</p>
              )}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">Facilities</h2>
            <div className="mt-4 grid gap-2">
              {property.facilities?.length ? (
                property.facilities.map((facility) => (
                  <p key={`${facility.name}-${facility.value}`} className="text-sm text-slate-700">
                    <span className="font-semibold">{facility.name}:</span> {facility.value}
                  </p>
                ))
              ) : (
                <p className="text-sm text-slate-600">No facilities listed.</p>
              )}
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-16 lg:px-8 lg:pb-24">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/properties"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          >
            Back to listings
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5"
          >
            Request viewing
          </Link>
        </div>
      </section>
    </>
  );
}
