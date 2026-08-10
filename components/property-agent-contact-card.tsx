"use client";

import { useState } from "react";
import { SocialIcon, socialLinks } from "@/components/social-links";

type PropertyAgentContactCardProps = {
  agentImageSrc?: string | null;
  agentName: string;
  agentRole?: string | null;
  email: string;
  phone: string;
};

type TabId = "visit" | "inquiry";

const tabs: { id: TabId; label: string }[] = [
  { id: "visit", label: "Request Visit" },
  { id: "inquiry", label: "Make Inquiry" },
];

export function PropertyAgentContactCard({
  agentImageSrc,
  agentName,
  agentRole,
  email,
  phone,
}: PropertyAgentContactCardProps) {
  const [activeTab, setActiveTab] = useState<TabId>("visit");
  const [visitPhone, setVisitPhone] = useState("");
  const [visitEmail, setVisitEmail] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const socialItems = socialLinks.slice(0, 4);
  const visitNeedsContact = !visitPhone.trim() && !visitEmail.trim();
  const inquiryNeedsContact = !inquiryPhone.trim() && !inquiryEmail.trim();

  return (
    <div className="overflow-hidden rounded-[1.9rem] border border-slate-200/80 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
      <div className="bg-[linear-gradient(135deg,rgba(0,180,234,0.12),rgba(31,59,123,0.08))] px-6 pb-5 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-deep/80">
          Listed by
        </p>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex size-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/80 bg-white shadow-sm">
            {agentImageSrc ? (
              <img
                src={agentImageSrc}
                alt={agentName}
                width={160}
                height={160}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <span className="text-xl font-semibold text-brand-deep">
                {agentName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-slate-950">{agentName}</h2>
            <p className="mt-1 text-sm text-slate-600">{agentRole || "Property Advisor"}</p>
          </div>
        </div>

        <div className="mt-5 space-y-2 text-sm text-slate-700">
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 transition hover:text-brand-deep"
          >
            <span
              aria-hidden="true"
              className="inline-flex size-8 items-center justify-center rounded-full bg-white text-brand-deep"
            >
              <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-2">
                <path
                  d="M5 4h3l2 5-2 1.5a14 14 0 0 0 5.5 5.5L15 14l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3 6.2 2 2 0 0 1 5 4Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {phone}
          </a>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 break-all transition hover:text-brand-deep"
          >
            <span
              aria-hidden="true"
              className="inline-flex size-8 items-center justify-center rounded-full bg-white text-brand-deep"
            >
              <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-2">
                <path
                  d="M4 6h16v12H4z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="m4 8 8 6 8-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {email}
          </a>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {socialItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/70 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-200 hover:text-brand-deep focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
            >
              <SocialIcon icon={item.icon} />
            </a>
          ))}
        </div>
      </div>

      <div className="px-4 pb-5 pt-4 sm:px-6">
        <div className="grid grid-cols-2 rounded-full bg-slate-100 p-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-white text-brand-deep shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "visit" ? (
          <form
            className="mt-5 space-y-3"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">When</span>
              <input
                type="datetime-local"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Name</span>
              <input
                type="text"
                placeholder="Your full name"
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Contact number</span>
              <input
                type="tel"
                placeholder="Phone number"
                value={visitPhone}
                onChange={(event) => setVisitPhone(event.target.value)}
                required={visitNeedsContact}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                placeholder="Email address"
                value={visitEmail}
                onChange={(event) => setVisitEmail(event.target.value)}
                required={visitNeedsContact}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Message</span>
              <textarea
                rows={3}
                placeholder="Add any visit notes"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              />
            </label>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5"
            >
              Submit
            </button>
          </form>
        ) : (
          <form
            className="mt-5 space-y-3"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Name</span>
              <input
                type="text"
                placeholder="Your full name"
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Contact number</span>
              <input
                type="tel"
                placeholder="Phone number"
                value={inquiryPhone}
                onChange={(event) => setInquiryPhone(event.target.value)}
                required={inquiryNeedsContact}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                placeholder="Email address"
                value={inquiryEmail}
                onChange={(event) => setInquiryEmail(event.target.value)}
                required={inquiryNeedsContact}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Message</span>
              <textarea
                rows={4}
                placeholder="Tell us what you'd like to know"
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              />
            </label>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
