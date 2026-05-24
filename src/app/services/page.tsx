import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { processSteps, services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Real estate services for buying, selling, investing, and management in Nepal.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-12 lg:px-8 lg:pt-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-deep/70">
            Services
          </p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-slate-950 sm:text-6xl">
            A complete real estate service stack, built to keep momentum.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Whether you are buying your first home or positioning an investment
            asset, we handle the parts that make the process feel slow, unclear,
            or overwhelming.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <SectionHeading
          eyebrow="Core services"
          title="Focus on the deal, not the clutter around it."
          description="We keep the work organized so buyers and sellers can stay confident from first call to final paperwork."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="rounded-[1.75rem] border border-white/80 bg-white/85 p-6 shadow-sm backdrop-blur"
            >
              <p className="text-sm font-semibold text-brand-deep/75">
                0{index + 1}
              </p>
              <h2 className="mt-4 font-display text-2xl text-slate-950">
                {service.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionHeading
            eyebrow="How it works"
            title="A practical process that keeps your search or sale moving."
            description="We do not overcomplicate the experience. We keep it tight, decisive, and aligned with the outcome you want."
          />

          <div className="grid gap-4">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="flex gap-4 rounded-[1.5rem] border border-white/80 bg-white/85 p-5 shadow-sm backdrop-blur"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] font-display text-lg font-semibold text-white shadow-lg shadow-sky-500/20">
                  0{index + 1}
                </div>
                <div>
                  <h2 className="font-display text-xl text-slate-950">{step.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:pb-24">
        <div className="rounded-[2rem] bg-[linear-gradient(135deg,#0f172a,#1f3b7b)] px-6 py-10 text-white shadow-[0_30px_80px_rgba(31,59,123,0.18)] sm:px-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                Need a tailored plan?
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">
                We can shape the search, the listing, or the marketing around your goal.
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-deep transition hover:bg-slate-100"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}