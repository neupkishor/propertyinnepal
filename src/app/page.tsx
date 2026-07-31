import Link from "next/link";
import PropertyCardS1 from "@/components/estate/propertyCard.s1";
import { testimonials } from "@/lib/site";
import { fetchPremiumProperties, type PropertyFeature } from "@/lib/property-api";

const quickCategories = [
  "Apartments",
  "Family Homes",
  "Villas",
  "Commercial",
  "Land / Plots",
  "Rental Ready",
] as const;

const teamNumbers = [
  { value: "15+", label: "Years in the market" },
  { value: "35+", label: "Real estate advisors" },
  { value: "1,200+", label: "Clients served" },
  { value: "96%", label: "Closing satisfaction rate" },
] as const;

const operatingLocations = [
  "Lalitpur (Primary Focus)",
  "Bhaisepati",
  "Jawalakhel",
  "Sanepa",
  "Mahalaxmisthan",
  "Imadol",
  "Kupondole",
  "Ekantakuna",
] as const;

const clientReviews = [
  {
    score: "4.9/5",
    quote:
      "Their Lalitpur shortlist was exactly what we wanted. We closed within three weeks.",
    author: "Aayusha Thapa",
  },
  {
    score: "4.8/5",
    quote:
      "Finally a team that explains pricing honestly in NRS and doesn’t waste your time.",
    author: "Rijan Karki",
  },
  {
    score: "5.0/5",
    quote:
      "Strong negotiation and smooth process. The listing presentation looked premium.",
    author: "Pranav Shrestha",
  },
] as const;

function getDisplayValue(value: string | null | undefined) {
  const normalized = value?.trim();
  return normalized && normalized.length > 0 ? normalized : "N/A";
}

function formatListingPrice(price: string | undefined, onCalling: string | undefined) {
  if (onCalling === "1") return "On Call";
  const normalizedPrice = getDisplayValue(price);
  if (normalizedPrice === "N/A") return normalizedPrice;
  return `NRS ${normalizedPrice}`;
}

function getFeatureValue(
  features: PropertyFeature[] | undefined,
  matchers: RegExp[],
) {
  if (!features?.length) return null;

  const feature = features.find((item) =>
    matchers.some((matcher) => matcher.test(`${item.name} ${item.value}`)),
  );

  return feature?.value?.trim() || null;
}

function getBedroomValue(features: PropertyFeature[] | undefined) {
  return getFeatureValue(features, [/bed/i, /bedroom/i]) ?? "N/A";
}

function getBathroomValue(features: PropertyFeature[] | undefined) {
  return getFeatureValue(features, [/bath/i, /bathroom/i]) ?? "N/A";
}

function getSpaceValue(area: string | undefined) {
  return getDisplayValue(area);
}

function formatCountLabel(value: string, label: string) {
  if (value === "N/A") return value;
  if (/[a-z]/i.test(value)) return value;
  return `${value} ${label}`;
}

