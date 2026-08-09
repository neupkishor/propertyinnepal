import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Outfit } from "next/font/google";
import { FloatingSocialRail } from "@/components/floating-social-rail";
import { HeaderNav } from "@/components/header-nav";
import { FooterSocialLinks } from "@/components/social-links";
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
        <div className="relative isolate flex min-h-screen flex-col overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-white" />
          <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white shadow-[0_12px_36px_rgba(15,23,42,0.18)]">
            <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:gap-6 lg:px-8">
              <Link href="/" className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="Property in Nepal logo"
                  width={2278}
                  height={1343}
                  loading="eager"
                  decoding="async"
                  className="h-auto max-h-11 w-auto rounded-md object-contain"
                />
                <span className="min-w-0 leading-tight">
                  <span className="block text-sm font-bold text-brand-deep sm:text-base">
                    Property in Nepal
                  </span>
                  <span className="block text-[0.68rem] font-medium leading-tight text-brand sm:text-xs">
                    घर किन्दा सम्झिनु ल !
                  </span>
                </span>
              </Link>

              <Suspense>
                <HeaderNav items={navigation} />
              </Suspense>

              <Link
                href="/contact"
                className="hidden items-center justify-center rounded-full bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-500/30 md:inline-flex"
              >
                Talk to an advisor
              </Link>
            </div>
          </header>

          <FloatingSocialRail />

          <main className="flex-1 pt-[88px]">{children}</main>

          <footer className="border-t border-brand/20 bg-brand-deep text-white">
            <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-[1.25fr_0.65fr_0.65fr_0.9fr] lg:px-8">
              <div>
                <Link href="/" className="inline-flex w-fit items-center gap-3">
                  <img
                    src="/logo.png"
                    alt="Property in Nepal logo"
                    width={2278}
                    height={1343}
                    loading="lazy"
                    decoding="async"
                    className="h-auto max-h-12 w-auto rounded-md bg-white object-contain p-1"
                  />
                  <span className="min-w-0">
                    <span className="block text-base font-bold text-white">
                      Property in Nepal
                    </span>
                    <span className="block text-xs font-medium text-sky-200">
                      घर किन्दा सम्झिनु ल !
                    </span>
                  </span>
                </Link>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/75">
                  A clean, modern real estate experience for premium homes,
                  investment properties, and serious sellers across Nepal.
                </p>
                <FooterSocialLinks />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">Explore</p>
                <div className="mt-4 grid gap-3 text-sm text-white/75">
                  {navigation.map((item) => {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="w-fit transition hover:text-white"
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">Tools</p>
                <div className="mt-4 grid gap-3 text-sm text-white/75">
                  {footerTools.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="w-fit transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">Contact</p>
                <div className="mt-4 grid gap-3 text-sm text-white/75">
                  <a href="mailto:hello@propertyinnepal.com" className="w-fit transition hover:text-white">
                    hello@propertyinnepal.com
                  </a>
                  <a href="tel:+9779851221475" className="w-fit transition hover:text-white">
                    +977-9851221475
                  </a>
                  <a
                    href="https://maps.app.goo.gl/S4EVVPcMwDfVCXL7A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit transition hover:text-white"
                  >
                    Chambling Tower, 4th Floor, Imadole, Lalitpur, Nepal
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-white/15 px-6 py-4 text-center text-xs text-white/60 lg:px-8">
              Built for modern property discovery, lead capture, and high-intent sales.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
