import Link from "next/link";
import { DragScrollCarousel } from "@/components/drag-scroll-carousel";
import PropertyCardS1 from "@/components/estate/propertyCard.s1";
import { testimonials } from "@/lib/site";
import {
  fetchPremiumProperties,
  fetchPropertyListings,
  type PropertyFeature,
  type PropertyItem,
} from "@/lib/property-api";

const quickCategories = [
  {
    count: "98 properties",
    href: "/properties?category=apartment",
    icon: "apartment",
    label: "Apartments",
    tone: "bg-sky-50",
  },
  {
    count: "4,483 properties",
    href: "/properties?category=house",
    icon: "home",
    label: "Family Homes",
    tone: "bg-slate-100",
  },
  {
    count: "72 properties",
    href: "/properties?category=colony-house",
    icon: "villa",
    label: "Villas",
    tone: "bg-emerald-50",
  },
  {
    count: "264 properties",
    href: "/properties?category=commercial",
    icon: "building",
    label: "Commercial",
    tone: "bg-yellow-50",
  },
  {
    count: "2,315 properties",
    href: "/properties?category=land",
    icon: "land",
    label: "Land / Plots",
    tone: "bg-purple-50",
  },
  {
    count: "156 properties",
    href: "/rent",
    icon: "key",
    label: "Rental Ready",
    tone: "bg-blue-50",
  },
  {
    count: "24 properties",
    href: "/properties?category=commercial",
    icon: "shop",
    label: "Shop Space",
    tone: "bg-lime-50",
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
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80",
    rating: 5,
    score: "4.9/5",
    quote:
      "Their Lalitpur shortlist was exactly what we wanted. We closed within three weeks.",
    source: "From Google",
    author: "Aayusha Thapa",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
    rating: 5,
    score: "4.8/5",
    quote:
      "Finally a team that explains pricing honestly in NRS and doesn’t waste your time.",
    source: "From Facebook",
    author: "Rijan Karki",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
    rating: 5,
    score: "5.0/5",
    quote:
      "Strong negotiation and smooth process. The listing presentation looked premium.",
    source: "From Google",
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

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => {
        const isFilled = index < rating;

        return (
          <svg
            key={index}
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={`size-4 stroke-amber-400 stroke-[1.5] ${
              isFilled ? "fill-amber-400" : "fill-white"
            }`}
          >
            <path
              d="m12 3.6 2.5 5.1 5.6.8-4 3.9.9 5.5-5-2.6-5 2.6.9-5.5-4-3.9 5.6-.8L12 3.6Z"
              strokeLinejoin="round"
            />
          </svg>
        );
      })}
    </div>
  );
}

function CategoryIcon({ icon }: { icon: (typeof quickCategories)[number]["icon"] }) {
  if (icon === "home") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-none stroke-current stroke-[1.7]">
        <path d="m3 10 9-7 9 7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 9.5V21h14V9.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "land") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-none stroke-current stroke-[1.7]">
        <path d="M4 18 7 6h13l-3 12H4Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 6 6 18M15 6l-3 12M5 14h13M6 10h13" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "villa") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-none stroke-current stroke-[1.7]">
        <path d="M4 21V9l8-5 8 5v12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 21v-7h8v7M9 10h2M13 10h2M6 21h12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "building") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-none stroke-current stroke-[1.7]">
        <path d="M6 21V5h12v16M4 21h16" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "key") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-none stroke-current stroke-[1.7]">
        <circle cx="8" cy="15" r="4" />
        <path d="m11 12 8-8M16 7l2 2M14 9l2 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "shop") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-none stroke-current stroke-[1.7]">
        <path d="M4 10h16l-1.5-5h-13L4 10Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 10v11h12V10M9 21v-6h6v6M8 13h1M15 13h1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-none stroke-current stroke-[1.7]">
      <path d="M5 21V6h14v15" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 9h3v3H8zM13 9h3v3h-3zM8 15h8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PremiumPropertyCard({
  className = "",
  property,
}: {
  className?: string;
  property: PropertyItem;
}) {
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
    <div className={className}>
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
}

