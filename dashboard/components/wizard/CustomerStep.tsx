import { Controller, useFormContext } from "react-hook-form";
import { RangeSlider } from "@/components/form/RangeSlider";
import {
  SegmentedControl,
  type SegmentedOption,
} from "@/components/form/SegmentedControl";
import type { FormInput, FormOutput } from "@/lib/validation";

const genderOptions: SegmentedOption<"Female" | "Male">[] = [
  { label: "Female", value: "Female" },
  { label: "Male", value: "Male" },
];

const seniorOptions: SegmentedOption<0 | 1>[] = [
  { label: "No", value: 0 },
  { label: "Yes", value: 1 },
];

const yesNoOptions: SegmentedOption<"Yes" | "No">[] = [
  { label: "No", value: "No" },
  { label: "Yes", value: "Yes" },
];

const milestones = [
  { title: "New", hint: "0–11 months" },
  { title: "Established", hint: "12–35 months" },
  { title: "Loyal", hint: "36+ months" },
] as const;

function formatMonths(months: number) {
  return `${months} months`;
}

function formatYears(months: number) {
  return `(${(months / 12).toFixed(1)} yrs)`;
}

function activeMilestone(tenure: number) {
  if (tenure <= 11) {
    return 0;
  }

  if (tenure <= 35) {
    return 1;
  }

  return 2;
}

export function CustomerStep() {
  const { control } = useFormContext<FormInput, unknown, FormOutput>();

  return (
    <section>
      <div className="flex items-center justify-between pb-3">
        <div>
          <span className="text-label-sm font-bold uppercase tracking-wider text-primary">
            Demographics
          </span>
          <h2 className="mt-0.5 text-headline-lg text-on-surface">
            About the customer
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
              d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 19.5a7.5 7.5 0 0 1 15 0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-space-md">
        <Controller
          control={control}
          name="gender"
          render={({ field, fieldState }) => (
            <SegmentedControl
              columns={2}
              error={fieldState.error?.message}
              id="gender"
              label="Gender"
              name={field.name}
              onBlur={field.onBlur}
              onChange={field.onChange}
              options={genderOptions}
              value={field.value}
            />
          )}
        />

        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
          <Controller
            control={control}
            name="SeniorCitizen"
            render={({ field, fieldState }) => (
              <SegmentedControl
                error={fieldState.error?.message}
                id="senior-citizen"
                label="Senior citizen"
                name={field.name}
                onBlur={field.onBlur}
                onChange={field.onChange}
                options={seniorOptions}
                value={field.value}
              />
            )}
          />

          <Controller
            control={control}
            name="Partner"
            render={({ field, fieldState }) => (
              <SegmentedControl
                error={fieldState.error?.message}
                id="partner"
                label="Partner"
                name={field.name}
                onBlur={field.onBlur}
                onChange={field.onChange}
                options={yesNoOptions}
                value={field.value}
              />
            )}
          />
        </div>

        <div className="max-w-sm">
          <Controller
            control={control}
            name="Dependents"
            render={({ field, fieldState }) => (
              <SegmentedControl
                columns={2}
                error={fieldState.error?.message}
                id="dependents"
                label="Dependents"
                name={field.name}
                onBlur={field.onBlur}
                onChange={field.onChange}
                options={yesNoOptions}
                value={field.value}
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="tenure"
          render={({ field, fieldState }) => {
            const active = activeMilestone(field.value);

            return (
              <RangeSlider
                badge={
                  <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-primary px-4 py-1.5 text-on-primary shadow-sm">
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="8.25" />
                      <path d="M12 7.5V12l3 2" strokeLinecap="round" />
                    </svg>
                    <span className="text-headline-sm font-bold">
                      {formatMonths(field.value)}
                    </span>
                    <span className="text-label-sm opacity-90">
                      {formatYears(field.value)}
                    </span>
                  </span>
                }
                error={fieldState.error?.message}
                hint="Months with the company"
                id="tenure"
                label="Tenure (months)"
                max={100}
                min={0}
                name={field.name}
                onBlur={field.onBlur}
                onChange={field.onChange}
                step={1}
                value={field.value}
              >
                <div className="grid grid-cols-3 gap-2">
                  {milestones.map((milestone, index) => {
                    const isActive = index === active;

                    return (
                      <div
                        className={[
                          "rounded p-2.5 text-center transition-all",
                          isActive
                            ? "bg-surface-container-lowest shadow-sm ring-2 ring-primary"
                            : "bg-surface-container-lowest opacity-50",
                        ].join(" ")}
                        key={milestone.title}
                      >
                        <span
                          className={[
                            "block text-label-sm font-bold",
                            isActive ? "text-primary" : "text-on-surface",
                          ].join(" ")}
                        >
                          {milestone.title}
                        </span>
                        <span className="text-label-sm text-on-surface-variant">
                          {milestone.hint}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </RangeSlider>
            );
          }}
        />
      </div>
    </section>
  );
}
