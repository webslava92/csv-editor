import dayjs from 'dayjs';

export function dateToISO(date: string, format: string) {
  if (dayjs(date, format).isValid()) {
    const parsedDate = dayjs(date, format);

    if (!parsedDate.isValid()) {
      throw new Error('Invalid date format');
    }

    const isoDateStr = parsedDate.utc().toISOString();

    return isoDateStr;
  }
  return 'InvalidDate';
}
