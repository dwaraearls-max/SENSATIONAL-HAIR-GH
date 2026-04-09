import { getWhatsAppDigits } from "./site";
import { brand } from "./brand";

export function buildWhatsAppUrl(message: string): string {
  const phone = getWhatsAppDigits();
  const text = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${text}`;
}

export const defaultOrderMessage =
  brand.whatsapp.defaultOrderMessage;
