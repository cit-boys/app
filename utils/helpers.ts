import { parse } from 'date-fns'

export const DEFAULT_DATE_FORMAT = 'MM/dd/yyyy'
export const DEFAULT_TIME_FORMAT = 'HH:mm:ss'
export const DEFAULT_DATETIME_FORMAT = `${DEFAULT_DATE_FORMAT} ${DEFAULT_TIME_FORMAT}`

export const parseDatetime = (datetime: string): Date =>
  parse(datetime, DEFAULT_DATETIME_FORMAT, new Date())
