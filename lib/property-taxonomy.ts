export const propertyCategorySlugs = [
  "house",
  "land",
  "commercial",
  "semi-commercial",
  "apartment",
  "colony-house",
] as const;

export const purposeSlugs = ["buy", "rent"] as const;

export type PropertyCategorySlug = (typeof propertyCategorySlugs)[number];
export type PurposeSlug = (typeof purposeSlugs)[number];

type PropertyCategoryDefinition = {
  slug: PropertyCategorySlug;
  label: string;
  matchesType: (value: string) => boolean;
};

const normalize = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const propertyCategories: PropertyCategoryDefinition[] = [
  {
    slug: "house",
    label: "House",
    matchesType: (value) => normalize(value) === "house",
  },
  {
    slug: "land",
    label: "Land",
    matchesType: (value) => normalize(value) === "land",
  },
  {
    slug: "commercial",
    label: "Commercial",
    matchesType: (value) => {
      const normalized = normalize(value);
      return normalized.includes("commercial") && !normalized.includes("semi commercial");
    },
  },
  {
    slug: "semi-commercial",
    label: "Semi Commercial",
    matchesType: (value) => normalize(value).includes("semi commercial"),
  },
  {
    slug: "apartment",
    label: "Apartment",
    matchesType: (value) => normalize(value) === "apartment",
  },
  {
    slug: "colony-house",
    label: "Colony House",
    matchesType: (value) => normalize(value) === "colony house",
  },
];

export function isPurposeSlug(value: string): value is PurposeSlug {
  return purposeSlugs.includes(value as PurposeSlug);
}

export function isPropertyCategorySlug(value: string): value is PropertyCategorySlug {
  return propertyCategorySlugs.includes(value as PropertyCategorySlug);
}

export function getPurposeLabel(purpose: PurposeSlug) {
  return purpose === "buy" ? "Buy" : "Rent";
}

export function getPurposeApiValue(purpose: PurposeSlug) {
  return purpose === "buy" ? "sale" : "rent";
}

export function getPropertyCategoryLabel(slug: PropertyCategorySlug) {
  return propertyCategories.find((category) => category.slug === slug)?.label ?? slug;
}

export function matchesPropertyCategory(type: string, slug: PropertyCategorySlug) {
  return propertyCategories.find((category) => category.slug === slug)?.matchesType(type) ?? false;
}
