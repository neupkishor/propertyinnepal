import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DragScrollCarousel } from "@/components/drag-scroll-carousel";
import PropertyCardS1 from "@/components/estate/propertyCard.s1";
import { PropertyAgentContactCard } from "@/components/property-agent-contact-card";
import { PropertyAmenitiesGrid } from "@/components/property-amenities-grid";
import { PropertyFloatingAgentSidebar } from "@/components/property-floating-agent-sidebar";
import { PropertyLifeAroundArea } from "@/components/property-life-around-area";
import { PropertyPhotoGallery } from "@/components/property-photo-gallery";
import { PropertyShareButton } from "@/components/property-share-button";
import {
  fetchPremiumProperties,
  fetchPropertyBySlug,
  formatPropertyPrice,
  type PropertyFeature,
  type PropertyItem,
} from "@/lib/property-api";
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
  return formatPropertyPrice(price, onCalling, "मूल्य सम्पर्कमा");
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

function getFeatureValue(
  features: PropertyFeature[] | undefined,
  matchers: RegExp[],
) {
  if (!features?.length) return null;

  const feature = features.find((item) =>
    matchers.some((matcher) => matcher.test(`${item.name} ${item.value}`)),
  );

  return feature?.value || null;
}

function formatCountLabel(value: string | null, label: string) {
  return value ? `${value} ${label}` : `N/A ${label}`;
}

function formatPropertyKind(type: string) {
  const normalizedType = type.trim();
  return normalizedType ? normalizedType.toLowerCase() : "property";
}

function formatPurpose(value: string) {
  const normalizedValue = value.trim();
  return normalizedValue ? normalizedValue.toLowerCase() : "listing";
}

function formatAboutFeatureList(features: { name: string; value: string }[]) {
  const details = features
    .filter((feature) => feature.name !== "Area")
    .map((feature) => `${feature.value} ${feature.name}`);

  if (details.length === 0) return null;
  if (details.length === 1) return details[0];
  if (details.length === 2) return `${details[0]} and ${details[1]}`;

  return `${details.slice(0, -1).join(", ")}, and ${details[details.length - 1]}`;
}

function formatSentenceList(values: string[]) {
  const normalizedValues = values.map((value) => value.trim()).filter(Boolean);

  if (normalizedValues.length === 0) return null;
  if (normalizedValues.length === 1) return normalizedValues[0];
  if (normalizedValues.length === 2) return `${normalizedValues[0]} and ${normalizedValues[1]}`;

  return `${normalizedValues.slice(0, -1).join(", ")}, and ${
    normalizedValues[normalizedValues.length - 1]
  }`;
}

