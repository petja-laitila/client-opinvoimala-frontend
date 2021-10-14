import { DateTime } from 'luxon';

const LOCALE = 'fi-FI';
const TIMEZONE = 'Europe/Helsinki';

interface DateOptions {
  format?: string;
  timezone?: string;
  locale?: string;
}

const localizedDate = (
  isoDate: string,
  { timezone = TIMEZONE, locale = LOCALE }: DateOptions = {}
) => {
  return DateTime.fromISO(isoDate).setZone(timezone).setLocale(locale);
};

export const formatDateTime = (isoDate: string, options: DateOptions = {}) => {
  const { format = 'ccc f' } = options;
  return localizedDate(isoDate, options).toFormat(format);
};

export const isFutureDate = (isoDate: string, options: DateOptions = {}) => {
  const now = DateTime.now();
  return now < localizedDate(isoDate, options);
};

export const isPastDate = (isoDate: string, options: DateOptions = {}) => {
  const now = DateTime.now();
  return now >= localizedDate(isoDate, options);
};
