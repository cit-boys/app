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
    contribution: number
  }>
}

const getSalaryInfo = (params: Params = {}) =>
  axios
    .get('api/contributions/salaryinfo/', { params })
    .then((res) => res.data)
    .then((data) => ({
      min: parseFloat(data.min),
      max: parseFloat(data.max),
      median: parseFloat(data.median),
      info: data.map((item) => ({
        ...item,
        salary: parseFloat(data.salary),
        bonus: parseFloat(data.bonus),
      })),
    }))

interface Props {
  params?: Params
  options?: UseQueryOptions<SalaryInfo>
}

// eslint-disable-next-line
export default function useSalaryInfo({ params = {}, options }: Props = {}) {
  return useQuery<SalaryInfo>(
    'contributions',
    () => getSalaryInfo(params),
    options
  )
}
