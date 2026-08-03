"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface WizardContextType {
  isOpen: boolean;
  initialServiceId: string | null;
  initialPackageId: string | null;
  initialCategory: string | null;
  openWizard: (serviceId?: string | null, packageId?: string | null, category?: string | null) => void;
  closeWizard: () => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialServiceId, setInitialServiceId] = useState<string | null>(null);
  const [initialPackageId, setInitialPackageId] = useState<string | null>(null);
  const [initialCategory, setInitialCategory] = useState<string | null>(null);

  const openWizard = (serviceId: string | null = null, packageId: string | null = null, category: string | null = null) => {
    setInitialServiceId(serviceId);
    setInitialPackageId(packageId);
    setInitialCategory(category);
    setIsOpen(true);
    // Optional: Lock body scroll when wizard is open
    document.body.style.overflow = "hidden";
  };

  const closeWizard = () => {
    setIsOpen(false);
    setInitialServiceId(null);
    setInitialPackageId(null);
    setInitialCategory(null);
    document.body.style.overflow = "unset";
  };

  return (
    <WizardContext.Provider value={{ isOpen, initialServiceId, initialPackageId, initialCategory, openWizard, closeWizard }}>
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
