import { FieldLabel } from "./FieldLabel";
import { HelpText } from "./HelpText";

type NumberFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  hint?: string;
  error?: string;
  prefix?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
};

export function NumberField({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  hint,
  error,
  prefix,
  min = 0,
  max,
  step,
  disabled,
}: NumberFieldProps) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <div className="relative">
        {prefix ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-label-lg font-bold text-on-surface-variant"
          >
            {prefix}
          </span>
        ) : null}

        <input
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={[
            "h-12 w-full rounded border bg-surface-container-lowest pr-4 text-headline-sm font-bold text-on-surface outline-none transition-shadow [appearance:textfield] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
            prefix ? "pl-8" : "pl-4",
            error ? "border-error" : "border-outline-variant",
          ].join(" ")}
          disabled={disabled}
          id={id}
          inputMode="decimal"
          max={max}
          min={min}
          name={name}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
          step={step}
          type="number"
          value={value}
        />
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
