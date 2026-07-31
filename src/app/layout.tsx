import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Outfit } from "next/font/google";
import { HeaderNav } from "@/components/header-nav";
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

const footerSocialLinks = [
  {
    href: "https://www.facebook.com/propertyinnepal",
    label: "Facebook",
    icon: "facebook",
  },
  {
    href: "https://lnkd.in/dtQf3FNG",
    label: "Instagram",
    icon: "instagram",
  },
  {
    href: "https://lnkd.in/daKpW9pa",
    label: "TikTok",
    icon: "tiktok",
  },
  {
    href: "https://lnkd.in/dtQV_Fui",
    label: "YouTube",
    icon: "youtube",
  },
  {
    href: "https://www.linkedin.com/company/property-in-nepal-pvt-ltd-15814b238",
    label: "LinkedIn",
    icon: "linkedin",
  },
] as const;

function SocialIcon({ icon }: { icon: (typeof footerSocialLinks)[number]["icon"] }) {
  if (icon === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.8-.1-1.6-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.1H7.4V13h2.7v8h3.4Z" />
      </svg>
    );
  }

  if (icon === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-none stroke-current stroke-2">
        <rect width="15" height="15" x="4.5" y="4.5" rx="4" />
        <circle cx="12" cy="12" r="3.2" />
        <path d="M16.7 7.4h.01" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
        <path d="M15.7 3c.3 2.2 1.6 3.5 3.8 3.7v3.1a7.2 7.2 0 0 1-3.7-1.1v5.7c0 3.8-2.3 6.6-5.9 6.6A5.4 5.4 0 0 1 4.5 15.6c0-3.5 3-6 6.4-5.3v3.3c-1.5-.5-3.1.5-3.1 2a2.1 2.1 0 0 0 2.1 2.1c1.6 0 2.5-1 2.5-2.9V3h3.3Z" />
      </svg>
    );
  }

  if (icon === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
        <path d="M21.4 7.2a3 3 0 0 0-2.1-2.1C17.4 4.6 12 4.6 12 4.6s-5.4 0-7.3.5a3 3 0 0 0-2.1 2.1A31.5 31.5 0 0 0 2.1 12c0 1.6.1 3.2.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 7.3.5 7.3.5s5.4 0 7.3-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M6.9 8.8H3.7V20h3.2V8.8ZM5.3 7.3a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8ZM20.3 13.9c0-3-1.6-5-4.3-5-1.6 0-2.7.8-3.2 1.7h-.1V8.8H9.6V20h3.2v-5.6c0-1.5.3-2.9 2.1-2.9 1.7 0 1.8 1.6 1.8 3V20h3.2v-6.1h.4Z" />
    </svg>
  );
}

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
                <span className="min-w-0">
                  <span className="block text-base font-bold text-brand-deep">
                    Property in Nepal
                  </span>
                  <span className="hidden text-xs font-medium text-brand sm:block">
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

          <main className="flex-1 pt-[88px]">{children}</main>

          <footer className="border-t border-brand/20 bg-brand-deep text-white">
            <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-12 lg:grid-cols-[1.3fr_0.7fr_0.8fr] lg:px-8">
              <div>
                <Link href="/" className="flex w-fit items-center gap-3">
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
                <div className="mt-5 flex flex-wrap gap-3">
                  {footerSocialLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 transition hover:border-sky-200/60 hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/30"
                    >
                      <SocialIcon icon={item.icon} />
                    </a>
                  ))}
                </div>
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
