// app/api/trial/route.ts - receives free-trial requests from the landing page.
// Forwards each lead as JSON to LEAD_WEBHOOK_URL (Slack, Zapier, Google Apps
// Script...) when it is set; always writes it to the server log as a backup.

import { NextResponse } from "next/server";

type Lead = { name: string; phone: string; restaurant: string; city: string; tables?: string };

const PHONE = /^(\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/;

function clean(v: unknown, max = 120): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Please fill in the form and try again." }, { status: 400 });
  }

  const lead: Lead = {
    name: clean(raw.name),
    phone: clean(raw.phone, 20),
    restaurant: clean(raw.restaurant),
    city: clean(raw.city, 60),
    tables: clean(raw.tables, 4) || undefined,
  };

  if (!lead.name || !lead.restaurant || !lead.city) {
    return NextResponse.json({ error: "Add your name, restaurant and city so we know who to call." }, { status: 400 });
  }
  if (!PHONE.test(lead.phone)) {
    return NextResponse.json({ error: "Enter a 10-digit mobile number, like 98765 43210." }, { status: 400 });
  }

  const record = { ...lead, source: "oqwik-web", receivedAt: new Date().toISOString() };
  console.info("[trial-lead]", JSON.stringify(record));

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!res.ok) throw new Error(`webhook responded ${res.status}`);
    } catch (err) {
      console.error("[trial-lead] webhook failed", err);
      return NextResponse.json(
        { error: "We could not save your request just now. Please try again in a minute." },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({ ok: true });
}
