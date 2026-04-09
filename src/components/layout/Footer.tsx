import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  getPhoneDisplay,
  getPhoneTel,
  getMapEmbedUrl,
  getBusinessAddress,
} from "@/lib/site";
import { buildWhatsAppUrl, defaultOrderMessage } from "@/lib/whatsapp";
import { brand } from "@/lib/brand";

const categories = [
  "Wigs & units",
  "Bundles & wefts",
  "Closures",
  "Frontals",
  "Braiding hair",
  "Hair care",
  "Tools & accessories",
];

export function Footer() {
  const phone = getPhoneDisplay();
  const tel = getPhoneTel();
  const wa = buildWhatsAppUrl(defaultOrderMessage);
  const mapUrl = getMapEmbedUrl();
  const address = getBusinessAddress();

  return (
    <footer className="border-t border-charcoal/10 bg-matte text-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="light" layout="stack" className="mb-4" />
            <p className="text-sm leading-relaxed text-white/70">
              The SENSATIONAL standard: real hair, clean lace, installs that eat
              — from Accra to every corner of Ghana. Same vibe as our TikTok, full
              checkout on this site.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
              Categories
            </h3>
            <ul className="space-y-2 text-sm text-white/75">
              {categories.map((c) => (
                <li key={c}>
                  <Link href="/#products" className="hover:text-white">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-white/75">
              <li>
                <Link href="/cart" className="hover:text-white">
                  Order online (cart &amp; checkout)
                </Link>
              </li>
              <li>
                <a href={`tel:${tel}`} className="hover:text-white">
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp (support)
                </a>
              </li>
              <li>
                <a
                  href={brand.socials.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {brand.socials.tiktok.linkLabel}{" "}
                  <span className="text-white/60">({brand.socials.tiktok.handle})</span>
                </a>
              </li>
              {address ? <li>{address}</li> : null}
            </ul>
            <p className="mt-4 text-xs text-white/50">
              Mon–Sat: 9:00–19:00 · Sun: 11:00–17:00 (GMT)
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
              Location
            </h3>
            {mapUrl ? (
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  title={`${brand.siteName} on Google Maps`}
                  src={mapUrl}
                  className="h-40 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <p className="text-sm text-white/70">
                Nationwide delivery across Ghana. Map available when address is
                configured.
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.siteName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
