import Link from "next/link";
import { Phone } from "lucide-react";
import { buildWhatsAppUrl, defaultOrderMessage } from "@/lib/whatsapp";
import { getPhoneDisplay, getPhoneTel } from "@/lib/site";
import { brand } from "@/lib/brand";

export function AnnouncementBar() {
  const phone = getPhoneDisplay();
  const tel = getPhoneTel();
  const wa = buildWhatsAppUrl(defaultOrderMessage);

  return (
    <div className="border-b border-white/10 bg-matte text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-3 py-2.5 text-xs sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:text-sm">
        <p className="text-balance text-center leading-snug sm:text-left">
          <span className="font-medium">New drops — lace, bundles &amp; units</span>
          <span className="mx-1.5 hidden text-white/40 sm:inline" aria-hidden>
            |
          </span>
          <span className="block sm:inline">{brand.tagline}</span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end sm:gap-3">
          <a
            href={`tel:${tel}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 transition hover:bg-white/15"
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            <span className="font-medium">{phone}</span>
            <span className="sr-only">Call now</span>
          </a>
          <Link
            href="/cart"
            className="rounded-full bg-white px-3 py-1 font-semibold text-matte transition hover:bg-white/90"
          >
            Order online
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/25 px-3 py-1 font-medium text-white transition hover:bg-white/10"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
