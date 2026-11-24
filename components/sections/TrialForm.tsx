// components/sections/TrialForm.tsx - trial request form. On submit it opens a
// WhatsApp chat with the OQwik number, pre-filled with the owner's details,
// so the conversation starts where restaurant owners already are. A copy of
// the lead is also posted to /api/trial (fire-and-forget) for the log/webhook.
"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { closing } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/ButtonLink";

const field =
  "min-h-12 w-full rounded-xl border border-line bg-white px-4 text-[16px] text-ink placeholder:text-ink-3 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";
const label = "text-[15px] font-semibold text-ink";

type Lead = { name: string; phone: string; restaurant: string; city: string; tables: string };

function buildMessage(l: Lead) {
  return [
    "Hi OQwik! I'd like to start the 15-day free trial.",
    "",
    `Name: ${l.name}`,
    `Restaurant: ${l.restaurant}`,
    `City: ${l.city}`,
    `Mobile: ${l.phone}`,
    l.tables ? `Tables: ${l.tables}` : "",
  ]
    .filter((line, i, all) => line !== "" || all[i - 1] !== "")
    .join("\n")
    .trim();
}

export function TrialForm() {
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as Lead;
    const lead: Lead = {
      name: data.name.trim(),
      phone: data.phone.trim(),
      restaurant: data.restaurant.trim(),
      city: data.city.trim(),
      tables: (data.tables ?? "").trim(),
    };
    const url = whatsappLink(buildMessage(lead));

    // Open WhatsApp synchronously, inside the submit event, so browsers don't block it.
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);

    // Keep a copy server-side; never block or fail the WhatsApp handoff on it.
    fetch("/api/trial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      keepalive: true,
    }).catch(() => {});
  }

  if (sentUrl) {
    return (
      <div role="status" className="flex flex-col gap-4 rounded-3xl bg-white p-7 text-ink sm:p-9">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-[#25d366] text-white" aria-hidden="true">
          <MessageCircle className="size-6" />
        </span>
        <p className="text-h3">{closing.form.successTitle}</p>
        <p className="text-[16px] leading-relaxed text-ink-2">{closing.form.successBody}</p>
        <a href={sentUrl} target="_blank" rel="noopener noreferrer" className={`${buttonClasses("primary")} w-full`}>
          {closing.form.reopen}
        </a>
        <button type="button" onClick={() => setSentUrl(null)} className="text-[15px] font-semibold text-brand underline-offset-4 hover:underline">
          {closing.form.editAgain}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Start your free trial"
      className="flex flex-col gap-5 rounded-3xl bg-white p-6 text-ink shadow-[0_40px_80px_-40px_rgba(10,8,80,0.6)] sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="trial-name" className={label}>
            Your name
          </label>
          <input id="trial-name" name="name" required autoComplete="name" className={field} placeholder="Ravi Sharma" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="trial-phone" className={label}>
            Mobile number
          </label>
          <input
            id="trial-phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            pattern="(\+91[\s\-]?)?[6-9][0-9]{4}[\s\-]?[0-9]{5}"
            title="A 10-digit Indian mobile number"
            className={field}
            placeholder="98765 43210"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="trial-restaurant" className={label}>
          Restaurant name
        </label>
        <input id="trial-restaurant" name="restaurant" required autoComplete="organization" className={field} placeholder="e.g. Saffron Table" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="trial-city" className={label}>
            City
          </label>
          <input id="trial-city" name="city" required autoComplete="address-level2" className={field} placeholder="Lucknow" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="trial-tables" className={label}>
            Number of tables <span className="font-normal text-ink-2">(optional)</span>
          </label>
          <input id="trial-tables" name="tables" type="number" min={1} max={500} inputMode="numeric" className={field} placeholder="12" />
        </div>
      </div>

      <button type="submit" className={`${buttonClasses("primary")} w-full`}>
        <MessageCircle className="size-5" aria-hidden="true" />
        {closing.form.submit}
      </button>
      <p className="text-center text-[14px] text-ink-2">
        {closing.form.privacy}{" "}
        <a href="/privacy-policy" className="font-medium text-brand underline underline-offset-2 hover:text-brand-deep">
          {closing.form.privacyLink}
        </a>
      </p>
    </form>
  );
}
