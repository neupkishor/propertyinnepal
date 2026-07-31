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

export async function fetchPropertyListings({
  categorySlug,
  page,
  purpose,
}: FilterPropertyListingsArgs): Promise<ListingPagePayload> {
  const firstPage = await fetchProperties(1);
  const firstPageItems = firstPage.data ?? [];
  const lastPage = Math.max(1, firstPage.meta?.last_page ?? 1);

  const remainingPages =
    lastPage > 1
      ? await Promise.all(
          Array.from({ length: lastPage - 1 }, (_, index) => fetchProperties(index + 2)),
        )
      : [];

  const allItems = [...firstPageItems, ...remainingPages.flatMap((response) => response.data ?? [])];
  const { getPurposeApiValue, matchesPropertyCategory } = await import("@/lib/property-taxonomy");

  const filteredItems = allItems.filter((property) => {
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
