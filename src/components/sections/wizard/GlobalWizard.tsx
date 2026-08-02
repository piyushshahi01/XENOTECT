import { getCmsServices, getCmsPackages, getCmsFeatures } from "@/app/actions/cms";
import { WizardModalClient } from "./WizardModalClient";

export async function GlobalWizard() {
  const services = await getCmsServices();
  const packages = await getCmsPackages();
  const features = await getCmsFeatures();

  return (
    <WizardModalClient 
      initialServices={services} 
      initialPackages={packages} 
      initialFeatures={features} 
    />
  );
}
