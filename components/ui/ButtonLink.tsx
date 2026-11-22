// components/ui/ButtonLink.tsx - anchor styled as a button. Primary is the one
// Indigo action per section; secondary is the quiet alternative next to it.

import type { ComponentProps } from "react";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[17px] font-semibold leading-none transition-[background-color,box-shadow,transform] duration-200 active:translate-y-px";

const variants = {
  primary:
    "bg-brand text-white shadow-[0_10px_24px_-10px_rgba(58,54,224,0.6)] hover:bg-brand-deep hover:shadow-[0_14px_28px_-12px_rgba(58,54,224,0.7)]",
  secondary: "bg-white text-ink ring-1 ring-line ring-inset hover:bg-mist",
  onDark: "bg-white text-ink hover:bg-marigold-soft",
} as const;

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: keyof typeof variants }) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

export const buttonClasses = (variant: keyof typeof variants = "primary") => `${base} ${variants[variant]}`;
