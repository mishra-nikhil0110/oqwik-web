// components/ui/SectionHeading.tsx - eyebrow + h2 (+ optional intro) used by every section.

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const centered = align === "center" ? "mx-auto text-center items-center" : "";
  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${centered}`}>
      <p className={`inline-flex items-center gap-2 text-eyebrow ${tone === "dark" ? "text-marigold" : "text-brand"}`}>
        <span className="h-0.5 w-6 rounded-full bg-marigold" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className={`text-h2 ${tone === "dark" ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {intro ? <p className={`text-lead max-w-2xl ${tone === "dark" ? "text-white/80" : "text-ink-2"}`}>{intro}</p> : null}
    </div>
  );
}
