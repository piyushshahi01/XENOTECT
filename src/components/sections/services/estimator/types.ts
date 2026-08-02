export type ServiceType = "web" | "ai" | "growth";

export interface EstimatorSummaryProps {
  features: string[];
  timelineProgress: number; // 0 to 100
  timelineStage: string;
  recommendedPlan: {
    name: string;
    description: string;
  };
  totalCostUsd: number; // explicitly in USD
  totalCostInr: number; // explicitly in INR
  serviceId?: string;
}
