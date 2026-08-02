"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface WizardContextType {
  isOpen: boolean;
  initialServiceId: string | null;
  initialPackageId: string | null;
  openWizard: (serviceId?: string | null, packageId?: string | null) => void;
  closeWizard: () => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialServiceId, setInitialServiceId] = useState<string | null>(null);
  const [initialPackageId, setInitialPackageId] = useState<string | null>(null);

  const openWizard = (serviceId: string | null = null, packageId: string | null = null) => {
    setInitialServiceId(serviceId);
    setInitialPackageId(packageId);
    setIsOpen(true);
    // Optional: Lock body scroll when wizard is open
    document.body.style.overflow = "hidden";
  };

  const closeWizard = () => {
    setIsOpen(false);
    setInitialServiceId(null);
    setInitialPackageId(null);
    document.body.style.overflow = "unset";
  };

  return (
    <WizardContext.Provider value={{ isOpen, initialServiceId, initialPackageId, openWizard, closeWizard }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}
