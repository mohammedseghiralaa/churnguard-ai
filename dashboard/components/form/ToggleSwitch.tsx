import { HelpText } from "./HelpText";

type ToggleSwitchProps = {
  id: string;
  name: string;
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  onBlur?: () => void;
  onLabel: string;
  offLabel: string;
  hint?: string;
  error?: string;
};

export function ToggleSwitch({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  onLabel,
  offLabel,
  hint,
  error,
}: ToggleSwitchProps) {
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div>
      <div className="flex items-center justify-between gap-4 rounded-lg bg-surface-container-low p-3">
        <div>
          <span
            className="block text-label-md font-semibold text-on-surface"
            id={`${id}-label`}
          >
            {label}
          </span>
          {hint ? (
            <p
              className="mt-0.5 text-body-md text-on-surface-variant"
              id={hintId}
            >
              {hint}
            </p>
          ) : null}
        </div>

        <div
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          aria-labelledby={`${id}-label`}
          className="flex shrink-0 gap-1 rounded-full bg-surface-container p-0.5"
          role="radiogroup"
        >
          <label
            className={[
              "cursor-pointer rounded-full px-3 py-1 text-label-sm transition-colors focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-surface-container",
              value
                ? "bg-primary font-bold text-on-primary"
                : "text-on-surface-variant hover:text-on-surface",
            ].join(" ")}
            htmlFor={`${id}-on`}
          >
            <input
              checked={value}
              className="sr-only"
              id={`${id}-on`}
              name={name}
              onBlur={onBlur}
              onChange={() => onChange(true)}
              type="radio"
            />
            {onLabel}
          </label>

          <label
            className={[
              "cursor-pointer rounded-full px-3 py-1 text-label-sm transition-colors focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-surface-container",
              !value
                ? "bg-primary font-bold text-on-primary"
                : "text-on-surface-variant hover:text-on-surface",
            ].join(" ")}
            htmlFor={`${id}-off`}
          >
            <input
              checked={!value}
              className="sr-only"
              id={`${id}-off`}
              name={name}
              onBlur={onBlur}
              onChange={() => onChange(false)}
              type="radio"
            />
            {offLabel}
          </label>
        </div>
      </div>

      {error ? (
        <HelpText id={errorId} tone="error">
          {error}
        </HelpText>
      ) : null}
    </div>
  );
}
