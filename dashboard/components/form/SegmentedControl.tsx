import { HelpText } from "./HelpText";

export type SegmentedOption<T extends string | number> = {
  label: string;
  value: T;
};

type SegmentedControlProps<T extends string | number> = {
  id: string;
  name: string;
  label: string;
  options: readonly SegmentedOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  onBlur?: () => void;
  hint?: string;
  error?: string;
  columns?: number;
};

export function SegmentedControl<T extends string | number>({
  id,
  name,
  label,
  options,
  value,
  onChange,
  onBlur,
  hint,
  error,
  columns,
}: SegmentedControlProps<T>) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div>
      <span
        className="mb-2 block text-label-lg font-semibold text-on-surface"
        id={`${id}-label`}
      >
        {label}
      </span>

      <div
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        aria-labelledby={`${id}-label`}
        className="grid gap-2 rounded-lg bg-surface-container-low p-1.5"
        role="radiogroup"
        style={{
          gridTemplateColumns: `repeat(${columns ?? options.length}, minmax(0, 1fr))`,
        }}
      >
        {options.map((option) => {
          const optionId = `${id}-${option.value}`;
          const selected = option.value === value;

          return (
            <label
              className={[
                "flex min-h-11 cursor-pointer items-center justify-center rounded px-3 py-2.5 text-center text-label-md transition-all focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-surface-container-low",
                selected
                  ? "bg-surface-container-lowest font-bold text-primary shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface",
              ].join(" ")}
              htmlFor={optionId}
              key={option.value}
            >
              <input
                checked={selected}
                className="sr-only"
                id={optionId}
                name={name}
                onBlur={onBlur}
                onChange={() => onChange(option.value)}
                type="radio"
                value={option.value}
              />
              {option.label}
            </label>
          );
        })}
      </div>

      {hint ? <HelpText id={hintId}>{hint}</HelpText> : null}
      {error ? (
        <HelpText id={errorId} tone="error">
          {error}
        </HelpText>
      ) : null}
    </div>
  );
}
