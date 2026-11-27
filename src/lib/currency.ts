/** Naira formatting. Money is held in kobo (integer) to avoid float drift. */

const NAIRA = '₦'; // ₦

export type MoneyParts = {
  symbol: string;
  /** Grouped integer part, e.g. "1,284,500". */
  main: string;
  /** Decimal part including the dot, e.g. ".00". */
  decimals: string;
};

/** Split a kobo amount into parts so the hero can style the decimals smaller. */
export function nairaParts(kobo: number): MoneyParts {
  const naira = kobo / 100;
  const [whole, frac = '00'] = Math.abs(naira).toFixed(2).split('.');
  const grouped = Number(whole).toLocaleString('en-NG');
  const sign = naira < 0 ? '-' : '';
  return { symbol: NAIRA, main: `${sign}${grouped}`, decimals: `.${frac}` };
}

/** Flat formatted string, e.g. "₦1,284,500.00". */
export function formatNaira(kobo: number): string {
  const { symbol, main, decimals } = nairaParts(kobo);
  return `${symbol}${main}${decimals}`;
}

/** Compact form without decimals, e.g. "₦45,000". */
export function formatNairaShort(kobo: number): string {
  const naira = Math.round(kobo / 100);
  return `${NAIRA}${naira.toLocaleString('en-NG')}`;
}
