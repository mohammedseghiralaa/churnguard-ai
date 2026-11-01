type StepperProps = {
  currentStep: number;
};

const steps = [
  {
    name: "Customer",
    caption: "Customer profile",
    subtitle: "Personal profile",
  },
  {
    name: "Services",
    caption: "Services",
    subtitle: "Lines & add-ons",
  },
  {
    name: "Billing",
    caption: "Billing",
    subtitle: "Plan & payments",
  },
] as const;

export function Stepper({ currentStep }: StepperProps) {
  const current = steps[currentStep - 1];
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="mx-auto mb-space-md w-full max-w-[760px]">
      <div className="rounded-lg bg-surface-container-lowest p-space-sm shadow-sm sm:p-space-md">
        <div className="mb-3 flex items-center justify-between px-1">
          <span
            className="text-label-md font-semibold text-primary"
            id="wizard-progress-label"
          >
            {`Step ${currentStep} of ${steps.length}`}
          </span>
          <span className="text-label-sm font-medium text-on-surface-variant">
            {current.caption}
          </span>
        </div>

        <div
          aria-labelledby="wizard-progress-label"
          aria-valuemax={steps.length}
          aria-valuemin={1}
          aria-valuenow={currentStep}
          className="relative h-2.5 w-full overflow-hidden rounded-full bg-surface-container"
          role="progressbar"
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 pt-1">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCurrent = stepNumber === currentStep;
            const isComplete = stepNumber < currentStep;

            return (
              <div
                aria-current={isCurrent ? "step" : undefined}
                className={[
                  "flex items-center gap-2 rounded p-2 text-left transition-all",
                  isCurrent
                    ? "bg-surface-container-low text-on-surface"
                    : "text-on-surface-variant",
                ].join(" ")}
                key={step.name}
              >
                <span
                  className={[
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-label-sm font-bold",
                    isCurrent
                      ? "bg-primary text-on-primary"
                      : isComplete
                        ? "bg-primary-fixed text-primary"
                        : "bg-surface-container text-on-surface-variant",
                  ].join(" ")}
                >
                  {stepNumber}
                </span>
                <div className="min-w-0">
                  <span
                    className={[
                      "block truncate text-label-md",
                      isCurrent ? "font-semibold" : "font-medium",
                    ].join(" ")}
                  >
                    {step.name}
                  </span>
                  <span className="hidden truncate text-label-sm text-on-surface-variant sm:block">
                    {step.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
