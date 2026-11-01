import { Controller, useFormContext } from "react-hook-form";
import { NumberField } from "@/components/form/NumberField";
import {
  SegmentedControl,
  type SegmentedOption,
} from "@/components/form/SegmentedControl";
import { ToggleSwitch } from "@/components/form/ToggleSwitch";
import type { FormInput, FormOutput } from "@/lib/validation";

const contractOptions: SegmentedOption<FormInput["Contract"]>[] = [
  { label: "Month-to-month", value: "Month-to-month" },
  { label: "One year", value: "One year" },
  { label: "Two year", value: "Two year" },
];

const paymentOptions: SegmentedOption<FormInput["PaymentMethod"]>[] = [
  { label: "Electronic check", value: "Electronic check" },
  { label: "Mailed check", value: "Mailed check" },
  { label: "Bank transfer", value: "Bank transfer (automatic)" },
  { label: "Credit card", value: "Credit card (automatic)" },
];

export function BillingStep() {
  const { control } = useFormContext<FormInput, unknown, FormOutput>();

  return (
    <section>
      <div className="flex items-center justify-between pb-3">
        <div>
          <span className="text-label-sm font-bold uppercase tracking-wider text-primary">
            Billing
          </span>
          <h2 className="mt-0.5 text-headline-lg text-on-surface">
            Plan &amp; billing
          </h2>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-fixed">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              d="M3 8.25h18M5.25 5.25h13.5A2.25 2.25 0 0 1 21 7.5v9a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 16.5v-9a2.25 2.25 0 0 1 2.25-2.25ZM7.5 14.25h3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-space-md">
        <Controller
          control={control}
          name="Contract"
          render={({ field, fieldState }) => (
            <SegmentedControl
              columns={3}
              error={fieldState.error?.message}
              id="contract"
              label="Contract"
              name={field.name}
              onBlur={field.onBlur}
              onChange={field.onChange}
              options={contractOptions}
              value={field.value}
            />
          )}
        />

        <Controller
          control={control}
          name="PaperlessBilling"
          render={({ field, fieldState }) => (
            <ToggleSwitch
              error={fieldState.error?.message}
              hint="Digital statements"
              id="paperless-billing"
              label="Paperless billing"
              name={field.name}
              offLabel="No"
              onBlur={field.onBlur}
              onChange={(enabled) =>
                field.onChange(enabled ? "Yes" : "No")
              }
              onLabel="Yes"
              value={field.value === "Yes"}
            />
          )}
        />

        <Controller
          control={control}
          name="PaymentMethod"
          render={({ field, fieldState }) => (
            <SegmentedControl
              columns={2}
              error={fieldState.error?.message}
              id="payment-method"
              label="Payment method"
              name={field.name}
              onBlur={field.onBlur}
              onChange={field.onChange}
              options={paymentOptions}
              value={field.value}
            />
          )}
        />

        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
          <div className="rounded-lg bg-surface-container-low p-4">
            <Controller
              control={control}
              name="MonthlyCharges"
              render={({ field, fieldState }) => (
                <NumberField
                  error={fieldState.error?.message}
                  hint="USD per month"
                  id="monthly-charges"
                  label="Monthly charges"
                  min={0}
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  prefix="$"
                  step={0.01}
                  value={field.value}
                />
              )}
            />
          </div>

          <div className="rounded-lg bg-surface-container-low p-4">
            <Controller
              control={control}
              name="TotalCharges"
              render={({ field, fieldState }) => (
                <NumberField
                  error={fieldState.error?.message}
                  hint="Total paid to date"
                  id="total-charges"
                  label="Total charges"
                  min={0}
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  prefix="$"
                  step={0.01}
                  value={field.value}
                />
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
