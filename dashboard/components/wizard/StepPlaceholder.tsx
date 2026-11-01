type StepPlaceholderProps = {
  eyebrow: string;
  heading: string;
};

export function StepPlaceholder({ eyebrow, heading }: StepPlaceholderProps) {
  return (
    <section>
      <span className="text-label-sm font-bold uppercase tracking-wider text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-0.5 text-headline-lg text-on-surface">{heading}</h2>
    </section>
  );
}
