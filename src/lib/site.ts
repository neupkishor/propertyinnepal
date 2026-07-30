export type NavigationItem = {
  href: string;
  label: string;
  children?: NavigationItem[];
};

export const navigation: NavigationItem[] = [
  {
    href: "/properties?purpose=buy",
    label: "Buy",
    children: [
      { href: "/properties?purpose=buy&type=house", label: "House" },
      { href: "/properties?purpose=buy&type=colony-house", label: "Colony House" },
      { href: "/properties?purpose=buy&type=land", label: "Land" },
      { href: "/properties?purpose=buy&type=apartment", label: "Apartment" },
      {
        href: "/properties?purpose=buy&type=commercial-property",
        label: "Commercial Property",
      },
      {
        href: "/properties?purpose=buy&type=semi-commercial-property",
        label: "Semi Commercial Property",
      },
    ],
  },
  {
    href: "/properties?purpose=rent",
    label: "Rent",
    children: [
      { href: "/properties?purpose=rent&type=house", label: "House" },
      { href: "/properties?purpose=rent&type=colony-house", label: "Colony House" },
      { href: "/properties?purpose=rent&type=land", label: "Land" },
      { href: "/properties?purpose=rent&type=apartment", label: "Apartment" },
      {
        href: "/properties?purpose=rent&type=commercial-property",
        label: "Commercial Property",
      },
      {
        href: "/properties?purpose=rent&type=semi-commercial-property",
        label: "Semi Commercial Property",
      },
    ],
  },
  { href: "/properties?media=video", label: "Videos" },
  {
    href: "/properties",
    label: "Listings",
    children: [
      { href: "/properties?listing=premium", label: "Premium" },
      { href: "/properties?listing=new", label: "New" },
      { href: "/properties?listing=under-construction", label: "Under Construction" },
      { href: "/properties?listing=sold", label: "Sold" },
    ],
  },
  {
    href: "/services",
    label: "Tools",
    children: [
      { href: "/services?tool=emi-calculator", label: "EMI Calculator" },
      { href: "/services?tool=unit-converter", label: "Unit Converter" },
    ],
  },
  {
    href: "/about",
    label: "Company",
    children: [
      { href: "/about", label: "About Us" },
      { href: "/about/branches", label: "Our Branches" },
      { href: "/about/team", label: "Team" },
      { href: "/services", label: "Services" },
      { href: "/properties?listing=sold", label: "Sold Property" },
      { href: "/blogs", label: "Blogs" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
];

export const heroStats = [
  { value: "250+", label: "verified listings" },
  { value: "8", label: "cities and districts covered" },
  { value: "72h", label: "average response time" },
  { value: "94%", label: "client satisfaction" },
];

export const featuredProperties = [
  {
    name: "Skyline Residences",
    location: "Lalitpur",
    price: "NRS 2.8 Cr",
    type: "3 BHK Apartment",
    area: "1,850 sq ft",
    beds: "3 beds",
    baths: "3 baths",
    highlight: "Ready to move",
  },
  {
    name: "The Courtyard House",
    location: "Bhaisepati",
    price: "NRS 4.1 Cr",
    type: "Luxury Villa",
    area: "3,200 sq ft",
    beds: "4 beds",
    baths: "4 baths",
    highlight: "Private garden",
  },
  {
    name: "Capital Edge Plot",
    location: "Budhanilkantha",
    price: "NRS 1.9 Cr",
    type: "Premium Land",
    area: "13 aana",
    beds: "Flexible",
    baths: "Flexible",
    highlight: "High-growth zone",
  },
  {
    name: "Blue Ridge Penthouse",
    location: "Maharajgunj",
    price: "NRS 3.5 Cr",
    type: "Penthouse",
    area: "2,100 sq ft",
    beds: "3 beds",
    baths: "4 baths",
    highlight: "City views",
  },
  {
    name: "Lakeside Investment Unit",
    location: "Pokhara",
    price: "NRS 1.6 Cr",
    type: "1 BHK Apartment",
    area: "980 sq ft",
    beds: "1 bed",
    baths: "1 bath",
    highlight: "Short-stay ready",
  },
  {
    name: "Business Avenue Office",
    location: "New Baneshwor",
    price: "NRS 2.2 Cr",
    type: "Commercial Space",
    area: "1,420 sq ft",
    beds: "Open plan",
    baths: "2 baths",
    highlight: "For lease or sale",
  },
] as const;

export const services = [
  {
    title: "Buy with clarity",
    description:
      "Shortlist the right homes, compare neighborhoods, and move fast on the best opportunities.",
  },
  {
    title: "Sell with precision",
    description:
      "Position your property with premium listing copy, polished visuals, and a lead-ready sales flow.",
  },
  {
    title: "Invest strategically",
    description:
      "Evaluate growth corridors, rental demand, and resale potential before you commit capital.",
  },
  {
    title: "Manage smoothly",
    description:
      "Handle tenant coordination, renewals, and ongoing maintenance with a trusted local team.",
  },
] as const;

export const processSteps = [
  {
    title: "Discover",
    description:
      "We define your goals, budget, and preferred locations before the search begins.",
  },
  {
    title: "Curate",
    description:
      "We filter the market to only the properties that meet your standards and timeline.",
  },
  {
    title: "Close",
    description:
      "We support negotiation, due diligence, and coordination until the handover is complete.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "The presentation was clean, the leads were serious, and the property sold faster than expected.",
    author: "Anita Shrestha",
    role: "Seller, Lalitpur",
  },
  {
    quote:
      "We found a home that matched both our lifestyle and our budget without wasting weekends on bad fits.",
    author: "Suresh K.C.",
    role: "Buyer, Kathmandu",
  },
  {
    quote:
      "Their market guidance made our investment decision easier and much more confident.",
    author: "Mina Gurung",
    role: "Investor, Pokhara",
  },
] as const;

export const marketHighlights = [
  "Kathmandu Valley",
  "Pokhara",
  "Bharatpur",
  "Dharan",
  "Butwal",
  "Bhaktapur",
] as const;
