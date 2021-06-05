import React, { Component } from 'react'

import axios from '@utils/axios'
import { Company } from '@utils/hooks/useCompanies'

import CompaniesContent from '../../screens/CompaniesContent'

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

export default class CompaniesScreen extends Component<Props, State> {
  state: State = {
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

    return <CompaniesContent companies={this.state.companies} />
  }
}
