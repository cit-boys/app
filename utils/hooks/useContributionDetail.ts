import { useQuery, UseQueryOptions } from 'react-query'
import axios from '@utils/axios'

interface Params {
  company?: number
  level?: string
}

interface ContributionDetail {
  level: string
  company: string
  salary: number
  bonus: number
}

const getDetail = (params: Params = {}) =>
  axios
    .get('api/contributions/contributiondetail/', { params })
    .then((res) => res.data)

interface Props {
  params?: Params
  options?: UseQueryOptions<ContributionDetail>
}

// eslint-disable-next-line
export default function useContributionDetail({
  params = {},
  options,
}: Props = {}) {
  return useQuery<ContributionDetail>(
    ['contribution-detail', params.level],
    () => getDetail(params),
    { initialData: { bonus: 0, company: '', level: '', salary: 0 }, ...options }
  )
}
