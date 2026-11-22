// components/sections/journey/Scenes.tsx - one illustrated, gently animated
// scene per journey step. Built from the same mock parts as the hero so the
// product looks the same everywhere. Every scene reads correctly when still;
// motion only adds emphasis and stops under prefers-reduced-motion.
// Swap any scene for a real screenshot or clip later without touching the copy.

import { Banknote, Check, ChefHat, CreditCard, Landmark, Printer, ScanLine, Smartphone, Wallet } from "lucide-react";
import { DishRow, PhoneFrame } from "@/components/ui/Mock";
import { cgst, grandTotal, itemCount, kot, menu, orderLines, rupees, sampleRestaurant, sgst, subtotal } from "@/lib/sample-order";

/* ---------- shared bits ---------- */

/** Deterministic QR-style pattern (decorative, not scannable). */
function QrGlyph({ size = 96, className = "" }: { size?: number; className?: string }) {
  const n = 25;
  let seed = 7;
  const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const inFinder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
  let d = "";
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) if (!inFinder(x, y) && rand() > 0.52) d += `M${x} ${y}h1v1h-1z`;
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" fill="currentColor" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill="currentColor" />
    </g>
  );
  return (
    <svg viewBox={`0 0 ${n} ${n}`} width={size} height={size} className={className} shapeRendering="crispEdges" aria-hidden="true">
      <rect width={n} height={n} fill="#fff" />
      <path d={d} fill="currentColor" />
      {[finder(0, 0), finder(n - 7, 0), finder(0, n - 7)]}
    </svg>
  );
}

function SceneShell({ children, label, tint = "bg-white" }: { children: React.ReactNode; label: string; tint?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative h-[320px] w-full overflow-hidden rounded-3xl text-ink ${tint} ring-1 ring-white/10`}
    >
      {children}
    </div>
  );
}

function Toast({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[12.5px] font-semibold text-ink shadow-[0_16px_32px_-14px_rgba(20,20,43,0.5)] ring-1 ring-line ${className}`}>
      {children}
    </div>
  );
}

const Tick = ({ className = "" }: { className?: string }) => (
  <span className={`inline-flex size-5 items-center justify-center rounded-full bg-success text-white ${className}`} aria-hidden="true">
    <Check className="size-3" strokeWidth={3} />
  </span>
);

/* ---------- 1. scan ---------- */

