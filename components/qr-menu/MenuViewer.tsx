"use client";

// components/qr-menu/MenuViewer.tsx - /m: reads the menu from the link's #part
// and shows it. The #part never reaches the server, so this runs in the browser.

import { useEffect, useState } from "react";
import { decodeMenu, type Menu } from "@/lib/qr-menu/codec";
import { Logo } from "@/components/ui/Logo";
import { MenuView } from "./MenuView";

type State = { status: "loading" } | { status: "error" } | { status: "ok"; menu: Menu };

export function MenuViewer() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const read = () => {
      const menu = decodeMenu(window.location.hash.slice(1));
      setState(menu ? { status: "ok", menu } : { status: "error" });
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  if (state.status === "loading") return <div className="min-h-dvh bg-white" aria-busy="true" />;

  if (state.status === "error") {
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-6 text-center">
        <Logo width={120} />
        <h1 className="mt-8 text-[24px] leading-tight font-bold">This menu link is incomplete</h1>
        <p className="mt-3 text-[16px] leading-relaxed text-ink-2">
          The QR code may be damaged or the link was cut off when it was shared. Try scanning the code again, or ask the staff for
          the menu.
        </p>
        <a
          href="/free-qr-menu-generator"
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-brand px-6 text-[16px] font-semibold text-white hover:bg-brand-deep"
        >
          Make a free QR menu
        </a>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col bg-white shadow-[0_0_0_1px_var(--color-line)]">
      <MenuView
        menu={state.menu}
        className="flex-1"
        footer={
          <footer className="border-t border-line bg-mist px-5 py-6 text-center">
            <p className="text-[14px] text-ink-2">To order, please ask the staff.</p>
            <a href="/free-qr-menu-generator" className="mt-4 inline-flex min-h-11 items-center gap-2 text-[13px] text-ink-2 hover:text-brand">
              Free QR menu by <Logo width={96} />
            </a>
          </footer>
        }
      />
    </main>
  );
}
