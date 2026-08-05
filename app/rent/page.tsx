import type { Metadata } from "next";
import { PropertyListingsPage } from "@/components/property-listings-page";
import { fetchPropertyListings, type ListingPagePayload } from "@/lib/property-api";

type RentPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Rent",
  description: "Browse properties available to rent from Property in Nepal.",
};

export default async function RentPage({ searchParams }: RentPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const page = Math.max(1, Number(resolvedSearchParams.page ?? "1") || 1);
  let listings: ListingPagePayload = {
    currentPage: page,
    items: [],
    totalItems: 0,
    totalPages: 1,
  };
  let loadError = false;

  try {
    listings = await fetchPropertyListings({ page, purpose: "rent" });
  } catch {
    loadError = true;
  }

  return (
    <PropertyListingsPage
      buildPageHref={(nextPage) => `/rent?page=${nextPage}`}
      emptyMessage="No rental listings found right now."
      heading="Properties available to rent"
      intro="Browse rental inventory across all categories, then open any listing to view its complete details."
      listingsLabel="Rent"
      loadError={loadError}
      page={listings.currentPage}
      pageCount={listings.totalPages}
      properties={listings.items}
      total={listings.totalItems}
    />
  );
}
