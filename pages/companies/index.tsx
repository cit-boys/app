import axios from '@utils/axios'
import { Company } from '@utils/hooks/useCompanies'
import React, { Component } from 'react'
import CompaniesListScreen from '../../screens/CompaniesList'

interface Props {
  children: React.ReactElement
}

interface State {
  companies: {
    popular: Company[]
    unpopular: Company[]
  }
  isLoading
}

export default class CompaniesListScreenWrapper extends Component<
  Props,
  State
> {
  state = {
    companies: {
      popular: [],
      unpopular: [],
    },
    isLoading: false,
  }

  // eslint-disable-next-line
  async loadCompanies() {
    this.setState({ ...this.state, isLoading: true })

    const companies = await axios
      .get<{ popular: Company[]; unpopular: Company[] }>(
        'api/companies/popular/'
      )
      .then((res) => res.data)

    this.setState({ ...this.state, companies, isLoading: false })
  }

  componentDidMount(): void {
    this.loadCompanies()
  }

  render(): React.ReactElement {
    if (this.state.isLoading) return <div>Loading...</div>

    return <CompaniesListScreen companies={this.state.companies} />
  }
}
