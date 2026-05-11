type EditorialListHeaderProps = {
  eyebrow: string;
  headline: string;
  supporting: string;
};

export function EditorialListHeader({
  eyebrow,
  headline,
  supporting,
}: EditorialListHeaderProps) {
  return (
    <header className="mb-10 md:mb-12">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
        {eyebrow}
      </p>
      <h1
        className="mt-3 text-3xl font-normal tracking-tight text-[var(--foreground)] sm:text-4xl"
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
        }}
      >
        {headline}
      </h1>
      <p className="mt-4 max-w-2xl text-[var(--body-text)] leading-[1.65]">
        {supporting}
      </p>
    </header>
  );
}
