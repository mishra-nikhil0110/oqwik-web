// lib/whatsapp.ts - wa.me links to the OQwik WhatsApp number.
import { site } from "./content";

export function whatsappLink(text?: string) {
  return `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
