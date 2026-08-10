import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DragScrollCarousel } from "@/components/drag-scroll-carousel";
import { PropertyAgentContactCard } from "@/components/property-agent-contact-card";
import { PropertyAmenitiesGrid } from "@/components/property-amenities-grid";
import { PropertyFloatingAgentSidebar } from "@/components/property-floating-agent-sidebar";
import { PropertyPhotoGallery } from "@/components/property-photo-gallery";
import { PropertyShareButton } from "@/components/property-share-button";
import { fetchPropertyBySlug } from "@/lib/property-api";
import { PROPERTY_AGENT_FALLBACK } from "./property-agent";

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

function getTeamName(team: { id?: string; name?: string; position?: string } | string | null) {
  if (!team) return "Property in Nepal";
  if (typeof team === "string") return team;
  return team.name || "Property in Nepal";
}

function getTeamRole(team: { id?: string; name?: string; position?: string } | string | null) {
  if (!team || typeof team === "string") return "Property Advisor";
  return team.position || "Property Advisor";
}

function getRoomsAndSpacingFeatures(
  features: { name: string; value: string }[],
  area: string,
) {
  const preferredOrder = [
    "Bedrooms",
    "Bathrooms",
    "Living Rooms",
    "Dining Rooms",
    "Kitchens",
    "Floors",
    "Car Parking",
    "Bike Parking",
    "Area",
  ];
  const featureMap = new Map(features.map((feature) => [feature.name, feature.value]));
  const orderedFeatures = preferredOrder
    .map((name) => {
      if (name === "Area") {
        const value = featureMap.get(name) || area;
        return value && value !== "N/A" ? { name, value } : null;
      }

      const value = featureMap.get(name);
      return value ? { name, value } : null;
    })
    .filter((feature): feature is { name: string; value: string } => feature !== null);

  return orderedFeatures;
}

function RoomsAndSpacingCard({ feature }: { feature: { name: string; value: string } }) {
  return (
    <div className="cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-3.5 text-center transition-colors duration-200 hover:border-brand-deep/35 hover:bg-sky-50/75 sm:p-4">
      <div className="flex min-h-[80px] flex-col items-center justify-center sm:min-h-[88px]">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(180deg,rgba(0,180,234,0.14),rgba(31,59,123,0.08))] text-brand-deep sm:size-10">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-4 fill-none stroke-current stroke-[2] sm:size-[18px]"
          >
            <path d="M4 12h16M12 4v16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="mt-2 text-center text-[13px] font-semibold leading-[1.2] text-slate-950 sm:mt-2.5 sm:text-sm sm:leading-[1.25]">
          <span className="text-[15px] text-brand-deep sm:text-base">{feature.value}</span>{" "}
          <span>{feature.name}</span>
        </p>
      </div>
    </div>
  );
}

export default async function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const { slug } = await params;
  const property = await fetchPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const roomsAndSpacingFeatures = getRoomsAndSpacingFeatures(property.features, property.area);
  const agentName = getTeamName(property.team);
  const agentRole = getTeamRole(property.team);

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-6 pb-10 pt-3 lg:px-8 lg:pt-4">
        {property.images?.length > 0 ? (
          <PropertyPhotoGallery images={property.images} title={property.name} />
        ) : null}
      </section>

      <div className="relative pb-16 lg:pb-24">
        <PropertyFloatingAgentSidebar>
          <PropertyAgentContactCard
            agentImageSrc={property.team_image}
            agentName={agentName}
            agentRole={agentRole}
            phone={PROPERTY_AGENT_FALLBACK.phone}
            email={PROPERTY_AGENT_FALLBACK.email}
          />
        </PropertyFloatingAgentSidebar>

        <section className="mx-auto max-w-[1440px] px-6 pb-8 lg:px-8 lg:pr-[calc(360px+40px+2rem)]">
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

        <aside className="mx-auto max-w-[1440px] px-6 pb-8 lg:hidden">
          <div>
            <PropertyAgentContactCard
              agentImageSrc={property.team_image}
              agentName={agentName}
              agentRole={agentRole}
              phone={PROPERTY_AGENT_FALLBACK.phone}
              email={PROPERTY_AGENT_FALLBACK.email}
            />
          </div>
        </aside>

        <section className="w-full bg-[#eef4fa]">
          <div className="mx-auto max-w-[1440px] px-6 py-8 sm:px-8 lg:px-8 lg:py-10 lg:pr-[calc(360px+40px+2rem)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-950 lg:text-2xl">
                  Rooms and Spacing
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  A quick view of the property layout, room counts, and space details.
                </p>
              </div>
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-brand-deep">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-3.5 fill-none stroke-current stroke-[1.8]"
                >
                  <path d="M4 12h16M12 4v16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {roomsAndSpacingFeatures.length ? (
              <>
                <DragScrollCarousel className="no-scrollbar -mx-6 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth scroll-pl-6 px-6 pb-2 lg:hidden">
                  {roomsAndSpacingFeatures.map((feature) => (
                    <div
                      key={`${feature.name}-${feature.value}`}
                      className="w-[44vw] min-w-[138px] max-w-[180px] shrink-0 snap-start"
                    >
                      <RoomsAndSpacingCard feature={feature} />
                    </div>
                  ))}
                </DragScrollCarousel>

                <div
                  className="mt-5 hidden gap-3 lg:grid"
                  style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, max-content))" }}
                >
                  {roomsAndSpacingFeatures.map((feature) => (
                    <RoomsAndSpacingCard
                      key={`${feature.name}-${feature.value}`}
                      feature={feature}
                    />
                  ))}
                </div>
              </>
            ) : (
              <p className="mt-5 text-sm text-slate-600">No room or spacing details listed.</p>
            )}
          </div>
        </section>

        <section className="w-full bg-white">
          <div className="mx-auto max-w-[1440px] px-6 py-8 sm:px-8 lg:px-8 lg:py-10 lg:pr-[calc(360px+40px+2rem)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-950 lg:text-2xl">Amenities</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Available conveniences and lifestyle highlights for this property.
                </p>
              </div>
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-brand-deep">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-3.5 fill-none stroke-current stroke-[1.8]"
                >
                  <path
                    d="M5 12.5 9.2 16.7 19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {property.facilities?.length ? (
              <PropertyAmenitiesGrid amenities={property.facilities} surface="default" />
            ) : (
              <p className="mt-5 text-sm text-slate-600">No amenities listed.</p>
            )}
          </div>
        </section>

        <section className="w-full bg-[#eef4fa]">
          <div className="mx-auto max-w-[1440px] px-6 py-10 sm:px-8 lg:px-8 lg:py-12 lg:pr-[calc(360px+40px+2rem)]">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <article className="rounded-2xl border border-slate-200/80 bg-white p-6 transition-colors duration-200 hover:border-brand-deep/18 hover:bg-sky-50/45">
                <h2 className="text-2xl font-semibold text-slate-950">Description</h2>
                <div
                  className="mt-4 text-sm leading-7 text-slate-700"
                  dangerouslySetInnerHTML={{
                    __html: property.description || "No description provided.",
                  }}
                />
              </article>

              <article className="rounded-2xl border border-slate-200/80 bg-white p-6 transition-colors duration-200 hover:border-brand-deep/18 hover:bg-sky-50/45">
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
          </div>
        </section>

        <section className="w-full bg-white">
          <div className="mx-auto max-w-[1440px] px-6 py-8 sm:px-8 lg:px-8 lg:pr-[calc(360px+40px+2rem)]">
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
          </div>
        </section>
      </div>
    </>
  );
}
