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

type BlogsResponse = {
  data: BlogItem[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

const API_BASE = "https://api.propertyinnepal.com.np/api/V1";
const SEARCH_PAGE_SIZE = 9;

type FilterPropertyListingsArgs = {
  categorySlug?: import("@/lib/property-taxonomy").PropertyCategorySlug;
  page: number;
  purpose?: import("@/lib/property-taxonomy").PurposeSlug;
};

const samplePropertyImages = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1400&q=85",
] as const;

const sampleAdvisorImage =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=320&q=85";

const sampleProperties: PropertyItem[] = [
  {
    id: "sample-property-1",
    slug: "sample-apartment-for-rent-sanepa",
    code: "PIN-S001",
    type: "Apartment",
    for: "rent",
    name: "2 BHK Apartment For Rent",
    area: "1,916 sq.ft",
    location: "Sanepa",
    city: "Lalitpur",
    price: "55,000",
    views: "428",
    description:
      "<p>Bright apartment with open living, modern kitchen, balcony access, and easy access to Ring Road.</p>",
    youtube_link: null,
    tiktok_link: null,
    is_featured: "1",
    is_premium: "1",
    features: [
      { name: "Bedrooms", value: "2" },
      { name: "Bathrooms", value: "1" },
    ],
    facilities: [
      { name: "Parking", value: "1 car" },
      { name: "Water", value: "24 hours" },
      { name: "Security", value: "Yes" },
    ],
    created_at: "2026-07-01",
    created_at_human: "Listed 4 weeks ago",
    images: [samplePropertyImages[0], samplePropertyImages[1]],
    on_calling: "0",
    team: {
      id: "advisor-1",
      name: "Ramesh Shrestha",
      position: "Senior Advisor",
    },
    team_image: sampleAdvisorImage,
  },
  {
    id: "sample-property-2",
    slug: "sample-house-for-sale-bhaktapur",
    code: "PIN-S002",
    type: "House",
    for: "sale",
    name: "House For Sale Bhaktapur",
    area: "20 Aana",
    location: "Bode",
    city: "Bhaktapur",
    price: "16 Crore 99 Lakh",
    views: "812",
    description:
      "<p>Premium independent house with landscaped outdoor space, wide road access, and multiple family living zones.</p>",
    youtube_link: null,
    tiktok_link: null,
    is_featured: "1",
    is_premium: "1",
    features: [
      { name: "Bedrooms", value: "5" },
      { name: "Bathrooms", value: "4" },
    ],
    facilities: [
      { name: "Parking", value: "4 cars" },
      { name: "Garden", value: "Yes" },
      { name: "Road", value: "20 ft" },
    ],
    created_at: "2026-07-03",
    created_at_human: "Listed 4 weeks ago",
    images: [samplePropertyImages[1], samplePropertyImages[2]],
    on_calling: "0",
    team: {
      id: "advisor-1",
      name: "Ramesh Shrestha",
      position: "Senior Advisor",
    },
    team_image: sampleAdvisorImage,
  },
  {
    id: "sample-property-3",
    slug: "sample-family-home-for-sale-bhaisepati",
    code: "PIN-S003",
    type: "House",
    for: "sale",
    name: "Family Home In Bhaisepati",
    area: "6 Aana",
    location: "Bhaisepati",
    city: "Lalitpur",
    price: "4 Crore 75 Lakh",
    views: "391",
    description:
      "<p>Move-in-ready family home in a quiet residential pocket with practical room sizes and parking.</p>",
    youtube_link: null,
    tiktok_link: null,
    is_featured: "1",
    is_premium: "1",
    features: [
      { name: "Bedrooms", value: "4" },
      { name: "Bathrooms", value: "3" },
    ],
    facilities: [
      { name: "Parking", value: "2 cars" },
      { name: "Solar", value: "Yes" },
    ],
    created_at: "2026-07-05",
    created_at_human: "Listed 3 weeks ago",
    images: [samplePropertyImages[2], samplePropertyImages[3]],
    on_calling: "0",
    team: {
      id: "advisor-2",
      name: "Sapana Karki",
      position: "Property Consultant",
    },
    team_image: sampleAdvisorImage,
  },
  {
    id: "sample-property-4",
    slug: "sample-luxury-apartment-for-sale-naxal",
    code: "PIN-S004",
    type: "Apartment",
    for: "sale",
    name: "Luxury Apartment In Naxal",
    area: "1,450 sq.ft",
    location: "Naxal",
    city: "Kathmandu",
    price: "2 Crore 15 Lakh",
    views: "534",
    description:
      "<p>High-floor apartment with city views, refined interiors, lift access, and dedicated parking.</p>",
    youtube_link: null,
    tiktok_link: null,
    is_featured: "1",
    is_premium: "1",
    features: [
      { name: "Bedrooms", value: "3" },
      { name: "Bathrooms", value: "2" },
    ],
    facilities: [
      { name: "Lift", value: "Yes" },
      { name: "Parking", value: "1 car" },
      { name: "Gym", value: "Yes" },
    ],
    created_at: "2026-07-08",
    created_at_human: "Listed 3 weeks ago",
    images: [samplePropertyImages[3], samplePropertyImages[0]],
    on_calling: "0",
    team: {
      id: "advisor-2",
      name: "Sapana Karki",
      position: "Property Consultant",
    },
    team_image: sampleAdvisorImage,
  },
  {
    id: "sample-property-5",
    slug: "sample-commercial-space-for-rent-kupondole",
    code: "PIN-S005",
    type: "Commercial",
    for: "rent",
    name: "Commercial Space In Kupondole",
    area: "2,200 sq.ft",
    location: "Kupondole",
    city: "Lalitpur",
    price: "2,25,000",
    views: "219",
    description:
      "<p>Road-facing commercial floor suitable for office, showroom, or service business.</p>",
    youtube_link: null,
    tiktok_link: null,
    is_featured: "0",
    is_premium: "1",
    features: [
      { name: "Bedrooms", value: "N/A" },
      { name: "Bathrooms", value: "2" },
    ],
    facilities: [
      { name: "Parking", value: "Available" },
      { name: "Road Access", value: "Main road" },
    ],
    created_at: "2026-07-10",
    created_at_human: "Listed 3 weeks ago",
    images: [samplePropertyImages[0], samplePropertyImages[2]],
    on_calling: "0",
    team: {
      id: "advisor-3",
      name: "Prakash Bista",
      position: "Commercial Lead",
    },
    team_image: sampleAdvisorImage,
  },
  {
    id: "sample-property-6",
    slug: "sample-land-for-sale-godawari",
    code: "PIN-S006",
    type: "Land",
    for: "sale",
    name: "Residential Land In Godawari",
    area: "8 Aana",
    location: "Godawari",
    city: "Lalitpur",
    price: "1 Crore 35 Lakh",
    views: "304",
    description:
      "<p>Residential land parcel with peaceful surroundings and practical access for home construction.</p>",
    youtube_link: null,
    tiktok_link: null,
    is_featured: "0",
    is_premium: "0",
    features: [
      { name: "Bedrooms", value: "N/A" },
      { name: "Bathrooms", value: "N/A" },
    ],
    facilities: [
      { name: "Road", value: "13 ft" },
      { name: "Facing", value: "South East" },
    ],
    created_at: "2026-07-12",
    created_at_human: "Listed 2 weeks ago",
    images: [samplePropertyImages[1]],
    on_calling: "0",
    team: {
      id: "advisor-3",
      name: "Prakash Bista",
      position: "Commercial Lead",
    },
    team_image: sampleAdvisorImage,
  },
  {
    id: "sample-property-7",
    slug: "sample-semi-commercial-property-for-sale-jawalakhel",
    code: "PIN-S007",
    type: "Semi Commercial",
    for: "sale",
    name: "Semi Commercial Property",
    area: "5 Aana",
    location: "Jawalakhel",
    city: "Lalitpur",
    price: "3 Crore 90 Lakh",
    views: "178",
    description:
      "<p>Mixed-use property suitable for office-front operations with residential space above.</p>",
    youtube_link: null,
    tiktok_link: null,
    is_featured: "0",
    is_premium: "0",
    features: [
      { name: "Bedrooms", value: "3" },
      { name: "Bathrooms", value: "3" },
    ],
    facilities: [
      { name: "Parking", value: "1 car" },
      { name: "Road", value: "16 ft" },
    ],
    created_at: "2026-07-14",
    created_at_human: "Listed 2 weeks ago",
    images: [samplePropertyImages[2]],
    on_calling: "0",
    team: {
      id: "advisor-4",
      name: "Nisha Maharjan",
      position: "Listing Advisor",
    },
    team_image: sampleAdvisorImage,
  },
  {
    id: "sample-property-8",
    slug: "sample-colony-house-for-rent-imadol",
    code: "PIN-S008",
    type: "Colony House",
    for: "rent",
    name: "Colony House For Rent",
    area: "4 Aana",
    location: "Imadol",
    city: "Lalitpur",
    price: "85,000",
    views: "246",
    description:
      "<p>Comfortable colony house in a managed community with parking, water, and family-friendly access.</p>",
    youtube_link: null,
    tiktok_link: null,
    is_featured: "0",
    is_premium: "0",
    features: [
      { name: "Bedrooms", value: "3" },
      { name: "Bathrooms", value: "2" },
    ],
    facilities: [
      { name: "Parking", value: "1 car" },
      { name: "Security", value: "Community gate" },
    ],
    created_at: "2026-07-16",
    created_at_human: "Listed 2 weeks ago",
    images: [samplePropertyImages[3]],
    on_calling: "0",
    team: {
      id: "advisor-4",
      name: "Nisha Maharjan",
      position: "Listing Advisor",
    },
    team_image: sampleAdvisorImage,
  },
];

export async function fetchProperties(page: number) {
  const currentPage = Math.max(1, page);
  const start = (currentPage - 1) * SEARCH_PAGE_SIZE;
  const data = sampleProperties.slice(start, start + SEARCH_PAGE_SIZE);

  return {
    data,
    meta: {
      current_page: currentPage,
      last_page: Math.max(1, Math.ceil(sampleProperties.length / SEARCH_PAGE_SIZE)),
      per_page: SEARCH_PAGE_SIZE,
      total: sampleProperties.length,
    },
  } satisfies SearchResponse;
}

export async function fetchPropertyListings({
  categorySlug,
  page,
  purpose,
}: FilterPropertyListingsArgs): Promise<ListingPagePayload> {
  const { getPurposeApiValue, matchesPropertyCategory } = await import("@/lib/property-taxonomy");

  const filteredItems = sampleProperties.filter((property) => {
    const matchesPurpose = purpose ? property.for === getPurposeApiValue(purpose) : true;
    const matchesCategory = categorySlug
      ? matchesPropertyCategory(property.type, categorySlug)
      : true;

    return matchesPurpose && matchesCategory;
  });

  const totalItems = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / SEARCH_PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * SEARCH_PAGE_SIZE;

  return {
    items: filteredItems.slice(start, start + SEARCH_PAGE_SIZE),
    currentPage,
    totalItems,
    totalPages,
  };
}

export async function fetchPropertyBySlug(slug: string) {
  return sampleProperties.find((property) => property.slug === slug) ?? null;
}

export async function fetchPremiumProperties(page = 1) {
  const premiumProperties = sampleProperties.filter((property) => property.is_premium === "1");
  const currentPage = Math.max(1, page);
  const start = (currentPage - 1) * SEARCH_PAGE_SIZE;

  return {
    data: premiumProperties.slice(start, start + SEARCH_PAGE_SIZE),
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
