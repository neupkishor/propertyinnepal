import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Branches",
  description:
    "Explore Property in Nepal branch coverage across Kathmandu, Pokhara, and Bharatpur.",
};

const branches = [
  {
    city: "Kathmandu Branch",
    area: "Thamel, Kathmandu, Nepal",
    focus: "Central city homes, apartments, and commercial leads",
    mapUrl: "https://maps.google.com/?q=Thamel,Kathmandu,Nepal",
    image: "https://propertyinnepal.com.np/img/kathmandu.d977d3fc.jpg",
  },
  {
    city: "Pokhara Branch",
    area: "Lakeside, Pokhara, Nepal",
    focus: "Tourism-linked rentals, lake-view homes, and investments",
    mapUrl: "https://maps.google.com/?q=Lakeside,Pokhara,Nepal",
    image:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    city: "Bharatpur Branch",
    area: "Bharatpur, Chitwan, Nepal",
    focus: "Residential growth corridors and family-ready properties",
    mapUrl: "https://maps.google.com/?q=Bharatpur,Chitwan,Nepal",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

const contact = {
  phone: "+977-9851221475",
  email: "propertyinnepal22@gmail.com",
  hq: "Chambling Tower, 4th Floor, Imadole, Lalitpur, Nepal",
};

export default function BranchesPage() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-6 pb-12 pt-12 lg:px-8 lg:pt-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-deep/75">
            Our Branches
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            Local teams in key markets across Nepal
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            We operate through focused branch coverage to support faster visits,
            better local market guidance, and stronger deal execution.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-12 lg:px-8 lg:pb-16">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {branches.map((branch) => (
            <article
              key={branch.city}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <img
                src={branch.image}
                alt={`${branch.city} office`}
                width={1200}
                height={760}
                loading="lazy"
                decoding="async"
                className="mb-4 h-44 w-full rounded-xl border border-slate-200 object-cover"
              />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Branch Office
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                {branch.city}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{branch.area}</p>
              <p className="mt-4 text-sm leading-6 text-slate-600">{branch.focus}</p>

              <a
                href={branch.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-200"
              >
                View on map
                <span aria-hidden>↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-16 lg:px-8 lg:pb-24">
        <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff,#f5f9ff)] px-6 py-10 shadow-sm sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-deep/75">
            Main Contact
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
            Need branch-specific support? We’ll route you quickly.
          </h2>

          <div className="mt-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
            <p className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <span className="font-semibold">Phone:</span> {contact.phone}
            </p>
            <p className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <span className="font-semibold">Email:</span> {contact.email}
            </p>
            <p className="rounded-xl border border-slate-200 bg-white px-4 py-3 sm:col-span-2">
              <span className="font-semibold">Head Office:</span> {contact.hq}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5"
            >
              Contact branch team
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Browse properties
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
