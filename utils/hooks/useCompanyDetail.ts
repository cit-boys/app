import { useQuery, UseQueryOptions } from 'react-query'
import axios from '@utils/axios'

interface Params {
  company_name: string
}

interface CompanyDetail {
  job_title: string
  salaries: number[]
}

const getDetail = (params: Params) =>
  axios.get('api/contributions/company/', { params }).then((res) => res.data)

interface Props {
  params: Params
  options?: UseQueryOptions<CompanyDetail[]>
}

// eslint-disable-next-line
export default function useCompanyDetail({ params, options }: Props) {
  return useQuery<CompanyDetail[]>(
    ['companies', params.company_name],
    () => getDetail(params),
    { initialData: [], ...options }
  )
}
