import type { Metadata } from "next";
import { PropertyListingsPage } from "@/components/property-listings-page";
import { fetchPropertyListings, type ListingPagePayload } from "@/lib/property-api";

type BuyPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Buy",
  description: "Browse properties available to buy from Property in Nepal.",
};

export default async function BuyPage({ searchParams }: BuyPageProps) {
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
    listings = await fetchPropertyListings({ page, purpose: "buy" });
  } catch {
    loadError = true;
  }

  return (
    <PropertyListingsPage
      buildPageHref={(nextPage) => `/buy?page=${nextPage}`}
      emptyMessage="No buy listings found right now."
      heading="Properties available to buy"
      intro="Browse sale inventory across all categories, then open any listing to view its complete details."
      listingsLabel="Buy"
      loadError={loadError}
      page={listings.currentPage}
      pageCount={listings.totalPages}
      properties={listings.items}
      total={listings.totalItems}
    />
  );
}
