import { unstable_cache } from "next/cache";

export interface ExchangeRates {
  rates: {
    INR: number;
    [key: string]: number;
  };
  time_last_update_unix: number;
}

export const getExchangeRates = unstable_cache(
  async (): Promise<ExchangeRates | null> => {
    try {
      const response = await fetch("https://open.er-api.com/v6/latest/USD", {
        next: { revalidate: 3600 }, // Revalidate every hour
      });
      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      return null;
    }
  },
  ["exchange-rates"],
  { revalidate: 3600 }
);

export async function formatDualCurrency(usdAmount: number): Promise<{ usd: string; inr: string }> {
  const ratesData = await getExchangeRates();
  
  // Default fallback rate if API fails (e.g. 1 USD = 83 INR)
  const inrRate = ratesData?.rates?.INR || 83.5;
  
  const inrAmount = usdAmount * inrRate;

  // Format as strings (e.g., "$1,500" and "₹1,25,000")
  const usdFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(usdAmount);

  const inrFormatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(inrAmount);

  return { usd: usdFormatted, inr: inrFormatted };
}
