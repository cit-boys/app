import { parse } from 'date-fns'

export const DEFAULT_DATE_FORMAT = 'MM/dd/yyyy'
export const DEFAULT_TIME_FORMAT = 'HH:mm:ss'
export const DEFAULT_PAGE_SIZE = 5
export const DEFAULT_DATETIME_FORMAT = `${DEFAULT_DATE_FORMAT} ${DEFAULT_TIME_FORMAT}`

export const parseDatetime = (datetime: string): Date =>
  parse(datetime, DEFAULT_DATETIME_FORMAT, new Date())

export const toCurency = (val: number): string =>
  new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'PHP',
  }).format(val)

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export const toTitleCase = (str: string): string =>
  `${str[0].toUpperCase()}${str.slice(1)}`
