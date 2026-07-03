export function SectionHeading({
  number,
  title,
  subtitle,
  tone = "light",
}: {
  number: string;
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
}) {
  const mutedColor = tone === "dark" ? "text-mist-300" : "text-mist-500";
  const titleColor = tone === "dark" ? "text-paper" : "text-ink";

  return (
    <div className="flex items-baseline gap-4">
      <span className={`label-uppercase text-sm ${mutedColor}`}>{number}</span>
      <div>
        <h2 className={`label-uppercase text-sm font-medium ${titleColor}`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-3 max-w-md text-base leading-relaxed ${mutedColor}`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
