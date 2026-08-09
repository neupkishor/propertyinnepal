"use client";

import { useEffect, useState } from "react";

type PropertyShareButtonProps = {
  title: string;
};

export function PropertyShareButton({ title }: PropertyShareButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied">("idle");
  const [isOpen, setIsOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setShareUrl(window.location.href);
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (status !== "copied") return;

    const timeoutId = window.setTimeout(() => setStatus("idle"), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [status]);

  async function handleCopy() {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setStatus("copied");
    } catch {
      window.prompt("Copy property link", shareUrl);
    }
  }

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      label: "Facebook",
      className: "bg-[#1877F2] text-white",
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
          <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.8-.1-1.6-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.1H7.4V13h2.7v8h3.4Z" />
        </svg>
      ),
    },
    {
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      label: "Twitter",
      className: "bg-[#1DA1F2] text-white",
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
          <path d="M21.5 6.5c-.7.3-1.4.5-2.2.6a3.8 3.8 0 0 0 1.7-2.1 7.6 7.6 0 0 1-2.4.9 3.8 3.8 0 0 0-6.4 3.5 10.7 10.7 0 0 1-7.8-4 3.8 3.8 0 0 0 1.2 5.1c-.6 0-1.2-.2-1.7-.5 0 1.8 1.3 3.4 3.1 3.7-.6.2-1.2.2-1.8.1a3.8 3.8 0 0 0 3.5 2.6A7.7 7.7 0 0 1 3 18.6a10.8 10.8 0 0 0 5.8 1.7c6.9 0 10.8-5.8 10.8-10.8v-.5a7.8 7.8 0 0 0 1.9-2Z" />
        </svg>
      ),
    },
    {
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`,
      label: "WhatsApp",
      className: "bg-[#25D366] text-white",
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
          <path d="M20 11.8A8 8 0 0 0 6.4 6.1a7.9 7.9 0 0 0-2.3 5.7c0 1.4.4 2.8 1 4L4 20l4.4-1.1a8 8 0 0 0 3.6.8h.1A8 8 0 0 0 20 11.8Zm-8 6.5a6.6 6.6 0 0 1-3.4-.9l-.2-.1-2.6.7.7-2.5-.2-.3a6.6 6.6 0 1 1 5.7 3.1Zm3.6-4.9c-.2-.1-1.3-.7-1.5-.8-.2-.1-.4-.1-.6.1l-.4.5c-.2.2-.3.2-.6.1a5.5 5.5 0 0 1-2.7-2.4c-.2-.3 0-.4.1-.6l.3-.4.2-.5-.1-.5c-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.2.2-.9.9-.9 2.1s.9 2.3 1 2.5c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.5 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.3-.6 1.5-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.5-.3Z" />
        </svg>
      ),
    },
    {
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      label: "Reddit",
      className: "bg-[#FF4500] text-white",
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
          <path d="M19 11.6c0-.9-.7-1.6-1.6-1.6-.4 0-.8.2-1.1.4-1.1-.7-2.6-1.2-4.3-1.2-.1-.7-.4-2.1-.4-2.1l1.8.4a1.5 1.5 0 1 0 .2-.9l-2.3-.5a.5.5 0 0 0-.6.4l.5 2.7c-1.7 0-3.2.5-4.4 1.2A1.6 1.6 0 1 0 5 11.6c0 .3.1.6.3.9 0 2.4 2.8 4.3 6.3 4.3 3.5 0 6.3-1.9 6.3-4.3.1-.3.1-.6.1-.9Zm-10.3 1.7a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm5.9 2.4c-.7.7-1.8 1-3 1s-2.3-.3-3-1a.4.4 0 1 1 .6-.6c.5.5 1.3.8 2.4.8 1 0 1.9-.3 2.4-.8a.4.4 0 1 1 .6.6Zm-.2-1.4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
        </svg>
      ),
    },
    {
      href: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${title}\n\n${shareUrl}`)}`,
      label: "Email",
      className: "bg-[#EA4335] text-white",
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
          <path d="M3 6.8A1.8 1.8 0 0 1 4.8 5h14.4A1.8 1.8 0 0 1 21 6.8v10.4a1.8 1.8 0 0 1-1.8 1.8H4.8A1.8 1.8 0 0 1 3 17.2V6.8Zm1.6.3v.3l7.4 5.5 7.4-5.5v-.3H4.6Zm14.8 10.3V9.4l-6.9 5.1a.8.8 0 0 1-1 0L4.6 9.4v8.1h14.8Z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-9 w-9 translate-y-[-0.08em] cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-sky-300 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
        aria-label="Share property"
        title="Share property"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4.5 w-4.5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 10.7 15.4 6.3" />
          <path d="M8.6 13.3 15.4 17.7" />
        </svg>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-5 py-8 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Share property"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-3xl rounded-[1.5rem] bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.28)] sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-semibold text-slate-900">Share</h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                aria-label="Close share popup"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M6 6 18 18" />
                  <path d="M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              {shareLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={`inline-flex h-13 w-13 items-center justify-center rounded-full shadow-sm transition hover:scale-105 ${link.className}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            <div className="mt-8 flex overflow-hidden rounded-[1.1rem] border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.14)]">
              <div className="min-w-0 flex-1 px-5 py-4 text-base text-slate-800">
                <p className="truncate">{shareUrl}</p>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 cursor-pointer bg-sky-500 px-5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-sky-600"
              >
                {status === "copied" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
