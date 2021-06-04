import axios from '@utils/axios'
import { toTitleCase } from '@utils/helpers'
import { Router } from 'next/router'
import React, { Component } from 'react'
import CompanyDetailScreen from '../../screens/CompanyDetailScreen'

interface Props {
  router: Router
}

interface State {
  details: Array<{
    job_title: string
    salaries: number[]
  }>
  isLoading: boolean
  companyName: string
}

export default class CompanyDetailScreenWrapper extends Component<
  Props,
  State
> {
  state = {
    details: [],
    isLoading: false,
    companyName: toTitleCase(this.props.router.query.company as string),
  }

  // eslint-disable-next-line
  async loadCompanyDetails() {
    this.setState({ ...this.state, isLoading: true })

    const details = await axios
      .get('api/contributions/company/', {
        params: { company_name: this.state.companyName },
      })
      .then((res) => res.data)

    this.setState({ ...this.state, isLoading: false, details })
  }

  componentDidMount(): void {
    this.loadCompanyDetails()
  }

  render(): React.ReactElement {
    return (
      <CompanyDetailScreen
        companyName={this.state.companyName}
        details={this.state.details}
      />
    )
  }
}
