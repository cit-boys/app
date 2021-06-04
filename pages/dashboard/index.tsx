import React, { Component } from 'react'
import { Router } from 'next/router'

import axios from '@utils/axios'
import { Company, getCompanies } from '@utils/hooks/useCompanies'

import DashboardScreen from '../../screens/DashboardScreen'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

interface Props {
  router: Router
}

interface State {
  companies: Company[]
  jobs: string[]
  isLoading: boolean
}

export default class DashboardScreenWrapper extends Component<Props, State> {
  state: State = {
    companies: [],
    jobs: [],
    isLoading: false,
  }

  // eslint-disable-next-line
  async loadCompanies() {
    this.setState({ ...this.state, isLoading: true })

    const companies = await getCompanies()
    companies.unshift({ id: 0, location: '', name: '', short_name: '' })

    this.setState({ ...this.state, companies, isLoading: false })
  }

  // eslint-disable-next-line
  async loadJobs() {
    this.setState({ ...this.state, isLoading: true })

    const jobs = await axios
      .get<string[]>('api/jobs/')
      .then((res) => res.data || [])
    jobs.unshift('')

    this.setState({ ...this.state, isLoading: false, jobs })
  }

  componentDidMount(): void {
    this.loadCompanies()
    this.loadJobs()
  }

  render(): React.ReactElement {
    if (this.state.isLoading) return <div>Loading...</div>

    return (
      <DashboardScreen
        companies={this.state.companies}
        jobs={this.state.jobs}
        router={this.props.router}
      />
    )
  }
}
