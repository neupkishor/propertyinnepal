import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the dedicated real estate professionals behind Property in Nepal.",
};

type SocialLinkKey = "facebook" | "linkedin" | "instagram" | "tiktok" | "youtube";

type TeamMember = {
  name: string;
  role: string;
  id: string;
  image: string;
  socials: Partial<Record<SocialLinkKey, string>>;
};

const teamMembers: readonly TeamMember[] = [
  {
    name: "Ramesh Barudi",
    role: "CEO / Founder",
    id: "PIN901",
    image:
      "https://api.propertyinnepal.com.np/storage/4311/dw9B8TrvPBdJWKMdRRkV0GfEgtXMt5-metaV2hhdHNBcHAgSW1hZ2UgMjAyNS0wOC0xNyBhdCAxNi4wOS40NF84NGFhMmRmMS5qcGc=-.jpg",
    socials: {
      facebook: "https://www.facebook.com/share/15Jb8Tmu9C/?mibextid=wwXIfr",
      linkedin: "https://www.facebook.com/share/15Jb8Tmu9C/?mibextid=wwXIfr",
      instagram:
        "https://www.instagram.com/rameshbarudiofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      tiktok: "https://www.tiktok.com/@rameshbarudi?is_from_webapp=1&sender_device=pc",
      youtube: "https://youtu.be/u_madL0gaRo?si=or-KB6y-5Fh09v5c",
    },
  },
  {
    name: "Sapana Seni",
    role: "Director",
    id: "PIN902",
    image:
      "https://api.propertyinnepal.com.np/storage/6518/oAlCTkEL0Joeo93LNKPjq5OTCymVvO-metaMTAwMDA4NTc0OS5wbmc=-.png",
    socials: {},
  },
  {
    name: "Arjun B.K",
    role: "Senior Realtor",
    id: "PIN903",
    image:
      "https://api.propertyinnepal.com.np/storage/6463/4MnhmTPgCnX9CK7NoxfxjSCOAVOdEz-metaMTAwMDA4NDQ4Mi5wbmc=-.png",
    socials: {},
  },
  {
    name: "Deepti Neupane",
    role: "Sales / Operation Manager",
    id: "PIN904",
    image:
      "https://api.propertyinnepal.com.np/storage/6377/QRCUgJOResQMrBrsAAPF84VbWjnqlS-metaMTAwMDA4MzUxNC5qcGc=-.jpg",
    socials: {},
  },
  {
    name: "Sujan Bhandari",
    role: "Digital Marketing",
    id: "PIN905",
    image:
      "https://api.propertyinnepal.com.np/storage/6470/uRN7TUuYlPrXBwz4s1Ygd6SQGFwIoo-metaZmlsZV8wMDAwMDAwMGRhOTg3MjA4YTMzYTUxYWEwZDgxZWI3ZC1yZW1vdmViZy1wcmV2aWV3LnBuZw==-.png",
    socials: {},
  },
  {
    name: "Mausam Thapa",
    role: "Finance | Account Department",
    id: "912",
    image:
      "https://api.propertyinnepal.com.np/storage/6517/3m1Aqlsvx2uG08xgWutdFA49dnsLOv-metaMTAwMDA4NTc0OC5wbmc=-.png",
    socials: {},
  },
  {
    name: "Bikram Kunwar",
    role: "Realtor",
    id: "PIN906",
    image:
      "https://api.propertyinnepal.com.np/storage/2558/omOHqDpvFYgpfnm8bwWqoJxSzdeLJn-metaQklLUkFNIFNJUi5qcGc=-.jpg",
    socials: {},
  },
  {
    name: "Birju B.K",
    role: "Property Consultant - Lalitpur",
    id: "PIN907",
    image:
      "https://api.propertyinnepal.com.np/storage/2557/53kQhAu54cOvDMkQIQIQPtkt6JhZ2R-metaYmlyanUgc2lyLkpQRw==-.jpg",
    socials: {},
  },
  {
    name: "Pushkar Purkuti",
    role: "Realtor",
    id: "PIN908",
    image:
      "https://api.propertyinnepal.com.np/storage/2553/u1nEBZoZzIivLteW0x9zPpamMd684l-metaUFVTS0FSIC5qcGc=-.jpg",
    socials: {},
  },
  {
    name: "Samir Lama",
    role: "Videographer / Editor",
    id: "910",
    image:
      "https://api.propertyinnepal.com.np/storage/6417/slLamdi3ISoWVzBTEE5heEv2iRQT3f-metaMTAwMDA4Mzk1My5wbmc=-.png",
    socials: {},
  },
  {
    name: "Saru Lama",
    role: "Video Host",
    id: "911",
    image:
      "https://api.propertyinnepal.com.np/storage/6418/H5I7UzF1rEg121r7LqZLmJlI584bT0-metaMTAwMDA4Mzk1Ny5wbmc=-.png",
    socials: {},
  },
] as const;

