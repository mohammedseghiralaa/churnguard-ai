"use client";

import { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { BillingStep } from "@/components/wizard/BillingStep";
import { CustomerStep } from "@/components/wizard/CustomerStep";
import { ServicesStep } from "@/components/wizard/ServicesStep";
import { Stepper } from "@/components/wizard/Stepper";
import {
  defaultFormValues,
  formSchema,
  STEP_FIELDS,
  type FormInput,
  type FormOutput,
} from "@/lib/validation";
import { loadWizardState, saveWizardState } from "@/lib/wizard-storage";
import { useWizardStore } from "@/lib/wizard-store";

export function ChurnWizard() {
  const step = useWizardStore((state) => state.step);
  const setStep = useWizardStore((state) => state.setStep);
  const goBack = useWizardStore((state) => state.goBack);
  const goNext = useWizardStore((state) => state.goNext);
  const hydratedRef = useRef(false);

  const form = useForm<FormInput, unknown, FormOutput>({
    defaultValues: defaultFormValues,
    mode: "onTouched",
    resolver: zodResolver(formSchema),
  });
  const { formState, getValues, handleSubmit, reset, subscribe, trigger } =
    form;
  const isValid = formState.isValid;

  useEffect(() => {
    const saved = loadWizardState();

    if (saved) {
      if (saved.values) {
        reset({ ...defaultFormValues, ...saved.values });
      }

      if (saved.step !== undefined) {
        setStep(saved.step);
      }
    }

    hydratedRef.current = true;
  }, [reset, setStep]);

  useEffect(() => {
    if (!hydratedRef.current) {
      return;
    }

    saveWizardState(step, getValues());

    return subscribe({
      formState: { values: true },
      callback: ({ values }) => {
        saveWizardState(step, values);
      },
    });
  }, [getValues, step, subscribe]);

  async function handleNext() {
    const fields =
      step === 1 ? STEP_FIELDS[1] : step === 2 ? STEP_FIELDS[2] : STEP_FIELDS[3];
    const valid = await trigger(fields, { shouldFocus: true });

    if (valid) {
      goNext();
    }
  }

  return (
    <FormProvider {...form}>
      <div className="flex flex-col">
        <header className="mx-auto mb-space-lg flex w-full max-w-[760px] flex-col items-center text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-surface-container-high px-3 py-1 text-label-sm text-primary">
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="3.75" />
              <path
                d="M12 3v2.25M12 18.75V21M4.5 12H2.25M21.75 12H19.5M6.34 6.34 4.75 4.75M19.25 19.25l-1.59-1.59M17.66 6.34l1.59-1.59M4.75 19.25l1.59-1.59"
                strokeLinecap="round"
              />
            </svg>
            <span>Single account review</span>
          </div>

          <h1 className="max-w-xl text-display-lg-mobile text-on-surface sm:text-display-lg">
            Will this customer stay?
          </h1>
          <p className="mt-2 max-w-md text-body-xl text-on-surface-variant">
            {"Enter the customer's details to see their churn risk."}
          </p>
        </header>

        <Stepper currentStep={step} />

        <form noValidate onSubmit={handleSubmit(() => undefined)}>
          <div className="mx-auto w-full max-w-[760px]">
            <div className="rounded-xl bg-surface-container-lowest p-6 shadow-md sm:p-10">
              {step === 1 ? (
                <CustomerStep />
              ) : step === 2 ? (
                <ServicesStep />
              ) : (
                <BillingStep />
              )}

              <div className="flex items-center justify-between gap-space-sm pt-space-lg">
                <button
                  className={[
                    "inline-flex h-14 items-center gap-1.5 rounded-full px-6 text-label-lg font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    step === 1 ? "invisible" : "",
                  ].join(" ")}
                  disabled={step === 1}
                  onClick={goBack}
                  type="button"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19.5 12h-15m0 0 6-6m-6 6 6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Back
                </button>

                {step < 3 ? (
                  <button
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-label-lg font-bold text-on-primary shadow-md transition-all hover:bg-primary-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.99]"
                    onClick={() => {
                      void handleNext();
                    }}
                    type="button"
                  >
                    {step === 1 ? "Next: Services" : "Next: Billing"}
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M4.5 12h15m0 0-6-6m6 6-6 6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-label-lg font-bold text-on-primary shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!isValid}
                    type="submit"
                  >
                    Check risk
                  </button>
                )}
              </div>
            </div>

            <div className="mt-space-md flex items-start gap-3.5 rounded-lg bg-surface-container-low p-4 shadow-sm sm:items-center sm:p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary-fixed text-on-secondary-fixed">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.45.9 1.1.9 1.85V16h5.2v-.25c0-.75.3-1.4.9-1.85A6 6 0 0 0 12 3Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-body-md text-on-surface">
                Tip: You can go back and edit any step before checking risk.
              </p>
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
