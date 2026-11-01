import { create } from "zustand";

type WizardStore = {
  step: number;
  setStep: (step: number) => void;
  goBack: () => void;
  goNext: () => void;
};

export const useWizardStore = create<WizardStore>((set) => ({
  step: 1,
  setStep: (step) => set({ step: Math.min(3, Math.max(1, step)) }),
  goBack: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
  goNext: () => set((state) => ({ step: Math.min(3, state.step + 1) })),
}));
