// components/sections/HowItWorks.tsx - one real order at Table 7, minute by
// minute. A timeline rail runs down the left with Marigold step markers and
// clock times; each step pairs the copy with an animated product scene.
// When howItWorks.videoUrl is set, the explainer video appears above the steps.

import { Check, ChefHat, Store, User } from "lucide-react";
import { howItWorks, type JourneyStep } from "@/lib/content";
import { grandTotal, kot, rupees, sampleRestaurant } from "@/lib/sample-order";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { scenes } from "./journey/Scenes";

const actorIcon = { Guest: User, Kitchen: ChefHat, Owner: Store } as const;

function Video({ url }: { url: string }) {
  const isFile = /\.(mp4|webm)$/i.test(url);
  return (
    <div className="overflow-hidden rounded-3xl bg-black ring-1 ring-white/10">
      {isFile ? (
        <video src={url} controls playsInline preload="metadata" className="aspect-video w-full" />
      ) : (
        <iframe src={url} title="OQwik explainer video" allow="encrypted-media; picture-in-picture" allowFullScreen className="aspect-video w-full" />
      )}
    </div>
  );
}

function Step({ step, index, last }: { step: JourneyStep; index: number; last: boolean }) {
  const Scene = scenes[step.scene];
  const ActorIcon = actorIcon[step.actor];
  const flip = index % 2 === 1;
  return (
    <li className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 sm:grid-cols-[3rem_1fr] sm:gap-x-6">
      {/* rail */}
      <div className="relative flex flex-col items-center">
        <span className="relative z-10 inline-flex size-10 items-center justify-center rounded-full bg-marigold text-[17px] font-bold text-ink tabular-nums shadow-[0_0_0_6px_rgba(255,182,39,0.18)] sm:size-12 sm:text-[20px]">
          {index + 1}
        </span>
        {!last ? (
          <span
            aria-hidden="true"
            className="absolute top-12 bottom-[-3rem] w-0.5 bg-[repeating-linear-gradient(to_bottom,var(--color-marigold)_0_6px,transparent_6px_12px)] opacity-60 sm:top-14 sm:bottom-[-4rem]"
          />
        ) : null}
      </div>

      <div className="grid min-w-0 items-center gap-7 pb-12 sm:pb-16 lg:grid-cols-2 lg:gap-12">
        <div className={`flex min-w-0 flex-col gap-4 ${flip ? "lg:order-2" : ""}`}>
          <div className="flex flex-wrap items-center gap-2 pt-1.5 sm:pt-2.5">
            <time className="rounded-full bg-marigold/15 px-3 py-1 text-[14px] font-bold text-marigold tabular-nums ring-1 ring-marigold/40">
              {step.time}
            </time>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[14px] font-semibold text-white/85">
              <ActorIcon className="size-4" aria-hidden="true" />
              {step.actor}
            </span>
          </div>
          <h3 className="text-[clamp(1.375rem,1.2rem+0.7vw,1.75rem)] leading-tight font-semibold tracking-[-0.015em] text-white">
            {step.title}
          </h3>
          <p className="max-w-[48ch] text-[17px] leading-relaxed text-white/75">{step.body}</p>
          <ul className="flex flex-col gap-2">
            {step.points.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-[16px] text-white/90">
                <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-marigold" aria-hidden="true">
                  <Check className="size-3 text-ink" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className={`min-w-0 ${flip ? "lg:order-1" : ""}`}>
          <Scene />
        </div>
      </div>
    </li>
  );
}

export function HowItWorks() {
  const first = howItWorks.steps[0].time;
  const lastStep = howItWorks.steps[howItWorks.steps.length - 1].time;
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
      {/* soft Indigo and Marigold glows, echoing the logo's ring and dot */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 size-[34rem] rounded-full bg-brand/25 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute top-1/2 -left-40 size-[26rem] rounded-full bg-marigold/10 blur-3xl" />

      <div className="container-page relative flex flex-col gap-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="how-title" eyebrow={howItWorks.eyebrow} title={howItWorks.title} intro={howItWorks.intro} tone="dark" />
          {/* order summary card: the facts the whole timeline follows */}
          <dl className="grid shrink-0 grid-cols-3 gap-px overflow-hidden rounded-2xl bg-white/10 text-center ring-1 ring-white/15 lg:w-[22rem]">
            {[
              { k: "Table", v: sampleRestaurant.table.replace("Table ", "") },
              { k: "Paid", v: rupees(grandTotal) },
              { k: "Scan to served", v: "18 min" },
            ].map((item) => (
              <div key={item.k} className="bg-ink/60 px-3 py-3">
                <dt className="text-[12px] font-medium text-white/60">{item.k}</dt>
                <dd className="text-[20px] font-bold text-marigold tabular-nums">{item.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {howItWorks.videoUrl ? <Video url={howItWorks.videoUrl} /> : null}

        <p className="sr-only">
          Sample order {kot.number} at {sampleRestaurant.table}, from {first} to {lastStep}.
        </p>
        <ol className="flex flex-col">
          {howItWorks.steps.map((s, i) => (
            <Step key={s.title} step={s} index={i} last={i === howItWorks.steps.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}
