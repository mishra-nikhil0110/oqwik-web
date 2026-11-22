// components/sections/ProductVisual.tsx - hero product visual, built in code so
// it stays sharp and on-brand until real screenshots exist. It shows one order
// travelling: guest's phone (menu with dish photos, Table 7) -> payment -> KOT.
// To swap for a screenshot, replace <PhoneMock /> with a next/image.

import { DishRow, PhoneFrame, StatusBar } from "@/components/ui/Mock";
import { grandTotal, itemCount, kot, menu, orderLines, rupees, sampleRestaurant, subtotal } from "@/lib/sample-order";

function PhoneMock() {
  return (
    <PhoneFrame className="w-[272px] sm:w-[300px]">
      <StatusBar />

      {/* restaurant header */}
      <div className="flex items-center gap-3 px-4 pt-3">
        <span className="inline-flex size-10 items-center justify-center rounded-[11px] bg-ink text-[15px] font-bold text-marigold">
          {sampleRestaurant.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] leading-tight font-semibold">{sampleRestaurant.name}</p>
          <p className="text-[12px] text-ink-2">{sampleRestaurant.cuisine}</p>
        </div>
        <span className="rounded-full bg-marigold px-2.5 py-1 text-[12px] font-semibold text-ink">{sampleRestaurant.table}</span>
      </div>

      {/* categories */}
      <div className="flex gap-1.5 overflow-hidden px-4 pt-3 text-[12px] font-medium">
        <span className="rounded-full bg-brand px-3 py-1.5 text-white">Popular</span>
        <span className="rounded-full bg-mist px-3 py-1.5 text-ink-2">Starters</span>
        <span className="rounded-full bg-mist px-3 py-1.5 text-ink-2">Mains</span>
        <span className="rounded-full bg-mist px-3 py-1.5 text-ink-2">Breads</span>
      </div>

      {/* dishes with photos */}
      <div className="divide-y divide-line px-4 pt-1">
        {menu.slice(0, 4).map((d) => (
          <DishRow key={d.name} dish={d} />
        ))}
      </div>

      {/* cart bar */}
      <div className="px-3 pt-1 pb-4">
        <div className="flex items-center justify-between rounded-2xl bg-brand px-4 py-3 text-white">
          <div className="leading-tight">
            <p className="text-[11px] text-white/80">{itemCount} items</p>
            <p className="text-[15px] font-bold tabular-nums">
              {rupees(subtotal)} <span className="text-[11px] font-medium text-white/80">+ GST</span>
            </p>
          </div>
          <p className="text-[14px] font-semibold">Pay &amp; order →</p>
        </div>
      </div>
    </PhoneFrame>
  );
}

function KitchenTicket() {
  return (
    <div className="w-[170px] rotate-[-3deg] animate-ticket rounded-xl bg-white p-3.5 text-ink shadow-[0_24px_48px_-18px_rgba(20,20,43,0.45)] ring-1 ring-line sm:w-[196px]">
      <div className="flex items-baseline justify-between">
        <p className="text-[12px] font-bold tracking-wide">KOT {kot.number}</p>
        <p className="text-[11px] text-ink-2 tabular-nums">{kot.time}</p>
      </div>
      <p className="mt-2 inline-flex rounded-md bg-marigold px-2 py-0.5 text-[13px] font-bold">{sampleRestaurant.table}</p>
      <ul className="mt-2.5 space-y-1 border-t border-dashed border-ink-3 pt-2.5 text-[12.5px] tabular-nums">
        {orderLines.map((d) => (
          <li key={d.name}>
            {d.qty} × {d.name}
          </li>
        ))}
      </ul>
      <p className="mt-2.5 border-t border-dashed border-ink-3 pt-2 text-[11px] font-bold tracking-wider text-success">
        PAID · UPI · {rupees(grandTotal)}
      </p>
    </div>
  );
}

function PaymentToast() {
  return (
    <div className="flex animate-float items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_18px_40px_-18px_rgba(20,20,43,0.45)] ring-1 ring-line">
      <span className="inline-flex size-8 items-center justify-center rounded-full bg-success text-white" aria-hidden="true">
        <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 10.5l3.2 3L15 7" />
        </svg>
      </span>
      <div className="leading-tight">
        <p className="text-[13px] font-semibold">Payment received</p>
        <p className="text-[12px] text-ink-2 tabular-nums">
          {rupees(grandTotal)} · {sampleRestaurant.table} · UPI
        </p>
      </div>
    </div>
  );
}

export function ProductVisual() {
  return (
    <figure className="relative mx-auto w-full max-w-[30rem]">
      {/* Brand motif: the logo's indigo ring and marigold dot, scaled up behind the phone. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute top-1/2 left-1/2 size-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[28px] border-brand-soft sm:size-[26rem] sm:border-[34px]" />
        <span className="absolute top-[3%] right-[8%] size-16 rounded-full bg-marigold sm:size-20" />
        <span className="absolute bottom-[12%] left-[4%] size-6 rounded-full bg-marigold/70" />
      </div>

      <div className="relative flex justify-start pb-10 sm:pl-6">
        <PhoneMock />
      </div>

      <div className="absolute right-0 bottom-0 sm:right-2">
        <KitchenTicket />
      </div>
      <div className="absolute top-[44%] hidden sm:-left-16 sm:block lg:-left-28">
        <PaymentToast />
      </div>
      <figcaption className="sr-only">
        Sample screens: a guest at Table 7 orders Paneer Tikka, Chilli Potato and two Butter Naan and pays {rupees(grandTotal)} by UPI.
        The kitchen receives ticket KOT {kot.number} tagged Table 7 and marked paid.
      </figcaption>
    </figure>
  );
}
