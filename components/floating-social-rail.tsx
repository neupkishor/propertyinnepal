import { SocialIcon, socialLinks } from "@/components/social-links";

export function FloatingSocialRail() {
  return (
    <aside
      aria-label="Social media links"
      className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 rounded-r-[1.5rem] border border-l-0 border-white/55 bg-white/16 p-1 shadow-[0_18px_42px_rgba(15,23,42,0.14)] ring-1 ring-white/25 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/14 lg:block"
    >
      <div className="pointer-events-none absolute inset-x-2 top-1 h-6 rounded-full bg-linear-to-b from-white/50 to-transparent blur-md" />
      <div className="relative flex flex-col gap-1.5">
        {socialLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="inline-flex size-10 items-center justify-center rounded-r-[1.1rem] rounded-l-[0.95rem] border border-white/25 bg-white/12 text-slate-700/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.42)] transition duration-200 hover:border-white/50 hover:bg-white/26 hover:text-brand-deep hover:shadow-[0_10px_22px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.56)] focus-visible:border-white/55 focus-visible:bg-white/30 focus-visible:text-brand-deep focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/30"
          >
            <SocialIcon icon={item.icon} className="size-4.5" />
          </a>
        ))}
      </div>
    </aside>
  );
}
