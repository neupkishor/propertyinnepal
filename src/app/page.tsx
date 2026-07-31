import Link from "next/link";
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

const propertyCollections = [
  {
    name: "Premium Lalitpur Homes",
    details: "Handpicked homes in high-demand neighborhoods with strong resale value.",
    count: "42 listings",
  },
  {
    name: "Investor Picks",
    details: "High-yield apartments and mixed-use spaces with rental-demand focus.",
    count: "29 listings",
  },
  {
    name: "Family Ready Properties",
    details: "Move-in-ready homes near schools, hospitals, and daily essentials.",
    count: "37 listings",
  },
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

function formatListingPrice(price: string, onCalling: string) {
  if (onCalling === "1") return "On Call";
  return `NRS ${price}`;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
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

function getSpaceValue(area: string | undefined) {
  const normalized = area?.trim();
  return normalized && normalized.length > 0 ? normalized : "N/A";
}

function getPropertySummary(description: string, location: string, city: string, type: string) {
  const cleaned = stripHtml(description);

  if (cleaned.length > 0) {
    return cleaned;
  }

  return [type, location, city].filter(Boolean).join(" in ");
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
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Featured Listings
          </p>
          <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-3">
            <h2 className="font-display text-3xl leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Explore and browse our exclusive property listings
            </h2>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-deep transition hover:text-brand"
            >
              View more
              <span aria-hidden className="text-base leading-none">
                →
              </span>
            </Link>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Handpicked properties from our current live inventory with better visuals,
            cleaner details, and faster paths to the listing page.{" "}
            <Link href="/properties" className="font-semibold text-brand-deep hover:text-brand">
              View more
            </Link>
          </p>
        </div>

        <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 xl:grid-cols-4">
          {homepageFeaturedListings.map((property) => {
            const bedroomValue = getBedroomValue(property.features);

            return (
              <article
                key={property.id}
                className="min-w-[84%] snap-start sm:min-w-[48%] md:min-w-0"
              >
                <Link
                  href={`/properties/${property.slug}`}
                  className="group block"
                >
                  <div className="overflow-hidden rounded-[1.75rem] bg-slate-100">
                    <img
                      src={property.images?.[0] ?? "/logo.png"}
                      alt={property.name}
                      width={960}
                      height={640}
                      loading="lazy"
                      decoding="async"
                      className="h-64 w-full object-cover object-center transition duration-500 group-hover:scale-[1.08]"
                    />
                  </div>

                  <div className="mt-5">
                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-slate-950 sm:text-[1.35rem]">
                        {property.name}
                      </h3>
                      <p className="mt-2 text-lg font-semibold leading-none text-slate-950 sm:text-xl">
                        {formatListingPrice(property.price, property.on_calling)}
                      </p>
                    </div>

                    <p className="mt-3 line-clamp-2 text-base leading-7 text-slate-600">
                      {getPropertySummary(
                        property.description,
                        property.location,
                        property.city,
                        property.type,
                      )}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-200 pt-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-500">Bedroom</span>
                        <span>{bedroomValue === "N/A" ? "N/A" : bedroomValue}</span>
                      </div>
                      <div className="h-1 w-1 rounded-full bg-slate-300" />
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-500">Space</span>
                        <span>{getSpaceValue(property.area)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-12 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {propertyCollections.map((collection) => (
            <article key={collection.name} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                {collection.count}
              </p>
              <h3 className="mt-3 font-display text-2xl text-slate-950">{collection.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{collection.details}</p>
            </article>
          ))}
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
