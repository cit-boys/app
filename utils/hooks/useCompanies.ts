import { useQuery, UseQueryOptions } from 'react-query'
import axios from '@utils/axios'

export interface Company {
  id: number
  name: string
  short_name: string
  location: string
}

// eslint-disable-next-line
export const getCompanies = () =>
  axios.get<Company[]>('api/companies/').then((res) => res.data)

interface Props {
  options?: UseQueryOptions<Company[]>
}

// eslint-disable-next-line
export default function useCompanies({ options = {} }: Props = {}) {
  return useQuery<Company[]>('contributions', () => getCompanies(), {
    initialData: [],
    ...options,
  })
}
