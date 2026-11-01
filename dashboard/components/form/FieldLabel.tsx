import type { ReactNode } from "react";

type FieldLabelProps = {
  htmlFor: string;
  children: ReactNode;
};

export function FieldLabel({ htmlFor, children }: FieldLabelProps) {
  return (
    <label
      className="mb-2 block text-label-lg font-semibold text-on-surface"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}
