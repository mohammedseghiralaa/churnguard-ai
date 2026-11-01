import { Controller, useFormContext, useWatch } from "react-hook-form";
import {
  SegmentedControl,
  type SegmentedOption,
} from "@/components/form/SegmentedControl";
import { ToggleSwitch } from "@/components/form/ToggleSwitch";
import {
  ADD_ON_KEYS,
  type AddOnKey,
  type FormInput,
  type FormOutput,
} from "@/lib/validation";

const internetOptions: SegmentedOption<
  "DSL" | "Fiber optic" | "No"
>[] = [
  { label: "Fiber optic", value: "Fiber optic" },
  { label: "DSL", value: "DSL" },
  { label: "No internet", value: "No" },
];

const phoneOptions: SegmentedOption<"Yes" | "No">[] = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const multipleLinesOptions: SegmentedOption<"Yes" | "No">[] = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const addOns: { key: AddOnKey; label: string }[] = [
  { key: "TechSupport", label: "Tech support" },
  { key: "OnlineSecurity", label: "Online security" },
  { key: "OnlineBackup", label: "Online backup" },
  { key: "DeviceProtection", label: "Device protection" },
];

const streaming: { key: AddOnKey; label: string }[] = [
  { key: "StreamingTV", label: "Streaming TV" },
  { key: "StreamingMovies", label: "Streaming movies" },
];

export function ServicesStep() {
  const { control, getValues, setValue } = useFormContext<
    FormInput,
    unknown,
    FormOutput
  >();
  const phoneService = useWatch({ control, name: "PhoneService" });
  const internetService = useWatch({ control, name: "InternetService" });
  const phoneDisabled = phoneService === "No";
  const internetDisabled = internetService === "No";

  return (
    <section>
      <div className="flex items-center justify-between pb-3">
        <div>
          <span className="text-label-sm font-bold uppercase tracking-wider text-primary">
            Services
          </span>
          <h2 className="mt-0.5 text-headline-lg text-on-surface">
            Their services
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
              d="M8.25 20.25 12 3.75l3.75 16.5M6 8.25h12M5.25 13.5h13.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-space-md">
        <Controller
          control={control}
          name="InternetService"
          render={({ field, fieldState }) => (
            <SegmentedControl
              columns={3}
              error={fieldState.error?.message}
              id="internet-service"
              label="Internet service"
              name={field.name}
              onBlur={field.onBlur}
              onChange={(next) => {
                const wasDisabled = internetService === "No";

                field.onChange(next);

                if (next === "No") {
                  for (const key of ADD_ON_KEYS) {
                    setValue(key, "No internet service", {
                      shouldValidate: true,
                    });
                  }
                } else if (wasDisabled) {
                  for (const key of ADD_ON_KEYS) {
                    setValue(key, "No", { shouldValidate: true });
                  }
                }
              }}
              options={internetOptions}
              value={field.value}
            />
          )}
        />

        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
          <Controller
            control={control}
            name="PhoneService"
            render={({ field, fieldState }) => (
              <SegmentedControl
                columns={2}
                error={fieldState.error?.message}
                id="phone-service"
                label="Phone service"
                name={field.name}
                onBlur={field.onBlur}
                onChange={(next) => {
                  const currentMultipleLines = getValues("MultipleLines");
                  const nextMultipleLines =
                    next === "No"
                      ? "No phone service"
                      : phoneService === "No" ||
                          currentMultipleLines === "No phone service"
                        ? "No"
                        : currentMultipleLines;

                  field.onChange(next);

                  if (nextMultipleLines !== currentMultipleLines) {
                    setValue("MultipleLines", nextMultipleLines, {
                      shouldValidate: true,
                    });
                  }
                }}
                options={phoneOptions}
                value={field.value}
              />
            )}
          />

          {phoneDisabled ? (
            <p className="self-start rounded-lg bg-surface-container-low p-3 text-body-md text-on-surface-variant">
              No phone service. Multiple lines are unavailable.
            </p>
          ) : (
            <Controller
              control={control}
              name="MultipleLines"
              render={({ field, fieldState }) => (
                <SegmentedControl
                  columns={2}
                  error={fieldState.error?.message}
                  id="multiple-lines"
                  label="Multiple lines"
                  name={field.name}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  options={multipleLinesOptions}
                  value={
                    field.value === "No phone service" ? null : field.value
                  }
                />
              )}
            />
          )}
        </div>

        {internetDisabled ? (
          <p className="rounded-lg bg-surface-container-low p-3 text-body-md text-on-surface-variant">
            No internet service. Add-ons are unavailable.
          </p>
        ) : (
          <>
            <div>
              <span className="mb-2 block text-label-lg font-semibold text-on-surface">
                Add-ons
              </span>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {addOns.map((item) => (
                  <Controller
                    control={control}
                    key={item.key}
                    name={item.key}
                    render={({ field, fieldState }) => (
                      <ToggleSwitch
                        error={fieldState.error?.message}
                        id={item.key.toLowerCase()}
                        label={item.label}
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
                ))}
              </div>
            </div>

            <div>
              <span className="mb-2 block text-label-lg font-semibold text-on-surface">
                Streaming
              </span>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {streaming.map((item) => (
                  <Controller
                    control={control}
                    key={item.key}
                    name={item.key}
                    render={({ field, fieldState }) => (
                      <ToggleSwitch
                        error={fieldState.error?.message}
                        id={item.key.toLowerCase()}
                        label={item.label}
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
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
