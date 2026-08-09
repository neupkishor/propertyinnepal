import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { SiteShell } from "@/components/site-shell";
import { navigation } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Property in Nepal",
    template: "%s | Property in Nepal",
  },
  description:
    "Modern real estate advisory for buyers, sellers, and investors across Nepal.",
};

const footerTools = [
  { label: "EMI Calculator", href: "/tools/emi-calculator" },
  { label: "Calendar", href: "/tools/calendar" },
  { label: "Unit Converter", href: "/tools/unit-converter" },
] as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <SiteShell navigation={navigation} footerTools={footerTools}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
