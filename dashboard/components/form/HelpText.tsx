import type { ReactNode } from "react";

type HelpTextProps = {
  id: string;
  children: ReactNode;
  tone?: "hint" | "error";
};

export function HelpText({ id, children, tone = "hint" }: HelpTextProps) {
  return (
    <p
      className={
        tone === "error"
          ? "mt-1.5 text-label-sm font-semibold text-error"
          : "mt-1.5 text-body-md text-on-surface-variant"
      }
      id={id}
      role={tone === "error" ? "alert" : undefined}
    >
      {children}
    </p>
  );
}
