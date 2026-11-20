const FORMATTERS = new Map<string, Intl.DateTimeFormat>();

function dayMonthFormatter(locale: string, withYear: boolean): Intl.DateTimeFormat {
  const key = `${locale}|${withYear}`;
  const cached = FORMATTERS.get(key);
  if (cached) return cached;
  const formatter = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    ...(withYear ? { year: 'numeric' } : {}),
  });
  FORMATTERS.set(key, formatter);
  return formatter;
}

export function formatDayMonth(at: number, locale: string, withYear: boolean): string {
  return dayMonthFormatter(locale, withYear).format(new Date(at));
}
