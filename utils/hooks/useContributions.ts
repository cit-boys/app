import { useQuery, UseQueryOptions } from 'react-query'
import axios from '@utils/axios'
import { PaginatedResponse, parseDatetime } from '@utils/helpers'

interface Params {
  company?: number
  job_title?: string
  page?: number
}

interface Contribution {
  company_name: string
  years_of_experience: number
  datetime_of_contribution: Date
  salary: number
  job_title: string
}

const getContributions = (params: Params = {}) =>
  axios
    .get('api/contributions/', { params })
    .then((res) => res.data)
    .then((data) => ({
      ...data,
      results: data.results.map((item) => ({
        ...item,
        datetime_of_contribution: parseDatetime(item.datetime_of_contribution),
        salary: parseFloat(item.salary),
      })),
    }))

interface Props {
  params?: Params
  options?: UseQueryOptions<PaginatedResponse<Contribution>>
}

// eslint-disable-next-line
export default function useContributions({
  params = { page: 1 },
  options,
}: Props = {}) {
  return useQuery<PaginatedResponse<Contribution>>(
    ['contributions', params.page],
    () => getContributions(params),
    {
      initialData: { count: 0, next: null, previous: null, results: [] },
      ...options,
    }
  )
}
