export const socialLinks = [
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

type SocialIconName = (typeof socialLinks)[number]["icon"];

export function SocialIcon({
  icon,
  className = "size-4",
}: {
  icon: SocialIconName;
  className?: string;
}) {
  if (icon === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`${className} fill-current`}>
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.8-.1-1.6-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.1H7.4V13h2.7v8h3.4Z" />
      </svg>
    );
  }

  if (icon === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`${className} fill-none stroke-current stroke-2`}
      >
        <rect width="15" height="15" x="4.5" y="4.5" rx="4" />
        <circle cx="12" cy="12" r="3.2" />
        <path d="M16.7 7.4h.01" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`${className} fill-current`}>
        <path d="M15.7 3c.3 2.2 1.6 3.5 3.8 3.7v3.1a7.2 7.2 0 0 1-3.7-1.1v5.7c0 3.8-2.3 6.6-5.9 6.6A5.4 5.4 0 0 1 4.5 15.6c0-3.5 3-6 6.4-5.3v3.3c-1.5-.5-3.1.5-3.1 2a2.1 2.1 0 0 0 2.1 2.1c1.6 0 2.5-1 2.5-2.9V3h3.3Z" />
      </svg>
    );
  }

  if (icon === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`${className} fill-current`}>
        <path d="M21.4 7.2a3 3 0 0 0-2.1-2.1C17.4 4.6 12 4.6 12 4.6s-5.4 0-7.3.5a3 3 0 0 0-2.1 2.1A31.5 31.5 0 0 0 2.1 12c0 1.6.1 3.2.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 7.3.5 7.3.5s5.4 0 7.3-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`${className} fill-current`}>
      <path d="M6.9 8.8H3.7V20h3.2V8.8ZM5.3 7.3a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8ZM20.3 13.9c0-3-1.6-5-4.3-5-1.6 0-2.7.8-3.2 1.7h-.1V8.8H9.6V20h3.2v-5.6c0-1.5.3-2.9 2.1-2.9 1.7 0 1.8 1.6 1.8 3V20h3.2v-6.1h.4Z" />
    </svg>
  );
}

export function FooterSocialLinks() {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {socialLinks.map((item) => (
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
  );
}

export function FloatingSocialRail() {
  return (
    <aside
      aria-label="Social media links"
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 rounded-[1.75rem] border border-white/55 bg-white/16 p-1.5 shadow-[0_20px_48px_rgba(15,23,42,0.16)] ring-1 ring-white/30 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/14 lg:block"
    >
      <div className="pointer-events-none absolute inset-x-2 top-1 h-8 rounded-full bg-linear-to-b from-white/55 to-transparent blur-md" />
      <div className="relative flex flex-col gap-2">
        {socialLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="inline-flex size-11 items-center justify-center rounded-2xl border border-white/25 bg-white/14 text-slate-700/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.42)] transition duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/28 hover:text-brand-deep hover:shadow-[0_12px_24px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,0.56)] focus-visible:-translate-y-0.5 focus-visible:border-white/55 focus-visible:bg-white/30 focus-visible:text-brand-deep focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/30"
          >
            <SocialIcon icon={item.icon} className="size-5" />
          </a>
        ))}
      </div>
    </aside>
  );
}
