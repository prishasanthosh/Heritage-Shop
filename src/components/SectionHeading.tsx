export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : ""}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${
            dark ? "text-saffron" : "text-terracotta-dark"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-3 font-display text-3xl md:text-4xl font-semibold leading-tight ${dark ? "text-ivory" : "text-brown"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-3 leading-relaxed ${dark ? "text-cream/80" : "text-charcoal-soft"} ${align === "center" ? "" : "max-w-xl"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
