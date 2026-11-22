// components/ui/Mock.tsx - small building blocks for the in-page product mocks
// (hero phone, journey scenes). They mirror the real guest app's look:
// Marigold steppers and table chip, Indigo cart bar, veg / non-veg marks.

import Image from "next/image";
import type { ReactNode } from "react";
import { rupees, type Dish } from "@/lib/sample-order";

export function DietMark({ veg, size = "md" }: { veg: boolean; size?: "sm" | "md" }) {
  const box = size === "sm" ? "size-3" : "size-3.5";
  const dot = size === "sm" ? "size-1" : "size-1.5";
  return (
    <span
      className={`inline-flex ${box} shrink-0 items-center justify-center rounded-[3px] border-[1.5px] bg-white ${veg ? "border-veg" : "border-nonveg"}`}
      role="img"
      aria-label={veg ? "Veg" : "Non-veg"}
    >
      <span className={`${dot} rounded-full ${veg ? "bg-veg" : "bg-nonveg"}`} />
    </span>
  );
}

export function DishThumb({ dish, size = 56, className = "" }: { dish: Dish; size?: number; className?: string }) {
  return (
    <Image
      src={dish.image}
      alt={dish.name}
      width={size}
      height={size}
      unoptimized
      className={`shrink-0 rounded-xl object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

export function Stepper({ qty }: { qty: number }) {
  return qty > 0 ? (
    <span className="inline-flex h-7 items-center gap-2.5 rounded-full bg-marigold px-2.5 text-[13px] font-bold text-ink tabular-nums">
      <span aria-hidden="true">−</span>
      {qty}
      <span aria-hidden="true">+</span>
    </span>
  ) : (
    <span className="inline-flex h-7 items-center rounded-full border border-marigold bg-marigold-soft px-3 text-[12px] font-bold text-marigold-ink">
      ADD
    </span>
  );
}

export function DishRow({ dish, thumb = 52 }: { dish: Dish; thumb?: number }) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <div className="relative">
        <DishThumb dish={dish} size={thumb} />
        <span className="absolute -top-1 -left-1">
          <DietMark veg={dish.veg} size="sm" />
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] leading-tight font-semibold">{dish.name}</p>
        <p className="truncate text-[11.5px] text-ink-2">{dish.note}</p>
        <p className="mt-0.5 text-[13px] font-semibold tabular-nums">{rupees(dish.price)}</p>
      </div>
      <Stepper qty={dish.qty} />
    </div>
  );
}

/** Phone bezel. `screen` classes go on the white screen. */
export function PhoneFrame({ children, className = "", screen = "" }: { children: ReactNode; className?: string; screen?: string }) {
  return (
    <div className={`rounded-[2.4rem] bg-ink p-2 shadow-[0_40px_80px_-30px_rgba(20,20,43,0.55)] ${className}`}>
      <div className={`relative overflow-hidden rounded-[2rem] bg-white ${screen}`}>{children}</div>
    </div>
  );
}

export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold text-ink">
      <span>8:41</span>
      <span className="h-4 w-16 rounded-full bg-ink" aria-hidden="true" />
      <span>5G</span>
    </div>
  );
}