export default async function Home() {
  const premiumPayload = await fetchPremiumProperties(1);
  const recentPayload = await fetchPropertyListings({ page: 1 });
  const premiumListings = premiumPayload.data ?? [];
  const recentListings = recentPayload.items ?? [];
  const featuredListings = premiumListings
    .filter((property) => property.is_featured === "1")
    .slice(0, 8);
  const homepageFeaturedListings =
    featuredListings.length > 0 ? featuredListings : premiumListings.slice(0, 8);
  const premiumPreviewListings = homepageFeaturedListings.slice(0, 4);
  const recentPreviewListings = recentListings.slice(0, 4);
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

      <section className="bg-[#eef4fa] py-9 lg:py-11">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
          <h2 className="font-display text-[1.35rem] font-bold leading-tight text-slate-950 sm:text-[1.75rem] lg:text-[1.95rem]">
            Property Categories
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Browse homes, land, rentals, and commercial spaces by property type.
          </p>
        </div>
        <div className="mx-auto max-w-[1440px]">
          <DragScrollCarousel
            autoScrollIntervalMs={6000}
            className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth scroll-pl-6 px-6 pb-2 lg:gap-5 lg:scroll-pl-8 lg:px-8"
          >
            {quickCategories.map((category) => (
              <Link
                key={category.label}
                href={category.href}
                className="group/category relative inline-flex min-h-[142px] w-[62vw] max-w-[215px] shrink-0 snap-start flex-col items-center justify-center overflow-hidden rounded-lg border border-slate-200/70 bg-white px-4 py-5 text-center text-slate-700 shadow-[0_2px_8px_rgba(31,59,123,0.035)] transition-colors duration-300 hover:border-brand-deep/20 hover:text-brand-deep focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/40 sm:w-[27vw] md:w-[20vw] lg:w-[13vw] xl:w-[158px]"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-brand-deep/80 opacity-0 transition-opacity duration-300 group-hover/category:opacity-100" />
                <span className={`inline-flex size-16 items-center justify-center rounded-full ${category.tone} text-brand transition-colors duration-300 group-hover/category:text-brand-deep`}>
                  <CategoryIcon icon={category.icon} />
                </span>
                <span className="mt-3 text-base font-bold leading-tight text-inherit">
                  {category.label}
                </span>
                <span className="mt-2 text-xs font-normal leading-none text-slate-500">
                  {category.count}
                </span>
              </Link>
            ))}
          </DragScrollCarousel>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-14 lg:px-8">
        <div className="max-w-3xl">
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
            <h2 className="flex flex-wrap items-baseline gap-3 font-display text-[1.4rem] font-bold leading-tight text-slate-950 sm:text-[1.85rem] lg:text-[2.05rem]">
              <Link
                href="/properties?listing=premium"
                className="premium-properties-title-link inline-flex text-slate-950 transition-colors duration-300 hover:text-brand-deep focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/40"
              >
                <span className="premium-properties-underline">Premium Properties</span>
              </Link>
              <Link
                href="/properties?listing=premium"
                aria-label="View premium properties"
                className="premium-properties-link inline-flex h-[1em] items-center text-slate-950 transition-colors duration-300 hover:text-brand-deep focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/40"
              >
                <span
                  aria-hidden="true"
                  className="premium-properties-chevron premium-properties-underline"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-[0.68em] fill-none stroke-current stroke-[2.5]"
                  >
                    <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </h2>
          </div>
          <p className="mt-0.5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            The best properties for your premium lifestyle.
          </p>
        </div>

        <DragScrollCarousel className="no-scrollbar -mx-6 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth scroll-pl-6 px-6 pb-4 xl:hidden">
          {premiumPreviewListings.map((property) => (
            <PremiumPropertyCard
              key={property.id}
              property={property}
              className="w-[82vw] max-w-[360px] shrink-0 snap-start sm:w-[46vw] lg:w-[31vw]"
            />
          ))}
          <Link
            href="/properties?listing=premium"
            className="inline-flex w-[82vw] max-w-[360px] shrink-0 snap-start flex-col justify-between rounded-[24px] border border-slate-200 bg-slate-50 p-5 text-slate-950 transition-colors duration-300 hover:border-brand-deep hover:text-brand-deep focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/40 sm:w-[46vw] lg:w-[31vw]"
          >
            <span className="text-xl font-bold leading-tight">
              See more similar properties
            </span>
            <span className="mt-10 inline-flex items-center gap-2 text-sm font-semibold">
              View premium listings
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-4 fill-none stroke-current stroke-2"
              >
                <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                <path d="m13 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </DragScrollCarousel>

        <div className="mt-6 hidden gap-5 xl:grid xl:grid-cols-4">
          {premiumPreviewListings.map((property) => (
            <PremiumPropertyCard
              key={property.id}
              property={property}
              className="min-w-0"
            />
          ))}
        </div>
      </section>

      <section className="bg-[#eef4fa] py-14">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
              <h2 className="flex flex-wrap items-baseline gap-3 font-display text-[1.4rem] font-bold leading-tight text-slate-950 sm:text-[1.85rem] lg:text-[2.05rem]">
                <Link
                  href="/properties"
                  className="premium-properties-title-link inline-flex text-slate-950 transition-colors duration-300 hover:text-brand-deep focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/40"
                >
                  <span className="premium-properties-underline">Recent Properties</span>
                </Link>
                <Link
                  href="/properties"
                  aria-label="View recent properties"
                  className="premium-properties-link inline-flex h-[1em] items-center text-slate-950 transition-colors duration-300 hover:text-brand-deep focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/40"
                >
                  <span
                    aria-hidden="true"
                    className="premium-properties-chevron premium-properties-underline"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-[0.68em] fill-none stroke-current stroke-[2.5]"
                    >
                      <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </h2>
            </div>
            <p className="mt-0.5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Freshly added properties from the latest live inventory.
            </p>
          </div>

          <DragScrollCarousel className="no-scrollbar -mx-6 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth scroll-pl-6 px-6 pb-4 xl:hidden">
            {recentPreviewListings.map((property) => (
              <PremiumPropertyCard
                key={property.id}
                property={property}
                className="w-[82vw] max-w-[360px] shrink-0 snap-start sm:w-[46vw] lg:w-[31vw]"
              />
            ))}
            <Link
              href="/properties"
              className="inline-flex w-[82vw] max-w-[360px] shrink-0 snap-start flex-col justify-between rounded-[24px] border border-slate-200 bg-white p-5 text-slate-950 transition-colors duration-300 hover:border-brand-deep hover:text-brand-deep focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/40 sm:w-[46vw] lg:w-[31vw]"
            >
              <span className="text-xl font-bold leading-tight">
                See more recent properties
              </span>
              <span className="mt-10 inline-flex items-center gap-2 text-sm font-semibold">
                View all listings
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-4 fill-none stroke-current stroke-2"
                >
                  <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="m13 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </DragScrollCarousel>

          <div className="mt-6 hidden gap-5 xl:grid xl:grid-cols-4">
            {recentPreviewListings.map((property) => (
              <PremiumPropertyCard
                key={property.id}
                property={property}
                className="min-w-0"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-14 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="relative mx-auto w-full max-w-2xl">
            <div className="overflow-hidden rounded-xl border-[18px] border-slate-200 bg-white">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=85"
                alt="Property advisor handing keys to a home buyer"
                width={1400}
                height={980}
                loading="lazy"
                decoding="async"
                className="aspect-[1.12] w-full object-cover object-center"
              />
            </div>

            <div className="absolute -left-4 top-1/2 grid -translate-y-1/2 gap-2 rounded-lg bg-brand px-5 py-5 text-white shadow-[0_8px_20px_rgba(0,180,234,0.2)] sm:-left-8">
              <span className="text-2xl font-bold leading-none">1,200+</span>
              <span className="text-sm font-medium leading-tight">clients served</span>
            </div>

            <div className="absolute -bottom-4 right-4 rounded-lg bg-brand-deep px-5 py-4 text-white shadow-[0_8px_20px_rgba(31,59,123,0.18)] sm:right-8">
              <span className="block text-2xl font-bold leading-none">500+</span>
              <span className="mt-1 block text-sm font-medium leading-tight">properties matched</span>
            </div>
          </div>

          <div>
            <h2 className="font-display text-[1.75rem] font-bold leading-tight text-slate-950 sm:text-[2.25rem] lg:text-[2.55rem]">
              Why Choose Us?
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
              As Nepal&apos;s dedicated real estate specialists, we bring deep local expertise to help you
              navigate the city&apos;s most promising property opportunities. We pride ourselves on a
              foundation of absolute transparency and integrity, ensuring that every transaction is
              straightforward with no hidden fees. With a successful history of supporting over 1,200+
              families in their journey toward homeownership and smart investments, we provide end-to-end
              assistance from personalized property matching to full legal and paperwork support. When
              you choose us, you are choosing a partner who understands the pulse of the Kathmandu market
              and is committed to turning your vision of a perfect home into a reality.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xl font-bold text-brand-deep">35+</p>
                <p className="mt-1 text-sm text-slate-600">real estate advisors</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xl font-bold text-brand-deep">96%</p>
                <p className="mt-1 text-sm text-slate-600">closing satisfaction</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xl font-bold text-brand-deep">15+</p>
                <p className="mt-1 text-sm text-slate-600">years in market</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef4fa] px-6 py-14 text-slate-950 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="max-w-3xl">
            <h2 className="font-display text-[1.4rem] font-bold leading-tight sm:text-[1.85rem] lg:text-[2.05rem]">
              Reviews From Our Clients
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              What people say after working with our team to buy, sell, or shortlist properties.
            </p>
          </div>

          <DragScrollCarousel
            autoScrollIntervalMs={6500}
            className="no-scrollbar -mx-6 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth scroll-pl-6 px-6 pb-2 lg:-mx-8 lg:scroll-pl-8 lg:px-8"
          >
            {clientReviews.map((review) => (
              <figure
                key={review.author}
                className="w-[82vw] max-w-[380px] shrink-0 snap-start rounded-xl border border-slate-200/70 bg-white p-6 shadow-[0_2px_8px_rgba(31,59,123,0.035)] sm:w-[46vw] lg:w-[31vw] xl:w-[calc((100%-2.5rem)/3)]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    width={96}
                    height={96}
                    loading="lazy"
                    decoding="async"
                    className="size-12 rounded-full object-cover"
                  />
                  <figcaption>
                    <p className="text-sm font-bold text-slate-950">{review.author}</p>
                    <div className="mt-1">
                      <ReviewStars rating={review.rating} />
                    </div>
                  </figcaption>
                </div>

                <blockquote className="mt-4 text-base leading-6 text-slate-700">
                  {review.quote}
                </blockquote>
                <p className="mt-4 text-xs font-medium text-slate-500">
                  {review.source}
                </p>
              </figure>
            ))}
          </DragScrollCarousel>
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
