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

const API_BASE = "https://api.propertyinnepal.com.np/api/V1";

export async function fetchProperties(page: number) {
  const response = await fetch(`${API_BASE}/search?page=${page}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch properties: ${response.status}`);
  }

  return (await response.json()) as SearchResponse;
}

export async function fetchPropertyBySlug(slug: string) {
  const response = await fetch(`${API_BASE}/property/${slug}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as { data?: PropertyItem };
  return payload.data ?? null;
}

export async function fetchPremiumProperties(page = 1) {
  const response = await fetch(
    `${API_BASE}/frontend-premium-properties?type=paginated&page=${page}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch premium properties: ${response.status}`);
  }

  return (await response.json()) as PremiumResponse;
}