function ScanScene() {
  return (
    <SceneShell tint="bg-marigold-soft" label="A table stand on Table 7 with a QR code, and a phone camera framing it. A message says Table 7 detected.">
      {/* table surface */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[34%] bg-[#e9d3a6]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-[34%] h-2 bg-[#d9bd86]" />

      {/* table tent card */}
      <div className="absolute bottom-[26%] left-[8%] w-[132px] rounded-t-2xl rounded-b-md bg-white p-3 text-center shadow-[0_20px_30px_-16px_rgba(20,20,43,0.45)] ring-1 ring-line sm:left-[12%] sm:w-[148px]">
        <p className="rounded-md bg-marigold py-1 text-[13px] font-bold text-ink">{sampleRestaurant.table}</p>
        <QrGlyph size={96} className="mx-auto mt-2 text-ink" />
        <p className="mt-1.5 text-[11px] leading-tight font-semibold text-ink">Scan to order &amp; pay</p>
        <p className="text-[9px] tracking-[0.2em] text-ink-2 uppercase">by OQwik</p>
      </div>

      {/* phone framing the QR */}
      <div className="absolute top-[8%] right-[6%] w-[136px] sm:right-[12%] sm:w-[150px]">
        <PhoneFrame screen="bg-ink h-[210px] sm:h-[230px]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2a2a45] to-ink" />
          {/* viewfinder */}
          <div className="absolute inset-x-[16%] top-[22%] aspect-square">
            {["top-0 left-0 border-t-3 border-l-3", "top-0 right-0 border-t-3 border-r-3", "bottom-0 left-0 border-b-3 border-l-3", "bottom-0 right-0 border-b-3 border-r-3"].map((c) => (
              <span key={c} className={`absolute size-5 rounded-[4px] border-marigold ${c}`} aria-hidden="true" />
            ))}
            <QrGlyph size={64} className="absolute inset-[14%] h-[72%] w-[72%] text-ink opacity-90" />
            <span aria-hidden="true" className="absolute inset-x-1 h-0.5 animate-scan rounded-full bg-marigold shadow-[0_0_12px_2px_rgba(255,182,39,0.8)]" />
          </div>
          <p className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1 text-[10px] font-semibold text-white/80">
            <ScanLine className="size-3" aria-hidden="true" /> Point at the QR
          </p>
        </PhoneFrame>
      </div>

      <Toast className="absolute bottom-4 left-4 animate-pop-loop sm:left-[10%]">
        <Tick /> {sampleRestaurant.table} detected
      </Toast>
    </SceneShell>
  );
}

/* ---------- 2. menu ---------- */

function MenuScene() {
  const chai = menu[4];
  return (
    <SceneShell tint="bg-mist" label="The menu on the guest's phone with dish photos. Paneer Tikka, Chilli Potato and two Butter Naan are in the cart.">
      <div className="absolute top-14 left-1/2 w-[272px] -translate-x-1/2 sm:top-12 sm:w-[300px]">
        <PhoneFrame screen="h-[340px]">
          <div className="flex items-center gap-2 px-4 pt-4">
            <span className="inline-flex size-8 items-center justify-center rounded-[9px] bg-ink text-[12px] font-bold text-marigold">
              {sampleRestaurant.initials}
            </span>
            <p className="flex-1 truncate text-[13px] font-semibold">{sampleRestaurant.name}</p>
            <span className="rounded-full bg-marigold px-2 py-0.5 text-[11px] font-semibold">{sampleRestaurant.table}</span>
          </div>
          <div className="divide-y divide-line px-4 pt-1">
            {[menu[0], menu[3]].map((d) => (
              <DishRow key={d.name} dish={d} thumb={40} />
            ))}
            <div className="relative">
              <DishRow dish={chai} thumb={40} />
              {/* tap ripple on the ADD button */}
              <span aria-hidden="true" className="absolute top-1/2 right-3 size-9 -translate-y-1/2 animate-tap rounded-full bg-brand/25 ring-2 ring-brand/40" />
            </div>
          </div>
        </PhoneFrame>
      </div>
      <div className="absolute top-3 right-3 flex items-center gap-3 rounded-2xl bg-brand px-3.5 py-2.5 text-white shadow-[0_18px_30px_-14px_rgba(58,54,224,0.7)] sm:right-5">
        <span className="flex items-center gap-2 text-[13px] font-semibold">
          <span className="inline-flex size-6 animate-pop-loop items-center justify-center rounded-full bg-marigold text-[12px] font-bold text-ink tabular-nums">
            {itemCount}
          </span>
          items · {rupees(subtotal)}
        </span>
        <span className="hidden text-[13px] font-semibold sm:inline">View cart →</span>
      </div>
    </SceneShell>
  );
}

/* ---------- 3. pay ---------- */

function PayScene() {
  const methods = [
    { icon: Smartphone, label: "UPI", note: "GPay, PhonePe, Paytm", on: true },
    { icon: CreditCard, label: "Card", note: "Debit or credit" },
    { icon: Landmark, label: "Net banking", note: "All major banks" },
    { icon: Wallet, label: "Wallets", note: "" },
  ];
  return (
    <SceneShell tint="bg-brand-soft" label={`Payment screen: ${rupees(grandTotal)} including GST, UPI selected. A confirmation shows the payment succeeded.`}>
      <div className="absolute inset-x-5 top-5 bottom-5 mx-auto flex max-w-[330px] flex-col rounded-3xl bg-white p-4 shadow-[0_24px_48px_-24px_rgba(20,20,43,0.45)] ring-1 ring-line">
        <div className="flex items-baseline justify-between">
          <p className="text-[13px] font-semibold text-ink-2">Pay for {sampleRestaurant.table}</p>
          <p className="text-[11px] text-ink-2">incl. GST</p>
        </div>
        <p className="text-[28px] leading-tight font-bold tracking-tight tabular-nums">{rupees(grandTotal)}</p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {methods.map(({ icon: I, label, note, on }) => (
            <li
              key={label}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] ${on ? "bg-marigold-soft ring-1 ring-marigold" : "ring-1 ring-line"}`}
            >
              <I className={`size-4 ${on ? "text-marigold-ink" : "text-ink-2"}`} aria-hidden="true" />
              <span className="font-semibold">{label}</span>
              <span className="truncate text-[11.5px] text-ink-2">{note}</span>
              <span className={`ml-auto inline-flex size-4 items-center justify-center rounded-full ring-2 ${on ? "ring-brand" : "ring-line"}`} aria-hidden="true">
                {on ? <span className="size-2 rounded-full bg-brand" /> : null}
              </span>
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex h-11 items-center justify-center rounded-full bg-brand text-[14px] font-semibold text-white">
          Pay {rupees(grandTotal)}
        </span>
      </div>
      <Toast className="absolute right-3 bottom-[22%] animate-pop-loop sm:right-6">
        <Tick /> Paid · UPI
      </Toast>
    </SceneShell>
  );
}

/* ---------- 4. kitchen ---------- */

function MiniTicket({ table, lines, tone = "plain", animate = false }: { table: string; lines: string[]; tone?: "new" | "plain" | "ready"; animate?: boolean }) {
  const ring = tone === "new" ? "ring-2 ring-marigold" : tone === "ready" ? "ring-1 ring-success/40" : "ring-1 ring-line";
  return (
    <div className={`rounded-lg bg-white p-2 text-ink ${ring} ${animate ? "animate-slide-in" : ""}`}>
      <p className={`inline-flex rounded px-1.5 text-[11px] font-bold ${tone === "new" ? "bg-marigold" : "bg-mist"}`}>{table}</p>
      <ul className="mt-1 space-y-0.5 text-[10.5px] leading-tight text-ink-2">
        {lines.map((l) => (
          <li key={l} className="truncate">
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}

function KitchenScene() {
  const t7 = orderLines.map((d) => `${d.qty}× ${d.name}`);
  return (
    <SceneShell tint="bg-[#1d1d38]" label={`Kitchen board with columns New, Preparing and Ready. Table 7's order has just arrived in New, and a thermal printer is printing KOT ${kot.number}.`}>
      {/* board */}
      <div className="absolute top-5 bottom-5 left-4 right-4 grid grid-cols-3 gap-2 sm:right-[150px]">
        {[
          { h: "New", c: "text-marigold", items: [<MiniTicket key="7" table="Table 7" lines={t7} tone="new" animate />] },
          { h: "Preparing", c: "text-white/80", items: [<MiniTicket key="3" table="Table 3" lines={["2× Chicken Biryani", "1× Masala Chai"]} />] },
          { h: "Ready", c: "text-success", items: [<MiniTicket key="12" table="Table 12" lines={["1× Paneer Tikka"]} tone="ready" />] },
        ].map((col) => (
          <div key={col.h} className="flex min-w-0 flex-col gap-2 rounded-xl bg-white/[0.06] p-2 ring-1 ring-white/10">
            <p className={`flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase ${col.c}`}>
              {col.h === "New" ? <ChefHat className="size-3.5" aria-hidden="true" /> : null}
              {col.h}
            </p>
            {col.items}
          </div>
        ))}
      </div>

      {/* thermal printer */}
      <div className="absolute top-6 right-4 hidden w-[124px] sm:block">
        <div className="relative z-10 rounded-xl bg-[#e7e7ef] px-3 pt-2 pb-3 shadow-lg">
          <div className="flex items-center justify-between">
            <Printer className="size-4 text-ink-2" aria-hidden="true" />
            <span className="size-1.5 animate-shimmer rounded-full bg-success" aria-hidden="true" />
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-ink" />
        </div>
        <div className="relative -mt-1 h-[200px] overflow-hidden px-2">
          <div className="animate-print rounded-b-md bg-white px-2.5 pt-3 pb-3 font-medium text-ink shadow-md">
            <p className="text-center text-[10px] font-bold tracking-wider">KOT {kot.number}</p>
            <p className="mt-1 text-center text-[11px] font-bold">
              <span className="rounded bg-marigold px-1">TABLE 7</span>
            </p>
            <ul className="mt-2 space-y-0.5 border-t border-dashed border-ink-3 pt-1.5 text-[10px] leading-tight">
              {t7.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <p className="mt-1.5 border-t border-dashed border-ink-3 pt-1 text-[9px] font-bold text-success">PAID · {kot.time}</p>
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

/* ---------- 5. bill ---------- */

function BillScene() {
  return (
    <SceneShell tint="bg-marigold-soft" label={`GST bill for Table 7: subtotal ${rupees(subtotal)}, CGST and SGST at 2.5% each, total ${rupees(grandTotal)}, paid by UPI. The table now shows as free.`}>
      <div className="absolute top-5 bottom-5 left-5 w-[210px] rounded-xl bg-white p-4 text-ink shadow-[0_24px_40px_-20px_rgba(20,20,43,0.45)] ring-1 ring-line sm:left-8 sm:w-[230px]">
        <p className="text-center text-[13px] font-bold">{sampleRestaurant.name}</p>
        <p className="text-center text-[10.5px] text-ink-2">Tax invoice · Bill B-2291 · {sampleRestaurant.table}</p>
        <ul className="mt-2.5 space-y-1 border-t border-dashed border-ink-3 pt-2 text-[11.5px] tabular-nums">
          {orderLines.map((d) => (
            <li key={d.name} className="flex justify-between gap-2">
              <span className="truncate">
                {d.qty}× {d.name}
              </span>
              <span>{rupees(d.qty * d.price)}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-2 space-y-0.5 border-t border-dashed border-ink-3 pt-2 text-[11px] text-ink-2 tabular-nums">
          <li className="flex justify-between"><span>Subtotal</span><span>{rupees(subtotal)}</span></li>
          <li className="flex justify-between"><span>CGST 2.5%</span><span>{rupees(cgst)}</span></li>
          <li className="flex justify-between"><span>SGST 2.5%</span><span>{rupees(sgst)}</span></li>
        </ul>
        <p className="mt-2 flex justify-between border-t border-ink pt-2 text-[14px] font-bold tabular-nums">
          <span>Total</span>
          <span>{rupees(grandTotal)}</span>
        </p>
        <p className="mt-2.5 inline-flex rotate-[-4deg] rounded-md border-2 border-success px-2 py-0.5 text-[11px] font-bold tracking-widest text-success">
          PAID · UPI
        </p>
      </div>

      <div className="absolute top-6 right-4 flex w-[150px] flex-col gap-2.5 sm:right-8 sm:w-[170px]">
        <div className="rounded-xl bg-white p-3 ring-1 ring-line">
          <p className="text-[10.5px] font-semibold text-ink-2">Today&apos;s sales</p>
          <p className="animate-shimmer text-[18px] font-bold tabular-nums">₹18,240</p>
          <div className="mt-1.5 flex h-8 items-end gap-1" aria-hidden="true">
            {[30, 45, 38, 60, 52, 78, 100].map((h, i) => (
              <span key={i} className={`flex-1 rounded-sm ${i === 6 ? "bg-brand" : "bg-brand-soft"}`} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-white p-3 ring-1 ring-line">
          <span className="text-[12px] font-semibold">{sampleRestaurant.table}</span>
          <span className="rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-bold text-success">Free</span>
        </div>
        <Toast className="animate-pop-loop">
          <Banknote className="size-4 text-success" aria-hidden="true" /> Bill sent to guest
        </Toast>
      </div>
    </SceneShell>
  );
}

export const scenes = {
  scan: ScanScene,
  menu: MenuScene,
  pay: PayScene,
  kitchen: KitchenScene,
  bill: BillScene,
} as const;
