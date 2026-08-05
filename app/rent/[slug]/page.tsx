import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyListingsPage } from "@/components/property-listings-page";
import { fetchPropertyListings, type ListingPagePayload } from "@/lib/property-api";
import {
  getPropertyCategoryLabel,
  isPropertyCategorySlug,
  propertyCategorySlugs,
} from "@/lib/property-taxonomy";

type RentCategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    page?: string;
  }>;
};

export async function generateMetadata({
  params,
}: RentCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isPropertyCategorySlug(slug)) {
    return {
      title: "Rent",
    };
  }

  return {
    title: `Rent ${getPropertyCategoryLabel(slug)}`,
    description: `Browse ${getPropertyCategoryLabel(slug).toLowerCase()} listings available to rent from Property in Nepal.`,
  };
}

export function generateStaticParams() {
  return propertyCategorySlugs.map((slug) => ({ slug }));
}

export default async function RentCategoryPage({
  params,
  searchParams,
}: RentCategoryPageProps) {
  const { slug } = await params;

  if (!isPropertyCategorySlug(slug)) {
    notFound();
  }

  const resolvedSearchParams = (await searchParams) ?? {};
  const page = Math.max(1, Number(resolvedSearchParams.page ?? "1") || 1);
  const categoryLabel = getPropertyCategoryLabel(slug);
  let listings: ListingPagePayload = {
    currentPage: page,
    items: [],
    totalItems: 0,
    totalPages: 1,
  };
  let loadError = false;

  try {
    listings = await fetchPropertyListings({
      categorySlug: slug,
      page,
      purpose: "rent",
    });
  } catch {
    loadError = true;
  }

  return (
    <PropertyListingsPage
      buildPageHref={(nextPage) => `/rent/${slug}?page=${nextPage}`}
      emptyMessage={`No ${categoryLabel.toLowerCase()} listings found to rent right now.`}
      heading={`${categoryLabel} listings to rent`}
      intro={`Browse ${categoryLabel.toLowerCase()} inventory currently available to rent from Property in Nepal.`}
      listingsLabel="Rent"
      loadError={loadError}
      page={listings.currentPage}
      pageCount={listings.totalPages}
      properties={listings.items}
      total={listings.totalItems}
    />
  );
}
