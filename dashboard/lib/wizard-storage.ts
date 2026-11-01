import { ADD_ON_KEYS, type FormInput } from "@/lib/validation";

const STORAGE_KEY = "churnguard-wizard-v1";

type PersistedWizardState = {
  step?: number;
  values?: Partial<FormInput>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeValues(values: Partial<FormInput>): Partial<FormInput> {
  const next = { ...values };

  if (next.PhoneService === "No") {
    next.MultipleLines = "No phone service";
  } else if (next.MultipleLines === "No phone service") {
    next.MultipleLines = "No";
  }

  if (next.InternetService === "No") {
    for (const key of ADD_ON_KEYS) {
      next[key] = "No internet service";
    }
  } else {
    for (const key of ADD_ON_KEYS) {
      if (next[key] === "No internet service") {
        next[key] = "No";
      }
    }
  }

  return next;
}

export function loadWizardState(): PersistedWizardState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed: unknown = JSON.parse(raw);

    if (!isRecord(parsed)) {
      return null;
    }

    return {
      step: typeof parsed.step === "number" ? parsed.step : undefined,
      values: isRecord(parsed.values)
        ? normalizeValues(parsed.values as Partial<FormInput>)
        : undefined,
    };
  } catch {
    return null;
  }
}

export function saveWizardState(step: number, values: unknown) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, values }));
  } catch {
    return;
  }
}
