import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Property in Nepal's mission, vision, CEO message, and real estate process.",
};

const howItWorks = [
  {
    title: "Listing Property",
    description:
      "Property owners list with us by sharing documents and key details. We verify information and craft listings that highlight each property's strengths.",
  },
  {
    title: "Property Evaluation",
    description:
      "Our team evaluates each property based on location, condition, and market demand to help set a fair and competitive price.",
  },
  {
    title: "Meet Agent and Friends",
    description:
      "Dedicated agents guide you step by step. Our legal and financial network is available when needed for smoother decisions.",
  },
  {
    title: "Marketing",
    description:
      "We market properties through online channels, social media, and our buyer network to maximize visibility and lead quality.",
  },
  {
    title: "Client Visits and Convincing",
    description:
      "We coordinate viewings, present the property professionally, and handle buyer questions to build confidence and interest.",
  },
  {
    title: "Buyer-Seller Meeting",
    description:
      "We facilitate discussions, handle negotiations, and keep communication clear between both parties.",
  },
  {
    title: "Close The Deal",
    description:
      "From paperwork to legal and payment coordination, we support the closing process so transactions finish smoothly.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-6 pb-12 pt-12 lg:px-8 lg:pt-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-deep/75">
            About Us
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            Building trust in Nepal&apos;s real estate market through service and
            professionalism
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-7 text-slate-600 sm:text-lg">
            Our vision is to become the foremost real estate company in Nepal,
            admired for expertise, innovation, and a customer-centric approach.
            We aim to contribute to the growth and development of the property
            sector by providing comprehensive services, fostering long-term
            relationships, and creating value for clients, employees, and
            stakeholders.
          </p>
          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600 sm:text-lg">
            Residential properties remain highly sought after in Nepal, serving
            the growing urban population through options ranging from compact
            studio apartments to larger family residences.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-12 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-deep/75">
              Our Mission
            </p>
            <p className="mt-3 text-lg leading-8 text-slate-800">
              “To enthusiastically serve our clients by providing tenants with
              homes and workplaces that they can be proud of.”
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-deep/75">
              Our Vision
            </p>
            <p className="mt-3 text-lg leading-8 text-slate-800">
              “To adapt and evolve to continue to offer beyond expectation
              service and results, through creative thinking, leadership,
              initiative, respect and passion.”
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-12 lg:px-8">
        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-deep/75">
            Message From CEO
          </p>
          <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg">
            As the CEO of Property in Nepal, I am grateful for your choice to
            work with us as your trusted real estate partner. Property in Nepal
            has grown into a top national brokerage through strong values, solid
            culture, and long-standing relationships. Our priority remains
            clients who are seeking real estate opportunities, investment
            potential, and the right family home. We welcome both sellers and
            buyers to experience professionalism and reliable guidance.
          </p>
          <div className="mt-6 border-t border-slate-200 pt-4">
            <p className="text-lg font-semibold text-slate-950">Mr. Ramesh Barudi</p>
            <p className="text-sm text-slate-600">CEO &amp; Founder</p>
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-12 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-deep/75">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
              Our streamlined process makes buying and selling simple
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {howItWorks.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="inline-flex size-9 items-center justify-center rounded-lg bg-slate-100 text-sm font-semibold text-slate-900">
                {index + 1}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-16 lg:px-8 lg:pb-24">
        <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff,#f5f9ff)] px-6 py-10 shadow-sm sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-deep/75">
            Our Team
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
            Meet the people behind Property in Nepal
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            Explore our team profile and connect with professionals across sales,
            operations, marketing, finance, and client service.
          </p>
          <div className="mt-7">
            <Link
              href="/about/team"
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5"
            >
              View our team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
