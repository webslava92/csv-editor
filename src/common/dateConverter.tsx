import dayjs from 'dayjs';

export function dateToISO(date: string, format: string) {
  const parsedDate = dayjs(date, format);

  if (!parsedDate.isValid()) {
    throw new Error('Invalid date format');
  }

  const isoDateStr = parsedDate.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  return isoDateStr;
}
