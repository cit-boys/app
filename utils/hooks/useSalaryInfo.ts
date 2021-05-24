import { useQuery, UseQueryOptions } from 'react-query'
import axios from '@utils/axios'

interface Params {
  company?: number
  job_title?: string
}

interface SalaryInfo {
  min: number
  max: number
  median: number
  info: Array<{
    level: string
    salary: number
    bonus: number
    contributions: number
  }>
}

const getSalaryInfo = (params: Params = {}) =>
  axios
    .get('api/contributions/salaryinfo/', { params })
    .then((res) => res.data)
    .then((data) => ({
      ...data,
      min: parseFloat(data.min),
      max: parseFloat(data.max),
      median: parseFloat(data.median),
      info: data.info.map((item) => ({
        ...item,
        salary: parseFloat(item.salary),
        bonus: parseFloat(item.bonus),
      })),
    }))

interface Props {
  params?: Params
  options?: UseQueryOptions<SalaryInfo>
}

// eslint-disable-next-line
export default function useSalaryInfo({ params = {}, options }: Props = {}) {
  return useQuery<SalaryInfo>('salaryinfo', () => getSalaryInfo(params), {
    initialData: {
      info: [{ bonus: 0, contributions: 2, level: '', salary: 0 }],
      max: 0,
      median: 0,
      min: 0,
    },
    ...options,
  })
}
