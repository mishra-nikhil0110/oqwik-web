// components/ui/Icon.tsx - maps the icon names used in lib/content.ts to Lucide icons.

import {
  BarChart3,
  ChefHat,
  CreditCard,
  Printer,
  QrCode,
  ReceiptText,
  Store,
  Target,
  Timer,
  UtensilsCrossed,
  Wallet,
  type LucideProps,
} from "lucide-react";

const icons = {
  timer: Timer,
  target: Target,
  wallet: Wallet,
  qr: QrCode,
  menu: UtensilsCrossed,
  card: CreditCard,
  chef: ChefHat,
  printer: Printer,
  receipt: ReceiptText,
  walkin: Store,
  chart: BarChart3,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = icons[name as IconName] ?? QrCode;
  return <Cmp aria-hidden="true" strokeWidth={1.75} {...props} />;
}
