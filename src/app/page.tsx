import Image from "next/image";
import Link from "next/link";
import { testimonials } from "@/lib/site";
import { fetchPremiumProperties } from "@/lib/property-api";

const quickCategories = [
  "Apartments",
  "Family Homes",
  "Villas",
  "Commercial",
  "Land / Plots",
  "Rental Ready",
] as const;

const searchFilters = [
  "Lalitpur",
  "Bhaisepati",
  "Jawalakhel",
  "Sanepa",
  "Budget under NRS 3 Cr",
  "Ready to Move",
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

export default async function Home() {
  const premiumPayload = await fetchPremiumProperties(1);
  const premiumListings = premiumPayload.data ?? [];
  const heroPremium = premiumListings[0];

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-10 lg:px-8 lg:pb-20 lg:pt-14">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.1)]">
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />

          <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.08fr_0.92fr] lg:p-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
                <Image src="/logo.png" alt="Property in Nepal logo" width={26} height={26} />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                  Lalitpur-focused Real Estate
                </span>
              </div>

              <h1 className="max-w-3xl font-display text-4xl leading-[1.08] text-slate-950 sm:text-5xl lg:text-6xl">
                Find the right property in Lalitpur without the usual chaos.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Verified listings, serious seller inventory, and pricing clarity in NRS.
                Built for buyers and investors who want better options and faster decisions.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/properties"
                  className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:-translate-y-0.5"
                >
                  Explore listings
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Book consultation
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <article className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-2xl font-semibold text-slate-950">250+</p>
                  <p className="text-sm text-slate-600">Active listings</p>
                </article>
                <article className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-2xl font-semibold text-slate-950">4.9/5</p>
                  <p className="text-sm text-slate-600">Client rating</p>
                </article>
                <article className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-2xl font-semibold text-slate-950">15+ yrs</p>
                  <p className="text-sm text-slate-600">Market experience</p>
                </article>
              </div>

              <div className="flex flex-wrap gap-3">
                {searchFilters.map((filter) => (
                  <span
                    key={filter}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm"
                  >
                    {filter}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Smart Property Search
                </p>
                <h2 className="mt-3 font-display text-2xl text-slate-950">Start your search</h2>

                <form className="mt-5 grid gap-3">
                  <input
                    className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-brand/20 transition focus:ring-4"
                    placeholder="Location (e.g., Lalitpur)"
                  />
                  <select className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-brand/20 transition focus:ring-4">
                    <option>Property category</option>
                    {quickCategories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                  <select className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-brand/20 transition focus:ring-4">
                    <option>Budget range (NRS)</option>
                    <option>Under NRS 1 Cr</option>
                    <option>NRS 1 Cr - NRS 2 Cr</option>
                    <option>NRS 2 Cr - NRS 4 Cr</option>
                    <option>Above NRS 4 Cr</option>
                  </select>
                  <button
                    type="button"
                    className="mt-1 inline-flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5"
                  >
                    Search properties
                  </button>
                </form>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_20px_50px_rgba(15,23,42,0.28)]">
                <p className="text-xs uppercase tracking-[0.3em] text-white/65">Premium listing</p>
                <h3 className="mt-3 text-xl font-semibold">
                  {heroPremium?.name ?? "Premium listings updated live"}
                </h3>
                <p className="mt-2 text-sm text-white/75">
                  {heroPremium
                    ? `${heroPremium.location}, ${heroPremium.city}`
                    : "Top premium properties from Property in Nepal."}
                </p>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <p className="text-2xl font-semibold">
                    {heroPremium
                      ? formatListingPrice(heroPremium.price, heroPremium.on_calling)
                      : "NRS Pricing"}
                  </p>
                  <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/90">
                    {heroPremium?.for ?? "For sale"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">
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

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Property Listings
            </p>
            <h2 className="mt-3 font-display text-3xl text-slate-950 sm:text-4xl">
              Premium listings from Property in Nepal
            </h2>
          </div>
          <Link href="/properties" className="text-sm font-semibold text-brand-deep hover:text-brand">
            View all listings
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {premiumListings.slice(0, 6).map((property) => (
            <article
              key={property.id}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <Image
                  src={property.images?.[0] ?? "/logo.png"}
                  alt={property.name}
                  width={960}
                  height={640}
                  className="h-48 w-full object-cover object-center transition duration-300 hover:scale-[1.02]"
                />
              </div>
              <h3 className="mt-4 font-display text-2xl text-slate-950">{property.name}</h3>
              <p className="mt-2 text-sm text-slate-600">
                {property.location}, {property.city}
              </p>
              <p className="mt-4 text-2xl font-semibold text-slate-950">
                {formatListingPrice(property.price, property.on_calling)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
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

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
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

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
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

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
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

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:pb-20">
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
