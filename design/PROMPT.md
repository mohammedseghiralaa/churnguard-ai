Build the frontend only of a web app called "ChurnGuard" (customer churn prediction for a telecom company). Do NOT write any backend, model, or database code. The backend and ML model will be built separately by me later.

STACK

- Next.js (App Router) + TypeScript + Tailwind CSS. Runs on http://localhost:3000.
- Structure: /app (routes), /components, /lib (api client, types, mock data, validation), /hooks.

DESIGN REFERENCE

- The folder /design contains the Stitch export: two screens (check_a_customer_churnguard, prediction_result_churnguard), each with code.html and screen.png, plus executive_predictive_suite/DESIGN.md (colors, typography, spacing).
- Follow them closely for layout, colors, fonts (Plus Jakarta Sans), and spacing. Put the DESIGN.md tokens into the Tailwind config. Rebuild everything as clean reusable React components. Do not paste the raw exported HTML.

ROUTES

- / : "Will this customer stay?" 3-step form wizard (Customer, Services, Billing) with progress bar.
- /result : "Customer Retention Analysis" result page. If there is no result in state, redirect to /.
- Keep the form data and result in client state (context or zustand) and persist in sessionStorage so a refresh does not lose them.

API CONTRACT (future backend)
POST {API_URL}/predict
Request body (validate with zod + react-hook-form, same constraints):
{
gender: "Male" | "Female",
SeniorCitizen: 0 | 1,
Partner: "Yes" | "No",
Dependents: "Yes" | "No",
tenure: number (0-100),
PhoneService: "Yes" | "No",
MultipleLines: "Yes" | "No" | "No phone service",
InternetService: "DSL" | "Fiber optic" | "No",
OnlineSecurity, OnlineBackup, DeviceProtection, TechSupport, StreamingTV, StreamingMovies: "Yes" | "No" | "No internet service",
Contract: "Month-to-month" | "One year" | "Two year",
PaperlessBilling: "Yes" | "No",
PaymentMethod: "Electronic check" | "Mailed check" | "Bank transfer (automatic)" | "Credit card (automatic)",
MonthlyCharges: number (>= 0),
TotalCharges: number (>= 0)
}
Response:
{ prediction: "Churn" | "No Churn", churn_probability: number (0 to 1), churn_risk: "Low" | "Medium" | "High" }
Risk thresholds: Low < 0.4, Medium 0.4 to 0.7, High >= 0.7.

CHANGES TO MAKE VS THE STITCH DESIGN

1. Gender: only Female / Male (remove "Non-binary / Other"), because the API only accepts those two values.
2. Remove every invented claim: "Model accuracy 94.2%", "Predicted lost revenue", "Reversible within 7 days", "30 to 60 days", "4x higher cancellation", "SHAP Feature Impact +0.48", "$180 retention reserve", "Frontline agent quota approved", "reduced by 54%", "extending lifetime by 18+ months", and the tip card's "statistically strongest indicators" wording. Replace them with neutral wording or remove them. Show only: probability gauge, risk badge, one verdict sentence, the reasons, the actions, and the simulator.
3. Nav bar: keep only the logo and the "Predictor" item. Remove or disable "Batch Analysis" and "Help & FAQ".
4. Remove the buttons "Generate offer", "Add benefit", "Log call" (show the actions as simple cards without buttons).
5. "Export / Print summary" -> window.print() with a print-friendly stylesheet.
6. Risk labels: use "Low risk", "Medium risk", "High risk" with green, amber, red, from churn_risk.
7. Conditional logic in the form: if PhoneService = No then MultipleLines = "No phone service"; if InternetService = No then OnlineSecurity, OnlineBackup, DeviceProtection, TechSupport, StreamingTV, StreamingMovies = "No internet service" (hide those inputs and show a short note).
8. What-if simulator: the contract dropdown and the tech support toggle re-call predictChurn with those fields changed. Hide the tech support toggle if InternetService = No. Show current risk vs new risk, and compute the difference from the two real probabilities (never hardcode it).

MOCK LAYER

- /lib/api.ts exposes typed functions: predictChurn(customer), getRiskFactors(customer), getRecommendedActions(customer).
- Controlled by NEXT_PUBLIC_USE_MOCK=true|false and NEXT_PUBLIC_API_URL.
- Mock true: predictChurn uses a simple heuristic (higher probability for month-to-month contract, short tenure, fiber optic, no tech support, electronic check), with an artificial delay of 400-800 ms. getRiskFactors returns the top 3 reasons from simple rules on the input. getRecommendedActions returns 2-3 suggestions from simple rules.
- Mock false: predictChurn calls the real endpoint with fetch and handles errors (network, 422, 500) with a friendly message. getRiskFactors and getRecommendedActions stay rule-based on the frontend for now, but behind the same function signatures so I can replace them later.

QUALITY

- Loading state on the "Check risk" button, error banner, inline validation, responsive layout, keyboard accessible, visible focus states.

DELIVERABLES

- Working app with `npm run dev`, a .env.example (NEXT_PUBLIC_API_URL=http://localhost:8000, NEXT_PUBLIC_USE_MOCK=true), and a short README explaining how to switch from mock to the real API.

Work step by step: setup and Tailwind tokens, then the form wizard, then the result page, then the simulator. Pause after each step so I can review.
