// defaultRate = how much of this currency you get for 1 Thai baht (THB).
// These are rough starting values only. Update them in the app, or use the
// "Fetch live rates" button.
export const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', defaultRate: 0.031, decimals: 2 },
  { code: 'EUR', name: 'Euro', defaultRate: 0.027, decimals: 2 },
  { code: 'GBP', name: 'British Pound', defaultRate: 0.023, decimals: 2 },
  { code: 'CAD', name: 'Canadian Dollar', defaultRate: 0.043, decimals: 2 },
  { code: 'AUD', name: 'Australian Dollar', defaultRate: 0.048, decimals: 2 },
  { code: 'SAR', name: 'Saudi Riyal', defaultRate: 0.117, decimals: 2 },
  { code: 'AED', name: 'UAE Dirham', defaultRate: 0.114, decimals: 2 },
  { code: 'CNY', name: 'Chinese Yuan', defaultRate: 0.22, decimals: 2 },
  { code: 'INR', name: 'Indian Rupee', defaultRate: 2.6, decimals: 0 },
  { code: 'MYR', name: 'Malaysian Ringgit', defaultRate: 0.13, decimals: 2 },
  { code: 'SGD', name: 'Singapore Dollar', defaultRate: 0.04, decimals: 2 },
  { code: 'JPY', name: 'Japanese Yen', defaultRate: 4.6, decimals: 0 },
  { code: 'KRW', name: 'South Korean Won', defaultRate: 43, decimals: 0 },
  { code: 'RUB', name: 'Russian Ruble', defaultRate: 2.6, decimals: 0 },
]

export const DEFAULT_RATES = Object.fromEntries(
  CURRENCIES.map((c) => [c.code, c.defaultRate])
)

export const DEFAULT_SELECTED = ['CAD', 'USD', 'EUR', 'GBP', 'SAR']

export function formatMoney(amount, code) {
  const info = CURRENCIES.find((c) => c.code === code)
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
      maximumFractionDigits: info ? info.decimals : 2,
      minimumFractionDigits: info ? info.decimals : 2,
    }).format(amount)
  } catch {
    return `${code} ${amount.toFixed(2)}`
  }
}
