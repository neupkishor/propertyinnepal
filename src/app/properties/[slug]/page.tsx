import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  if (onCalling === "1") return "On Call";
  return `NRS ${price}`;
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
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-12 lg:px-8 lg:pt-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-deep/70">
            Property Details
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            {property.name}
          </h1>
          <p className="mt-4 text-base text-slate-600">
            {property.location}, {property.city}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              ID: {property.code}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {property.for} • {property.type}
            </span>
          </div>
          <p className="mt-5 text-3xl font-semibold text-slate-950">
            {renderPrice(property.price, property.on_calling)}
          </p>
          <p className="mt-1 text-sm text-slate-600">Area: {property.area}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 lg:px-8">
        <div className="grid gap-3 md:grid-cols-2">
          {property.images?.map((image, index) => (
            <div
              key={`${property.id}-image-${index}`}
              className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
            >
              <Image
                src={image}
                alt={`${property.name} image ${index + 1}`}
                width={1200}
                height={800}
                className="h-64 w-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 lg:px-8 lg:pb-16">
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

      <section className="mx-auto max-w-7xl px-6 pb-12 lg:px-8 lg:pb-20">
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

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8 lg:pb-24">
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
