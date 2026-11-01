import { z } from "zod";

export const ADD_ON_KEYS = [
  "OnlineSecurity",
  "OnlineBackup",
  "DeviceProtection",
  "TechSupport",
  "StreamingTV",
  "StreamingMovies",
] as const;

export type AddOnKey = (typeof ADD_ON_KEYS)[number];

const requiredMessage = "Required.";
const tenureMessage = "Enter 0–100.";
const chargeMessage = "Enter a valid amount.";

const yesNoSchema = z.enum(["Yes", "No"], { message: requiredMessage });
const addOnSchema = z.enum(["Yes", "No", "No internet service"], {
  message: requiredMessage,
});

const chargeSchema = z
  .string()
  .trim()
  .min(1, chargeMessage)
  .refine((value) => {
    const amount = Number(value);

    return Number.isFinite(amount) && amount >= 0;
  }, chargeMessage)
  .transform((value) => Number(value));

export const formSchema = z
  .object({
    gender: z.enum(["Female", "Male"], { message: requiredMessage }),
    SeniorCitizen: z.union([z.literal(0), z.literal(1)], {
      message: requiredMessage,
    }),
    Partner: yesNoSchema,
    Dependents: yesNoSchema,
    tenure: z
      .number({ message: tenureMessage })
      .min(0, tenureMessage)
      .max(100, tenureMessage),
    PhoneService: yesNoSchema,
    MultipleLines: z.enum(["Yes", "No", "No phone service"], {
      message: requiredMessage,
    }),
    InternetService: z.enum(["DSL", "Fiber optic", "No"], {
      message: requiredMessage,
    }),
    OnlineSecurity: addOnSchema,
    OnlineBackup: addOnSchema,
    DeviceProtection: addOnSchema,
    TechSupport: addOnSchema,
    StreamingTV: addOnSchema,
    StreamingMovies: addOnSchema,
    Contract: z.enum(["Month-to-month", "One year", "Two year"], {
      message: requiredMessage,
    }),
    PaperlessBilling: yesNoSchema,
    PaymentMethod: z.enum(
      [
        "Electronic check",
        "Mailed check",
        "Bank transfer (automatic)",
        "Credit card (automatic)",
      ],
      { message: requiredMessage },
    ),
    MonthlyCharges: chargeSchema,
    TotalCharges: chargeSchema,
  })
  .superRefine((data, ctx) => {
    if (data.PhoneService === "No") {
      if (data.MultipleLines !== "No phone service") {
        ctx.addIssue({
          code: "custom",
          path: ["MultipleLines"],
          message: requiredMessage,
        });
      }
    } else if (data.MultipleLines === "No phone service") {
      ctx.addIssue({
        code: "custom",
        path: ["MultipleLines"],
        message: requiredMessage,
      });
    }

    if (data.InternetService === "No") {
      for (const key of ADD_ON_KEYS) {
        if (data[key] !== "No internet service") {
          ctx.addIssue({
            code: "custom",
            path: [key],
            message: requiredMessage,
          });
        }
      }
    } else {
      for (const key of ADD_ON_KEYS) {
        if (data[key] === "No internet service") {
          ctx.addIssue({
            code: "custom",
            path: [key],
            message: requiredMessage,
          });
        }
      }
    }
  });

export type FormInput = z.input<typeof formSchema>;
export type FormOutput = z.output<typeof formSchema>;

export const defaultFormValues: FormInput = {
  gender: "Female",
  SeniorCitizen: 0,
  Partner: "Yes",
  Dependents: "No",
  tenure: 24,
  PhoneService: "Yes",
  MultipleLines: "No",
  InternetService: "Fiber optic",
  OnlineSecurity: "Yes",
  OnlineBackup: "No",
  DeviceProtection: "No",
  TechSupport: "Yes",
  StreamingTV: "Yes",
  StreamingMovies: "No",
  Contract: "Month-to-month",
  PaperlessBilling: "Yes",
  PaymentMethod: "Credit card (automatic)",
  MonthlyCharges: "",
  TotalCharges: "",
};

export const STEP_FIELDS: Record<1 | 2 | 3, (keyof FormInput)[]> = {
  1: ["gender", "SeniorCitizen", "Partner", "Dependents", "tenure"],
  2: [
    "PhoneService",
    "MultipleLines",
    "InternetService",
    "OnlineSecurity",
    "OnlineBackup",
    "DeviceProtection",
    "TechSupport",
    "StreamingTV",
    "StreamingMovies",
  ],
  3: [
    "Contract",
    "PaperlessBilling",
    "PaymentMethod",
    "MonthlyCharges",
    "TotalCharges",
  ],
};
