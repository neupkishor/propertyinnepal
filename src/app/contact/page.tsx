import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Property in Nepal for buying, selling, and investment guidance.",
};

const contactPoints = [
  {
    label: "Email",
    value: "hello@propertyinnepal.com",
    href: "mailto:hello@propertyinnepal.com",
  },
  {
    label: "Phone",
    value: "+977-9851221475",
    href: "tel:+9779851221475",
  },
  {
    label: "Location",
    value: "Kathmandu Valley, Nepal",
    href: "#",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-12 lg:px-8 lg:pt-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-deep/70">
            Contact
          </p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-slate-950 sm:text-6xl">
            Tell us what you want to buy, sell, or invest in.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Share your timeline and goals, and we will come back with a sharper
            next step. Serious inquiries get a serious response.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-12">
        <div className="grid gap-4">
          {contactPoints.map((point) => (
            <a
              key={point.label}
              href={point.href}
              className="rounded-[1.75rem] border border-white/80 bg-white/85 p-6 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-deep/70">
                {point.label}
              </p>
              <p className="mt-3 font-display text-2xl text-slate-950">
                {point.value}
              </p>
            </a>
          ))}
        </div>

        <div className="rounded-[1.75rem] border border-white/80 bg-white/85 p-6 shadow-sm backdrop-blur sm:p-8">
          <SectionHeading
            eyebrow="Send an inquiry"
            title="We will review the brief and respond with a clear next step."
            description="Use the form to share your budget, timeline, and the kind of property you want to discuss."
          />

          <form className="mt-10 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Full name
                <input
                  type="text"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-brand focus:ring-4 focus:ring-sky-100"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Email address
                <input
                  type="email"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-brand focus:ring-4 focus:ring-sky-100"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Budget
                <input
                  type="text"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-brand focus:ring-4 focus:ring-sky-100"
                  placeholder="Rs 1.5 Cr - Rs 3 Cr"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Timeline
                <input
                  type="text"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-brand focus:ring-4 focus:ring-sky-100"
                  placeholder="This month, this quarter, etc."
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              What are you looking for?
              <textarea
                rows={6}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-brand focus:ring-4 focus:ring-sky-100"
                placeholder="Tell us the location, property type, and anything else we should know."
              />
            </label>

            <button
              type="button"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5"
            >
              Request a callback
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
