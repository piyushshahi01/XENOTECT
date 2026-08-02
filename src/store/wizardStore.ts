import { create } from 'zustand';

interface WizardState {
  isOpen: boolean;
  initialServiceId: string | null;
  initialPackageId: string | null;
  openWizard: (serviceId?: string, packageId?: string) => void;
  closeWizard: () => void;
}

export const useWizardStore = create<WizardState>((set) => ({
  isOpen: false,
  initialServiceId: null,
  initialPackageId: null,
  openWizard: (serviceId?: string, packageId?: string) => set({ 
    isOpen: true, 
    initialServiceId: serviceId ?? null, 
    initialPackageId: packageId ?? null 
  }),
  closeWizard: () => set({ 
    isOpen: false, 
    initialServiceId: null, 
    initialPackageId: null 
  }),
}));
