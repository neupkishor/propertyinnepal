import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Manrope } from "next/font/google";
import { HeaderNav } from "@/components/header-nav";
import { navigation } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <div className="relative isolate flex min-h-screen flex-col overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-white" />
          <header className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/75 shadow-[0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Property in Nepal logo"
                  width={44}
                  height={44}
                  className="rounded-xl border border-slate-200 bg-white p-1 shadow-sm"
                />
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                    Property in Nepal
                  </span>
                  <span className="block text-sm text-slate-600">
                    Modern real estate advisory
                  </span>
                </span>
              </Link>

              <HeaderNav items={navigation} />

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-500/30"
              >
                Talk to an advisor
              </Link>
            </div>
          </header>

          <main className="flex-1 pt-[88px]">{children}</main>

          <footer className="border-t border-white/70 bg-white/70 backdrop-blur-xl">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.3fr_0.7fr_0.8fr] lg:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                  Property in Nepal
                </p>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
                  A clean, modern real estate experience for premium homes,
                  investment properties, and serious sellers across Nepal.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-950">Explore</p>
                <div className="mt-4 grid gap-3 text-sm text-slate-600">
                  {navigation.map((item) => (
                    <Link key={item.href} href={item.href} className="w-fit transition hover:text-slate-950">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-950">Contact</p>
                <div className="mt-4 grid gap-3 text-sm text-slate-600">
                  <a href="mailto:hello@propertyinnepal.com" className="transition hover:text-slate-950">
                    hello@propertyinnepal.com
                  </a>
                  <a href="tel:+9779851221475" className="transition hover:text-slate-950">
                    +977-9851221475
                  </a>
                  <p>Kathmandu Valley, Nepal</p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200/70 px-6 py-4 text-center text-xs text-slate-500 lg:px-8">
              Built for modern property discovery, lead capture, and high-intent sales.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
