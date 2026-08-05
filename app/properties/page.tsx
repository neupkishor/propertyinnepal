import type { Metadata } from "next";
import { PropertyListingsPage } from "@/components/property-listings-page";
import { fetchPropertyListings, type ListingPagePayload } from "@/lib/property-api";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse live properties from Property in Nepal with current listings and details.",
};

type PropertiesPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
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
    listings = await fetchPropertyListings({ page });
  } catch {
    loadError = true;
  }

  return (
    <PropertyListingsPage
      buildPageHref={(nextPage) => `/properties?page=${nextPage}`}
      emptyMessage="No properties found right now."
      heading="Live property listings from Property in Nepal"
      intro="Browse current inventory and open any listing to view complete property details, features, and media."
      listingsLabel="Properties"
      loadError={loadError}
      page={listings.currentPage}
      pageCount={listings.totalPages}
      properties={listings.items}
      total={listings.totalItems}
    />
  );
}
