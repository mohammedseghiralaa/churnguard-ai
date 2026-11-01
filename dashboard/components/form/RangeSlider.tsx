import type { ReactNode } from "react";
import { FieldLabel } from "./FieldLabel";
import { HelpText } from "./HelpText";

type RangeSliderProps = {
  id: string;
  name: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  onBlur?: () => void;
  hint?: string;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
  badge?: ReactNode;
  children?: ReactNode;
};

export function RangeSlider({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  hint,
  error,
  min = 0,
  max = 100,
  step = 1,
  badge,
  children,
}: RangeSliderProps) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className="rounded-lg bg-surface-container-low p-5">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          {hint ? (
            <p
              className="-mt-1 text-body-md text-on-surface-variant"
              id={hintId}
            >
              {hint}
            </p>
          ) : null}
        </div>
        {badge}
      </div>

      <input
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        className="h-2.5 w-full cursor-pointer appearance-none rounded-full bg-surface-container-high accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-low"
        id={id}
        max={max}
        min={min}
        name={name}
        onBlur={onBlur}
        onChange={(event) => onChange(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />

      {children ? <div className="mt-4">{children}</div> : null}

      {error ? (
        <HelpText id={errorId} tone="error">
          {error}
        </HelpText>
      ) : null}
    </div>
  );
}
