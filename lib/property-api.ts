import { logica } from "@/logica";

export type PropertyFeature = {
  name: string;
  value: string;
  icon?: string;
};

export type PropertyItem = {
  id: string;
  slug: string;
  code: string;
  type: string;
  for: string;
  name: string;
  area: string;
  location: string;
  city: string;
  price: string;
  views: string;
  description: string;
  youtube_link: string | null;
  tiktok_link: string | null;
  is_featured: string;
  is_premium: string;
  features: PropertyFeature[];
  facilities: PropertyFeature[];
  created_at: string;
  created_at_human: string;
  images: string[];
  on_calling: string;
  team:
    | {
        id?: string;
        name?: string;
        position?: string;
      }
    | string
    | null;
  team_image: string | null;
};

export type ListingPagePayload = {
  items: PropertyItem[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
};

type SearchResponse = {
  data: PropertyItem[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

type PremiumResponse = {
  data: PropertyItem[];
};

export type BlogAuthor = {
  name: string;
  email: string | null;
  username: string;
};

export type BlogItem = {
  id: string;
  title: string;
  body: string | null;
  slug: string;
  author: BlogAuthor;
  views: string;
  likes: string | null;
  banner: string;
  created_at: string;
  created_at_human: string;
};

export type BlogDetail = {
  id: string;
  title: string;
  body: string | null;
  slug: string;
  author: BlogAuthor;
  views: string;
  likes: string | null;
  banner: string;
  created_at: string;
  created_at_human: string;
};

export function formatPropertyPrice(
  price: string | null | undefined,
  onCalling: string | null | undefined,
  onCallLabel = "On Call",
) {
  if (onCalling === "1") return onCallLabel;

  const normalizedPrice = price?.trim();
  if (!normalizedPrice) return "N/A";
  if (/^on call$/i.test(normalizedPrice)) return onCallLabel;

  const formattedPrice = normalizedPrice
    .toLowerCase()
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());

  return `NRs. ${formattedPrice}`;
}

export function getDisplayValue(value: string | null | undefined) {
  const normalized = value?.trim();
  return normalized && normalized.length > 0 ? normalized : "N/A";
}

export function getFeatureValue(
  features: PropertyFeature[] | undefined,
  matchers: RegExp[],
) {
  if (!features?.length) return null;

  const feature = features.find((item) =>
    matchers.some((matcher) => matcher.test(`${item.name} ${item.value}`)),
  );

  return feature?.value?.trim() || null;
}

export function getBedroomValue(features: PropertyFeature[] | undefined) {
  return getFeatureValue(features, [/bed/i, /bedroom/i]) ?? "N/A";
}

export function getBathroomValue(features: PropertyFeature[] | undefined) {
  return getFeatureValue(features, [/bath/i, /bathroom/i]) ?? "N/A";
}

export function getSpaceValue(area: string | undefined) {
  return getDisplayValue(area);
}

export function formatCountLabel(value: string, label: string) {
  if (value === "N/A") return value;
  if (/[a-z]/i.test(value)) return value;
  return `${value} ${label}`;
}

type BlogsResponse = {
  data: BlogItem[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

type FilterPropertyListingsArgs = {
  categorySlug?: import("@/lib/property-taxonomy").PropertyCategorySlug;
  page: number;
  purpose?: import("@/lib/property-taxonomy").PurposeSlug;
};

type BridgeRecord = Record<string, unknown>;

const API_BASE = "https://api.propertyinnepal.com.np/api/V1";
const SEARCH_PAGE_SIZE = 12;
const PREMIUM_PAGE_SIZE = 9;

function asRecord(value: unknown): BridgeRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? value as BridgeRecord : {};
}

function asString(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "boolean") return value ? "1" : "0";
  return "";
}

function asOptionalString(value: unknown): string | null {
  const text = asString(value).trim();
  return text ? text : null;
}

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/,/g, ""));
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      if (typeof entry === "string") return entry;
      const record = asRecord(entry);
      return asString(record.url);
    })
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function titleCase(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

function firstText(value: unknown): string {
  if (Array.isArray(value)) return asString(value[0]);
  return asString(value);
}

function getSource(record: BridgeRecord): BridgeRecord {
  const details = asRecord(record.details);
  return asRecord(details.source);
}

function getLocation(record: BridgeRecord) {
  const structuredLocation = asRecord(record.structuredLocation);
  const location = asRecord(record.location);
  const nestedStructured = asRecord(location.structured);
  const source = getSource(record);

  return {
    location:
      asString(record.location) ||
      asString(location.text) ||
      asString(structuredLocation.locality) ||
      asString(nestedStructured.locality),
    city:
      asString(record.city) ||
      asString(structuredLocation.city) ||
      asString(nestedStructured.city) ||
      asString(source.city),
  };
}

function getPricingText(record: BridgeRecord) {
  const source = getSource(record);
  const pricing = record.pricing;

  if (Array.isArray(pricing)) {
    const first = asRecord(pricing[0]);
    const basis = asString(first.basis);
    if (basis) return basis;

    const amount = asNumber(first.askingAmount);
    if (amount && amount > 0) return amount.toLocaleString("en-US");
  }

  const pricingRecord = asRecord(pricing);
  return (
    asString(pricingRecord.raw) ||
    asString(pricingRecord.basis) ||
    asString(source.rawPrice) ||
    asString(record.price && asNumber(record.price)?.toLocaleString("en-US")) ||
    "On Call"
  );
}

function getAreaText(record: BridgeRecord) {
  const source = getSource(record);
  const rawArea = asString(source.rawArea);
  if (rawArea) return rawArea;

  const area = asNumber(record.area);
  const areaUnit = asString(record.areaUnit);
  if (area && areaUnit) return `${area.toLocaleString("en-US")} ${areaUnit}`;
  if (area) return area.toLocaleString("en-US");
  return "N/A";
}

function mapFeatures(record: BridgeRecord): PropertyFeature[] {
  const sourceFeatures = getSource(record).features;
  if (Array.isArray(sourceFeatures)) {
    return sourceFeatures
      .map((feature) => {
        const featureRecord = asRecord(feature);
        return {
          icon: asOptionalString(featureRecord.icon) ?? undefined,
          name: asString(featureRecord.name),
          value: asString(featureRecord.value),
        };
      })
      .filter((feature) => feature.name && feature.value);
  }

  const details = asRecord(record.details);
  const detailGroups = ["house", "apartment", "land", "flat", "space"]
    .map((key) => asRecord(details[key]))
    .filter((group) => Object.keys(group).length > 0);
  const detailFeatures: PropertyFeature[] = [];

  for (const group of detailGroups) {
    const entries = [
      ["Bedrooms", group.bedrooms],
      ["Bathrooms", group.bathrooms],
      ["Living Rooms", group.livingRooms],
      ["Dining Rooms", group.diningRooms],
      ["Kitchens", group.kitchens],
      ["Floors", group.floors],
      ["Car Parking", group.carParkingSpots],
      ["Bike Parking", group.bikeParkingSpots],
      ["Built Year", group.builtYear],
      ["Furnished", group.furnished],
      ["Area", group.area],
    ] as const;

    for (const [name, value] of entries) {
      const text = asString(value);
      if (text && text !== "0") detailFeatures.push({ name, value: text });
    }
  }

  if (detailFeatures.length) return detailFeatures;

  const featureEntries: PropertyFeature[] = [
    { name: "Bedrooms", value: asString(record.bedrooms) },
    { name: "Bathrooms", value: asString(record.bathrooms) },
    { name: "Facing", value: asString(record.facing) },
    { name: "Floors", value: asString(record.floors) },
  ];

  return featureEntries.filter((feature) => feature.value);
}

function mapFacilities(record: BridgeRecord): PropertyFeature[] {
  const source = getSource(record);
  const rawAmenities = [record.amenities, source.amenities];
  const amenities = uniqueStrings(
    rawAmenities.flatMap((value) => {
      if (!Array.isArray(value)) return [];

      return value
        .map((entry) => {
          if (typeof entry === "string") return entry;

          const amenityRecord = asRecord(entry);
          return (
            asString(amenityRecord.name) ||
            asString(amenityRecord.label) ||
            asString(amenityRecord.title) ||
            asString(amenityRecord.value)
          );
        })
        .filter(Boolean);
    }),
  );

  return amenities.map((amenity) => ({
    name: titleCase(amenity),
    value: "Yes",
  }));
}

function getCreatedHuman(record: BridgeRecord) {
  const createdAt = asString(record.createdAt);
  if (!createdAt) return "";

  const createdDate = new Date(createdAt);
  if (Number.isNaN(createdDate.getTime())) return "";

  return createdDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getTeam(record: BridgeRecord): PropertyItem["team"] {
  const listedBy = asRecord(record.listedBy);
  const displayName = asString(listedBy.displayName);
  if (displayName) {
    return {
      id: asString(listedBy.id) || undefined,
      name: displayName,
      position: titleCase(asString(listedBy.type) || "Agent"),
    };
  }

  const listingAgent = asString(record.listingAgent);
  if (!listingAgent) return null;

  return {
    id: asString(record.listingAgentId) || undefined,
    name: listingAgent,
    position: "Agent",
  };
}

function getTeamImage(record: BridgeRecord) {
  const listedBy = asRecord(record.listedBy);
  return asOptionalString(listedBy.displayImage);
}

function mapProperty(record: unknown): PropertyItem {
  const property = asRecord(record);
  const source = getSource(property);
  const location = getLocation(property);
  const purpose = firstText(property.purpose || property.purposes);
  const propertyType = firstText(property.category) || firstText(property.type) || "Property";
  const onCalling = asString(source.onCalling) === "1" ? "1" : "0";

  return {
    id: asString(property.id) || asString(source.id) || asString(property.slug),
    slug: asString(property.slug) || asString(property.id),
    code: asString(property.customId) || asString(source.code) || asString(property.id),
    type: titleCase(propertyType),
    for: purpose.toLowerCase(),
    name: asString(property.title) || "Untitled property",
    area: getAreaText(property),
    location: location.location || "Nepal",
    city: location.city || "Nepal",
    price: getPricingText(property),
    views: asString(source.views) || "0",
    description: asString(property.description),
    youtube_link: asOptionalString(source.youtubeLink),
    tiktok_link: asOptionalString(source.tiktokLink),
    is_featured: property.isFeatured === true ? "1" : "0",
    is_premium: property.isFeatured === true ? "1" : "0",
    features: mapFeatures(property),
    facilities: mapFacilities(property),
    created_at: asString(property.createdAt),
    created_at_human: getCreatedHuman(property),
    images: asStringArray(property.images),
    on_calling: onCalling,
    team: getTeam(property),
    team_image: getTeamImage(property),
  };
}

function getCategoryFilter(categorySlug: FilterPropertyListingsArgs["categorySlug"]) {
  if (!categorySlug) return undefined;

  const categoryBySlug = {
    apartment: "Apartment",
    commercial: "Commercial",
    "colony-house": "Colony House",
    house: "House",
    land: "Land",
    "semi-commercial": "Semi Commercial",
  } satisfies Record<NonNullable<FilterPropertyListingsArgs["categorySlug"]>, string>;

  return categoryBySlug[categorySlug];
}

function extractCodeFromSlug(slug: string) {
  return slug.match(/-(\d+)$/)?.[1] ?? null;
}

async function searchProperties({
  categorySlug,
  page,
  purpose,
}: FilterPropertyListingsArgs) {
  const { getPurposeApiValue } = await import("@/lib/property-taxonomy");
  const currentPage = Math.max(1, page);

  return logica.estate.property.search({
    category: getCategoryFilter(categorySlug),
    limit: SEARCH_PAGE_SIZE,
    page: currentPage,
    purpose: purpose ? getPurposeApiValue(purpose) : undefined,
  });
}

export async function fetchProperties(page: number) {
  const listings = await fetchPropertyListings({ page });

  return {
    data: listings.items,
    meta: {
      current_page: listings.currentPage,
      last_page: listings.totalPages,
      per_page: SEARCH_PAGE_SIZE,
      total: listings.totalItems,
    },
  } satisfies SearchResponse;
}

export async function fetchPropertyListings({
  categorySlug,
  page,
  purpose,
}: FilterPropertyListingsArgs): Promise<ListingPagePayload> {
  const response = await searchProperties({ categorySlug, page, purpose });
  const body = asRecord(response.body);
  const properties = Array.isArray(body.properties) ? body.properties : [];
  const totalItems = asNumber(body.totalCount) ?? properties.length;
  const totalPages = Math.max(1, asNumber(body.totalPages) ?? Math.ceil(totalItems / SEARCH_PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, asNumber(body.page) ?? page), totalPages);

  if (!response.ok) {
    throw new Error(`Failed to fetch properties: ${response.status}`);
  }

  return {
    items: properties.map(mapProperty),
    currentPage,
    totalItems,
    totalPages,
  };
}

export async function fetchPropertyBySlug(slug: string) {
  const code = extractCodeFromSlug(slug);

  if (code) {
    const response = await logica.estate.property.getByCode(code);
    const body = asRecord(response.body);
    if (response.ok && body.property) return mapProperty(body.property);
  }

  const response = await logica.estate.property.search({
    limit: 1,
    q: slug,
  });
  const body = asRecord(response.body);
  const properties = Array.isArray(body.properties) ? body.properties : [];
  const exactMatch = properties.find((property) => asRecord(property).slug === slug);

  return exactMatch ? mapProperty(exactMatch) : null;
}

export async function fetchPremiumProperties(page = 1) {
  const response = await logica.estate.property.search({
    limit: 15,
    page: Math.max(1, page),
  });
  const body = asRecord(response.body);
  const properties = Array.isArray(body.properties) ? body.properties.map(mapProperty) : [];
  const premiumProperties = properties.filter((property) => property.is_premium === "1");

  return {
    data: (premiumProperties.length ? premiumProperties : properties).slice(0, PREMIUM_PAGE_SIZE),
  } satisfies PremiumResponse;
}

export async function fetchBlogs(page: number) {
  const response = await fetch(`${API_BASE}/blogs?page=${page}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blogs: ${response.status}`);
  }

  return (await response.json()) as BlogsResponse;
}

export async function fetchBlogBySlug(slug: string) {
  const response = await fetch(`${API_BASE}/blog/${slug}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    data?: BlogDetail;
    message?: string;
  };

  if (payload.message === "Blog Not Found" || !payload.data) {
    return null;
  }

  return payload.data;
}
