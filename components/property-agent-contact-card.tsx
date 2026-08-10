"use client";

import { useState } from "react";
import { SocialIcon, socialLinks } from "@/components/social-links";

type PropertyAgentContactCardProps = {
  agentImageSrc?: string | null;
  agentName: string;
  agentRole?: string | null;
  email: string;
  phone: string;
  display?: "all" | "mobile" | "desktop";
  mobileClassName?: string;
};

type TabId = "visit" | "inquiry";

const tabs: { id: TabId; label: string }[] = [
  { id: "visit", label: "Request Visit" },
  { id: "inquiry", label: "Make Inquiry" },
];

const weekdayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getDateWithOffset(offset: number) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + offset);
  return date;
}

function toDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatMonthLabel(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function getCalendarDates(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstCalendarDay = new Date(firstDay);
  firstCalendarDay.setDate(firstDay.getDate() - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(firstCalendarDay);
    date.setDate(firstCalendarDay.getDate() + index);
    return date;
  });
}

export function PropertyAgentContactCard({
  agentImageSrc,
  agentName,
  agentRole,
  email,
  phone,
  display = "all",
  mobileClassName,
}: PropertyAgentContactCardProps) {
  const [activeTab, setActiveTab] = useState<TabId>("visit");
  const [mobileActiveTab, setMobileActiveTab] = useState<TabId | null>(null);
  const [visitPhone, setVisitPhone] = useState("");
  const [visitEmail, setVisitEmail] = useState("");
  const [selectedVisitDate, setSelectedVisitDate] = useState(() => toDateValue(getDateWithOffset(0)));
  const [calendarMonth, setCalendarMonth] = useState(() => getDateWithOffset(0));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const socialItems = socialLinks.slice(0, 4);
  const visitNeedsContact = !visitPhone.trim() && !visitEmail.trim();
  const inquiryNeedsContact = !inquiryPhone.trim() && !inquiryEmail.trim();
  const quickVisitDates = [
    { label: "Today", date: getDateWithOffset(0) },
    { label: "", date: getDateWithOffset(1) },
    { label: "", date: getDateWithOffset(2) },
  ];
  const calendarDates = getCalendarDates(calendarMonth);
  const showMobile = display !== "desktop";
  const showDesktop = display !== "mobile";
  const mobileSectionClassName = ["lg:hidden", mobileClassName].filter(Boolean).join(" ");

  const selectVisitDate = (date: Date) => {
    setSelectedVisitDate(toDateValue(date));
    setCalendarMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    setIsCalendarOpen(false);
  };

  const changeCalendarMonth = (offset: number) => {
    setCalendarMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  };

  return (
    <>
      {showMobile ? (
        <section className={mobileSectionClassName}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-deep/75">
            Listed by:
          </p>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {agentImageSrc ? (
            <img
              src={agentImageSrc}
              alt={agentName}
              width={112}
              height={112}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
          ) : (
            <span className="text-lg font-semibold text-brand-deep">
              {agentName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-slate-950">{agentName}</h2>
          <p className="mt-0.5 text-sm text-slate-600">{agentRole || "Property Advisor"}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-700">
        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          className="flex cursor-pointer items-center gap-2 transition hover:text-brand-deep"
        >
          <span
            aria-hidden="true"
            className="inline-flex size-7 items-center justify-center rounded-full bg-sky-50 text-brand-deep"
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
          className="flex cursor-pointer items-center gap-2 break-all transition hover:text-brand-deep"
        >
          <span
            aria-hidden="true"
            className="inline-flex size-7 items-center justify-center rounded-full bg-sky-50 text-brand-deep"
          >
            <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-2">
              <path d="M4 6h16v12H4z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="m4 8 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          {email}
        </a>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {socialItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-200 hover:text-brand-deep focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
          >
            <SocialIcon icon={item.icon} />
          </a>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        {tabs.map((tab) => {
          const isActive = mobileActiveTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMobileActiveTab(tab.id)}
              className={`cursor-pointer rounded-full px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100 ${
                isActive
                  ? "bg-brand-deep text-white shadow-sm"
                  : "border border-slate-200 bg-white text-brand-deep hover:bg-sky-50"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {mobileActiveTab === "visit" ? (
        <form className="mt-5 space-y-3" onSubmit={(event) => event.preventDefault()}>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">When</span>
            <input type="hidden" name="visitDate" value={selectedVisitDate} />
            <div className="grid grid-cols-[repeat(3,minmax(0,1fr))_auto] gap-2">
              {quickVisitDates.map((item) => {
                const value = toDateValue(item.date);
                const isSelected = selectedVisitDate === value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => selectVisitDate(item.date)}
                    aria-label={item.label ? `Choose ${item.label}` : `Choose ${value}`}
                    className={`flex min-h-14 cursor-pointer min-w-0 flex-col items-center justify-center rounded-2xl border px-2.5 py-1.5 text-center transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100 ${
                      isSelected
                        ? "border-brand-deep/30 bg-sky-50 text-brand-deep"
                        : "border-slate-200 bg-white text-slate-700 hover:border-sky-200"
                    }`}
                  >
                    <span className="block text-xl font-semibold leading-none">
                      {item.date.getDate()}
                    </span>
                    {item.label ? (
                      <span className="mt-1 block text-[11px] font-semibold leading-none text-slate-500">
                        {item.label}
                      </span>
                    ) : null}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setIsCalendarOpen((current) => !current)}
                aria-label="Choose custom visit date"
                aria-expanded={isCalendarOpen}
                className="flex min-h-14 cursor-pointer w-11 shrink-0 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-2.5 py-1.5 text-xl font-semibold leading-none text-brand-deep transition hover:border-sky-200 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100"
              >
                +
              </button>
            </div>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Name</span>
            <input
              type="text"
              placeholder="Your full name"
              required
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
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
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
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
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Message</span>
            <textarea
              rows={2}
              placeholder="Add any visit notes"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
            />
          </label>
          <button
            type="submit"
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5"
          >
            Submit
          </button>
        </form>
      ) : null}

      {mobileActiveTab === "inquiry" ? (
        <form className="mt-5 space-y-3" onSubmit={(event) => event.preventDefault()}>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Name</span>
            <input
              type="text"
              placeholder="Your full name"
              required
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
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
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
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
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Message</span>
            <textarea
              rows={3}
              placeholder="Tell us what you'd like to know"
              required
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
            />
          </label>
          <button
            type="submit"
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5"
          >
            Submit
          </button>
        </form>
      ) : null}

      {isCalendarOpen ? (
        <div
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-slate-950/45 px-5 py-8 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Choose visit date"
          onClick={() => setIsCalendarOpen(false)}
        >
          <div
            className="w-full max-w-md cursor-default rounded-[1.5rem] bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.28)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">Visit date</h2>
                <p className="mt-1 text-sm text-slate-500">Choose when you want to visit.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCalendarOpen(false)}
                aria-label="Close calendar popup"
                className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-5 fill-none stroke-current stroke-2"
                >
                  <path d="M6 6 18 18" strokeLinecap="round" />
                  <path d="M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="mt-5 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => changeCalendarMonth(-1)}
                aria-label="Previous month"
                className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-50"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-4 fill-none stroke-current stroke-2"
                >
                  <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="text-sm font-semibold text-slate-950">
                {formatMonthLabel(calendarMonth)}
              </p>
              <button
                type="button"
                onClick={() => changeCalendarMonth(1)}
                aria-label="Next month"
                className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-50"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-4 fill-none stroke-current stroke-2"
                >
                  <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-slate-500">
              {weekdayLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-7 gap-1">
              {calendarDates.map((date) => {
                const value = toDateValue(date);
                const isCurrentMonth = date.getMonth() === calendarMonth.getMonth();
                const isSelected = selectedVisitDate === value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => selectVisitDate(date)}
                    className={`aspect-square cursor-pointer rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100 ${
                      isSelected
                        ? "bg-brand-deep text-white"
                        : isCurrentMonth
                          ? "text-slate-800 hover:bg-sky-50"
                          : "text-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
        </section>
      ) : null}

      {showDesktop ? (
        <div className="hidden overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:block">
      <div className="bg-[linear-gradient(135deg,rgba(0,180,234,0.12),rgba(31,59,123,0.08))] px-5 pb-4 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-deep/80">
          Listed by
        </p>

        <div className="mt-3 flex items-center gap-3">
          <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/80 bg-white shadow-sm">
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
            <h2 className="text-lg font-semibold text-slate-950">{agentName}</h2>
            <p className="mt-0.5 text-sm text-slate-600">{agentRole || "Property Advisor"}</p>
          </div>
        </div>

        <div className="mt-4 space-y-1.5 text-sm text-slate-700">
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="flex cursor-pointer items-center gap-2 transition hover:text-brand-deep"
          >
            <span
              aria-hidden="true"
              className="inline-flex size-7 items-center justify-center rounded-full bg-white text-brand-deep"
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
            className="flex cursor-pointer items-center gap-2 break-all transition hover:text-brand-deep"
          >
            <span
              aria-hidden="true"
              className="inline-flex size-7 items-center justify-center rounded-full bg-white text-brand-deep"
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

        <div className="mt-4 flex flex-wrap gap-2">
          {socialItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-white/70 bg-white text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-200 hover:text-brand-deep focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
            >
              <SocialIcon icon={item.icon} />
            </a>
          ))}
        </div>
      </div>

      <div className="px-4 pb-4 pt-4 sm:px-5">
        <div className="grid grid-cols-2 rounded-full bg-slate-100 p-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
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
            className="mt-4 space-y-2.5"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">When</span>
              <input type="hidden" name="visitDate" value={selectedVisitDate} />
              <div className="relative">
                <div className="grid grid-cols-[repeat(3,minmax(0,1fr))_auto] gap-2">
                  {quickVisitDates.map((item) => {
                    const value = toDateValue(item.date);
                    const isSelected = selectedVisitDate === value;

                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => selectVisitDate(item.date)}
                        aria-label={item.label ? `Choose ${item.label}` : `Choose ${value}`}
                        className={`flex min-h-14 cursor-pointer min-w-0 flex-col items-center justify-center rounded-2xl border px-2.5 py-1.5 text-center transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100 ${
                          isSelected
                            ? "border-brand-deep/30 bg-sky-50 text-brand-deep"
                            : "border-slate-200 bg-white text-slate-700 hover:border-sky-200"
                        }`}
                      >
                        <span className="block text-xl font-semibold leading-none">
                          {item.date.getDate()}
                        </span>
                        {item.label ? (
                          <span className="mt-1 block text-[11px] font-semibold leading-none text-slate-500">
                            {item.label}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setIsCalendarOpen((current) => !current)}
                    aria-label="Choose custom visit date"
                    aria-expanded={isCalendarOpen}
                    className="flex min-h-14 cursor-pointer w-11 shrink-0 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-2.5 py-1.5 text-xl font-semibold leading-none text-brand-deep transition hover:border-sky-200 hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100"
                  >
                    +
                  </button>
                </div>

                {isCalendarOpen ? (
                  <div
                    className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-slate-950/45 px-5 py-8 backdrop-blur-md"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Choose visit date"
                    onClick={() => setIsCalendarOpen(false)}
                  >
                    <div
                      className="w-full max-w-md cursor-default rounded-[1.5rem] bg-white p-5 shadow-[0_30px_80px_rgba(15,23,42,0.28)]"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-semibold text-slate-950">Visit date</h2>
                          <p className="mt-1 text-sm text-slate-500">Choose when you want to visit.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsCalendarOpen(false)}
                          aria-label="Close calendar popup"
                          className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="size-5 fill-none stroke-current stroke-2"
                          >
                            <path d="M6 6 18 18" strokeLinecap="round" />
                            <path d="M18 6 6 18" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => changeCalendarMonth(-1)}
                          aria-label="Previous month"
                          className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-50"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="size-4 fill-none stroke-current stroke-2"
                          >
                            <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <p className="text-sm font-semibold text-slate-950">
                          {formatMonthLabel(calendarMonth)}
                        </p>
                        <button
                          type="button"
                          onClick={() => changeCalendarMonth(1)}
                          aria-label="Next month"
                          className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-50"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="size-4 fill-none stroke-current stroke-2"
                          >
                            <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-slate-500">
                        {weekdayLabels.map((label) => (
                          <span key={label}>{label}</span>
                        ))}
                      </div>

                      <div className="mt-2 grid grid-cols-7 gap-1">
                        {calendarDates.map((date) => {
                          const value = toDateValue(date);
                          const isCurrentMonth = date.getMonth() === calendarMonth.getMonth();
                          const isSelected = selectedVisitDate === value;

                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => selectVisitDate(date)}
                              className={`aspect-square cursor-pointer rounded-full text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100 ${
                                isSelected
                                  ? "bg-brand-deep text-white"
                                  : isCurrentMonth
                                    ? "text-slate-800 hover:bg-sky-50"
                                    : "text-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              {date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Name</span>
              <input
                type="text"
                placeholder="Your full name"
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
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
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
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
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Message</span>
              <textarea
                rows={2}
                placeholder="Add any visit notes"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              />
            </label>
            <button
              type="submit"
              className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5"
            >
              Submit
            </button>
          </form>
        ) : (
          <form
            className="mt-4 space-y-2.5"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Name</span>
              <input
                type="text"
                placeholder="Your full name"
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
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
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
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
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Message</span>
              <textarea
                rows={3}
                placeholder="Tell us what you'd like to know"
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              />
            </label>
            <button
              type="submit"
              className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5"
            >
              Submit
            </button>
          </form>
        )}
      </div>
        </div>
      ) : null}
    </>
  );
}
