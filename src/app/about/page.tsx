import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { heroStats, processSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Property in Nepal blends local knowledge, premium presentation, and clear advice.",
};

const values = [
  {
    title: "Market clarity",
    description:
      "We simplify the options so clients can make confident decisions without getting lost in the noise.",
  },
  {
    title: "Presentation quality",
    description:
      "Strong visuals and polished copy make the right properties feel more compelling and easier to trust.",
  },
  {
    title: "Client momentum",
    description:
      "Fast follow-up, direct answers, and a disciplined process keep deals moving in the right direction.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-12 lg:px-8 lg:pt-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-deep/70">
            About us
          </p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-slate-950 sm:text-6xl">
            A modern real estate partner for Nepal’s next wave of buyers and sellers.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Property in Nepal exists to make real estate feel more transparent,
            more premium, and easier to move on. We pair local market knowledge
            with a clean advisory process that helps people make better decisions.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-sm backdrop-blur"
            >
              <p className="text-2xl font-semibold text-slate-950">{stat.value}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <SectionHeading
          eyebrow="How we work"
          title="Designed to keep the experience simple and the outcome stronger."
          description="Every interaction is structured to reduce friction, speed up decisions, and improve confidence."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-[1.75rem] border border-white/80 bg-white/85 p-6 shadow-sm backdrop-blur"
            >
              <h2 className="font-display text-2xl text-slate-950">{value.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionHeading
            eyebrow="Our process"
            title="A team built around discovery, curation, and closing with confidence."
            description="We do the work that keeps the shortlist relevant, the communication sharp, and the deal moving."
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
        <div className="rounded-[2rem] border border-white/80 bg-white/85 px-6 py-10 shadow-sm backdrop-blur sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-deep/70">
                Next step
              </p>
              <h2 className="mt-3 font-display text-3xl text-slate-950">
                If you want a cleaner way to buy or sell, let’s talk.
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5"
            >
              Contact the team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}