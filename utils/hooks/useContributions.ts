import { useQuery, UseQueryOptions } from 'react-query'
import axios from '@utils/axios'
import { parseDatetime } from '@utils/helpers'

interface Params {
  company?: number
  job_title?: string
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
    .then((data) =>
      data.map((item) => ({
        ...item,
        datetime_of_contribution: parseDatetime(item.datetime_of_contribution),
        salary: parseFloat(item.salary),
      }))
    )

interface Props {
  params?: Params
  options?: UseQueryOptions<Contribution[]>
}

// eslint-disable-next-line
export default function useContributions({ params = {}, options }: Props = {}) {
  return useQuery<Contribution[]>(
    'contributions',
    () => getContributions(params),
    {
      initialData: [],
      ...options,
    }
  )
}