function getAmenityList(facilities: PropertyFeature[]) {
  return formatSentenceList(
    facilities
      .map((facility) => facility.name || facility.value)
      .filter(Boolean)
      .slice(0, 12),
  );
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

function RecommendedPropertyCard({ property }: { property: PropertyItem }) {
  const bedroomValue = getFeatureValue(property.features, [/bed/i, /bedroom/i]);
  const bathroomValue = getFeatureValue(property.features, [/bath/i, /bathroom/i]);
  const location = [property.location, property.city]
    .map((value) => value?.trim())
    .filter(Boolean)
    .join(", ");

  return (
    <PropertyCardS1
      className="h-full"
      href={`/properties/${property.slug}`}
      imageAlt={property.name}
      imageSrc={property.images?.[0] ?? "/logo.png"}
      agentImageSrc={property.team_image}
      title={property.name}
      status={property.for}
      price={formatPropertyPrice(property.price, property.on_calling)}
      priceTag={formatPropertyPrice(property.price, property.on_calling)}
      propertyType={property.type}
      location={location || "N/A"}
      bedroomLabel={formatCountLabel(bedroomValue, "Beds")}
      bathroomLabel={formatCountLabel(bathroomValue, "Baths")}
      areaLabel={property.area || "N/A"}
    />
  );
}

export default async function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const { slug } = await params;
  const [property, recommendedPayload] = await Promise.all([
    fetchPropertyBySlug(slug),
    fetchPremiumProperties(),
  ]);

  if (!property) {
    notFound();
  }

  const recommendedProperties = recommendedPayload.data
    .filter((item) => item.id !== property.id && item.slug !== property.slug)
    .slice(0, 3);
  const roomsAndSpacingFeatures = getRoomsAndSpacingFeatures(property.features, property.area);
  const aboutFeatureList = formatAboutFeatureList(roomsAndSpacingFeatures);
  const amenityList = getAmenityList(property.facilities);
  const propertyKind = formatPropertyKind(property.type);
  const propertyPurpose = formatPurpose(property.for);
  const propertyLocation = [property.location, property.city]
    .map((value) => value?.trim())
    .filter(Boolean)
    .join(", ");
  const agentName = getTeamName(property.team);
  const agentRole = getTeamRole(property.team);

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-6 pb-10 pt-3 lg:px-8 lg:pt-4">
        {property.images?.length > 0 ? (
          <PropertyPhotoGallery images={property.images} title={property.name} />
        ) : null}
      </section>

      <div className="relative overflow-hidden">
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

        <div className="w-full lg:hidden">
          <div className="mx-auto max-w-[1440px] px-6 py-8">
            <PropertyAgentContactCard
              agentImageSrc={property.team_image}
              agentName={agentName}
              agentRole={agentRole}
              phone={PROPERTY_AGENT_FALLBACK.phone}
              email={PROPERTY_AGENT_FALLBACK.email}
            />
          </div>
        </div>

        <section className="w-full">
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

        <section className="w-full">
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

        <PropertyLifeAroundArea areaName={propertyLocation || property.location || property.city} />

        <section className="w-full">
          <div className="mx-auto max-w-[1440px] px-6 py-10 sm:px-8 lg:px-8 lg:py-12 lg:pr-[calc(360px+40px+2rem)]">
            <article className="max-w-5xl">
              <h2 className="text-2xl font-semibold text-slate-950">About This Property</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                Property in Nepal proudly presents this {propertyKind} for {propertyPurpose}
                {propertyLocation ? ` at ${propertyLocation}` : ""}. This listing offers a
                practical blend of location, comfort, and accessibility for buyers and tenants
                looking for a well-positioned property in Nepal.
              </p>
              {aboutFeatureList ? (
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  This {propertyKind} has {aboutFeatureList}. The total area is{" "}
                  {property.area || "N/A"}, giving the property a balanced layout for regular use,
                  family living, or long-term investment.
                </p>
              ) : null}
              {amenityList ? (
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  Modern amenities and facilities include {amenityList}.
                </p>
              ) : null}
              <p className="mt-4 text-sm leading-7 text-slate-700">
                Asking budget:{" "}
                <span className="font-semibold text-slate-950">
                  {formatPropertyPrice(property.price, property.on_calling)}
                </span>
                . This property has {property.views} views, was listed on{" "}
                {property.created_at_human || "N/A"}, and is managed by{" "}
                {renderTeam(property.team)}.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                For more information, updated availability, negotiation details, or to schedule a
                property visit, contact {agentName} at {PROPERTY_AGENT_FALLBACK.phone} or{" "}
                {PROPERTY_AGENT_FALLBACK.email}.
              </p>
            </article>
          </div>
        </section>
      </div>

      {recommendedProperties.length ? (
        <section className="w-full">
          <div className="mx-auto max-w-[1440px] px-6 py-10 sm:px-8 lg:px-8 lg:py-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">
                  Recommended Properties
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Similar verified listings selected from current property inventory.
                </p>
              </div>
              <Link
                href="/properties"
                className="hidden text-sm font-semibold text-brand-deep transition hover:text-slate-950 sm:inline-flex"
              >
                View all properties
              </Link>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {recommendedProperties.map((recommendedProperty) => (
                <RecommendedPropertyCard
                  key={recommendedProperty.id}
                  property={recommendedProperty}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="w-full">
        <div className="mx-auto max-w-[1440px] px-6 py-8 sm:px-8 lg:px-8">
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
    </>
  );
}