export default function TeamPage() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-6 pb-12 pt-12 lg:px-8 lg:pt-16">
        <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-10 shadow-sm sm:px-8 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-deep/75">
            Our Team
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            Meet the people behind our success
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Meet our dedicated team of real estate professionals who are committed
            to providing you with exceptional service.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-12 lg:px-8 lg:pb-16">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {teamMembers.map((member) => (
            <article
              key={`${member.name}-${member.id}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <img
                src={member.image}
                alt={member.name}
                width={640}
                height={640}
                loading="lazy"
                decoding="async"
                className="mb-4 aspect-square w-full rounded-xl border border-slate-200 bg-slate-100 object-cover object-top transition duration-300 group-hover:scale-[1.02]"
              />
              <h2 className="mt-3 text-xl font-semibold text-slate-950 transition-colors duration-200 group-hover:text-brand-deep">
                {member.name}
              </h2>
              <p className="mt-2 text-sm font-medium text-slate-600">
                {member.role}
              </p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                  ID: {member.id}
                </div>
                {Object.entries(member.socials).length > 0 ? (
                  <div className="flex flex-wrap justify-end gap-2">
                    {member.socials.facebook ? (
                      <a
                        href={member.socials.facebook}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} on Facebook`}
                        className="inline-flex size-8 items-center justify-center rounded-md bg-slate-100 text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
                      >
                        <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                          <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.6-1.6h1.7V3.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V10H8v3h2.4v8h3.1Z" />
                        </svg>
                      </a>
                    ) : null}
                    {member.socials.linkedin ? (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        className="inline-flex size-8 items-center justify-center rounded-md bg-slate-100 text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
                      >
                        <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                          <path d="M6.9 8.3a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6ZM5.3 20V9.7h3.2V20H5.3Zm5 0V9.7h3.1v1.4h.1c.4-.8 1.5-1.7 3.2-1.7 3.4 0 4 2.2 4 5.2V20h-3.2v-4.7c0-1.1 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5V20h-3.2Z" />
                        </svg>
                      </a>
                    ) : null}
                    {member.socials.instagram ? (
                      <a
                        href={member.socials.instagram}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} on Instagram`}
                        className="inline-flex size-8 items-center justify-center rounded-md bg-slate-100 text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
                      >
                        <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                          <path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3Zm0 7.8A3.1 3.1 0 1 1 12 9a3.1 3.1 0 0 1 0 6.1Zm6-8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Zm3 1.1c-.1-1.7-.4-3.2-1.7-4.5C18 2.3 16.6 2 14.9 2h-5.8C7.4 2 6 2.3 4.7 3.7 3.3 5 3 6.4 3 8.2v7.6c0 1.8.3 3.2 1.7 4.5C6 21.7 7.4 22 9.1 22h5.8c1.7 0 3.1-.3 4.4-1.7 1.3-1.3 1.6-2.7 1.7-4.5V8.2ZM19 17c-.1.5-.3 1-.7 1.4-.4.4-.9.6-1.4.7-1 .2-3.4.2-4.9.2s-3.9 0-4.9-.2a2.8 2.8 0 0 1-1.4-.7A2.8 2.8 0 0 1 5 17c-.2-1-.2-3.4-.2-4.9s0-3.9.2-4.9c.1-.5.3-1 .7-1.4.4-.4.9-.6 1.4-.7 1-.2 3.4-.2 4.9-.2s3.9 0 4.9.2c.5.1 1 .3 1.4.7.4.4.6.9.7 1.4.2 1 .2 3.4.2 4.9s0 3.9-.2 4.9Z" />
                        </svg>
                      </a>
                    ) : null}
                    {member.socials.tiktok ? (
                      <a
                        href={member.socials.tiktok}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} on TikTok`}
                        className="inline-flex size-8 items-center justify-center rounded-md bg-slate-100 text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
                      >
                        <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                          <path d="M14.7 3h2.7c.2 1.4 1 2.6 2.3 3.3.8.5 1.7.7 2.6.7V10c-1.7 0-3.3-.5-4.7-1.4v6.4a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v2.8a2.7 2.7 0 0 0-.9-.1 2.8 2.8 0 1 0 2.8 2.8V3Z" />
                        </svg>
                      </a>
                    ) : null}
                    {member.socials.youtube ? (
                      <a
                        href={member.socials.youtube}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} on YouTube`}
                        className="inline-flex size-8 items-center justify-center rounded-md bg-slate-100 text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
                      >
                        <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                          <path d="M23 8.5a4 4 0 0 0-2.8-2.8C17.8 5 12 5 12 5s-5.8 0-8.2.7A4 4 0 0 0 1 8.5 41.5 41.5 0 0 0 1 15.5a4 4 0 0 0 2.8 2.8c2.4.7 8.2.7 8.2.7s5.8 0 8.2-.7a4 4 0 0 0 2.8-2.8 41.5 41.5 0 0 0 0-7ZM10 14.9V9.1L15.2 12 10 14.9Z" />
                        </svg>
                      </a>
                    ) : null}
                  </div>
                ) : (
                  <div />
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-16 lg:px-8 lg:pb-24">
        <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff,#f5f9ff)] px-6 py-10 shadow-sm sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-deep/75">
            Join Our Team
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
            Build your career with a real estate team that’s growing fast in Lalitpur.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            We are always open to meeting driven professionals in sales, marketing,
            operations, and media who want to do meaningful work in real estate.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#00B4EA,#1F3B7B)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5"
            >
              Apply via contact
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Learn about us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