export default async function Home() {
  const premiumPayload = await fetchPremiumProperties(1);
  const premiumListings = premiumPayload.data ?? [];
  const featuredListings = premiumListings
    .filter((property) => property.is_featured === "1")
    .slice(0, 8);
  const homepageFeaturedListings =
    featuredListings.length > 0 ? featuredListings : premiumListings.slice(0, 8);
  const heroPremium = premiumListings[0];
  const heroImage =
    heroPremium?.images?.[0] ??
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90";

  return (
    <>
      <section className="relative isolate -mt-[88px] flex min-h-[78svh] w-full overflow-hidden bg-slate-950 pt-[88px] text-white">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.88)_0%,rgba(2,6,23,0.6)_42%,rgba(2,6,23,0.12)_75%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(2,6,23,0.8)_0%,transparent_55%)]" />

        <div className="relative mx-auto flex w-full max-w-[1440px] items-end px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.08em] text-white backdrop-blur-md">
              Find your next home in Nepal
            </p>

            <h1 className="mt-6 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-4xl lg:text-6xl">
              Find the right property without the usual chaos.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              Verified listings, serious seller inventory, and pricing clarity in NRS.
              Built for buyers and investors who want better options and faster decisions.
            </p>

            <form
              action="/properties"
              className="mt-7 flex max-w-2xl items-center gap-2 rounded-2xl border border-white/20 bg-white/95 p-2 shadow-2xl shadow-slate-950/30 backdrop-blur-md"
            >
              <label htmlFor="hero-property-search" className="sr-only">
                Search properties by location or keyword
              </label>
              <input
                id="hero-property-search"
                name="q"
                type="search"
                placeholder="Search by location or property..."
                className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-sky-400"
              />
              <button
                type="submit"
                aria-label="Search properties"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] text-white transition duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/50"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-5 fill-none stroke-current stroke-2"
                >
                  <circle cx="11" cy="11" r="6" />
                  <path d="m20 20-4.2-4.2" strokeLinecap="round" />
                </svg>
              </button>
            </form>

            <Link
              href="/properties"
              className="mt-5 inline-flex items-center justify-center gap-3 text-sm font-semibold text-white transition hover:text-sky-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/50"
            >
              Explore all properties
              <span aria-hidden className="text-xl leading-none">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-8 lg:px-8 lg:py-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {quickCategories.map((category) => (
            <article
              key={category}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center text-sm font-semibold text-slate-700 shadow-sm"
            >
              {category}
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-14 lg:px-8">
        <div className="max-w-3xl">
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
            <h2 className="font-display text-3xl leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Premium Properties
            </h2>
            <Link
              href="/properties?listing=premium"
              aria-label="View premium properties"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-950 shadow-sm transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/40"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-5 fill-none stroke-current stroke-2"
              >
                <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                <path d="m13 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            The best properties for your premium lifestyle.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {homepageFeaturedListings.map((property) => {
            const bedroomValue = getBedroomValue(property.features);
            const bathroomValue = getBathroomValue(property.features);
            const title = getDisplayValue(property.name);
            const propertyType = getDisplayValue(property.type);
            const location = [property.location, property.city]
              .map((value) => value?.trim())
              .filter(Boolean)
              .join(", ");
            const price = formatListingPrice(property.price, property.on_calling);
            const propertyHref = property.slug?.trim()
              ? `/properties/${property.slug}`
              : undefined;

            return (
              <div
                key={property.id}
                className="min-w-0"
              >
                <PropertyCardS1
                  className="h-full"
                  href={propertyHref}
                  imageAlt={title}
                  imageSrc={property.images?.[0] ?? "/logo.png"}
                  agentImageSrc={property.team_image}
                  title={title}
                  status={getDisplayValue(property.for)}
                  price={price}
                  priceTag={price}
                  propertyType={propertyType}
                  location={location || "N/A"}
                  bedroomLabel={formatCountLabel(bedroomValue, "Beds")}
                  bathroomLabel={formatCountLabel(bathroomValue, "Baths")}
                  areaLabel={getSpaceValue(property.area)}
                />
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-12 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Team Strength
          </p>
          <h2 className="mt-3 font-display text-3xl text-slate-950 sm:text-4xl">
            Numbers that show execution, not just promises
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {teamNumbers.map((stat) => (
              <article key={stat.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-3xl font-semibold text-slate-950">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Locations We Operate
            </p>
            <h2 className="mt-3 font-display text-3xl text-slate-950 sm:text-4xl">
              Deep network in Lalitpur, active support across the valley
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
              Our strongest inventory and deal flow is in Lalitpur. We also operate in
              nearby demand pockets where buyers actively compare value and accessibility.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {operatingLocations.map((location) => (
              <article key={location} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                {location}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-12 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {clientReviews.map((review) => (
            <figure key={review.author} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-brand-deep">{review.score} rating</p>
              <blockquote className="mt-3 text-base leading-7 text-slate-700">
                {review.quote}
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-slate-900">
                {review.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-12 lg:px-8 lg:pb-20">
        <div className="grid gap-6 rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff,#f0f7ff)] p-6 shadow-sm sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Testimonials
            </p>
            <h2 className="mt-3 font-display text-3xl text-slate-950 sm:text-4xl">
              What clients say after working with us
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article key={testimonial.author} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm leading-6 text-slate-700">{testimonial.quote}</p>
                  <p className="mt-3 text-sm font-semibold text-slate-950">{testimonial.author}</p>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5"
            >
              Talk to our team
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Browse properties
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
