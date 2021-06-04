import React, { Component } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { Router } from 'next/router'
import Head from 'next/head'
import { Pagination } from '@material-ui/lab'

import Button from '@components/Button'
import ContentCard from '@components/ContentCard'
import ContributionCard from '@components/ContributionCard'
import DropdownV2 from '@components/DropdownV2'
import Header from '@components/Header'
import SalaryInformation from '@components/SalaryInformation'
import axios from '@utils/axios'
import {
  Contribution,
  DEFAULT_PAGE_SIZE,
  PaginatedResponse,
  parseDatetime,
} from '@utils/helpers'
import { Company } from '@utils/hooks/useCompanies'

import styles from '../pages/styles.module.scss'
import dashboard from './dashboard.module.scss'

interface Props {
  companies: Company[]
  jobs: string[]
  router: Router
}

interface State {
  selectedCompanySalary?: number
  selectedJob?: string
  selectedCompany?: number

  page: number
  isLoading: boolean
  contributions: PaginatedResponse<Contribution>
}

export default class DashboardContent extends Component<Props, State> {
  state: State = {
    selectedCompanySalary: 1,
    selectedJob: undefined,
    selectedCompany: 0,

    page: 1,
    isLoading: false,
    contributions: { count: 0, next: '', previous: '', results: [] },
  }

  componentDidMount(): void {
    this.loadContributions({
      company: this.state.selectedCompany,
      job_title: this.state.selectedJob,
      page: this.state.page,
    })
  }

  // eslint-disable-next-line
  async loadContributions(params: {
    company: number
    job_title: string
    page: number
  }) {
    this.setState({ ...this.state, isLoading: true })

    const contributions = await axios
      .get('api/contributions/', { params })
      .then((res) => res.data)
      .then((data) => ({
        ...data,
        results: data.results.map((item) => ({
          ...item,
          datetime_of_contribution: parseDatetime(
            item.datetime_of_contribution
          ),
          salary: parseFloat(item.salary),
        })),
      }))

    this.setState({ ...this.state, contributions, isLoading: false })
  }

  setSelectedCompanySalary(selectedCompanySalary: number): void {
    this.setState({ ...this.state, selectedCompanySalary })
  }

  setSelectedJob(selectedJob: string): void {
    this.setState({ ...this.state, selectedJob })
  }

  setSelectedCompany(selectedCompany: number): void {
    this.setState({ ...this.state, selectedCompany })
  }

  setPage(page: number): void {
    this.setState({ ...this.state, page })
  }

  render(): React.ReactElement {
    const companiesChoices = this.props.companies.map((item, index) => ({
      label: index ? item.short_name : 'All',
      value: index ? item.id : undefined,
    }))

    const renderContributions = this.state.contributions.results.length ? (
      <div className="flex flex-col items-center justify-center gap-y-8 w-full">
        <div className="w-full flex flex-row justify-between">
          {this.state.contributions.results.map((item, index) => (
            <ContributionCard
              key={index}
              companyName={item.company_name}
              yoe={item.years_of_experience}
              dateContributed={item.datetime_of_contribution}
              job={item.job_title}
              salary={item.salary}
            />
          ))}
        </div>

        <Pagination
          count={Math.ceil(this.state.contributions.count / DEFAULT_PAGE_SIZE)}
          onChange={(_, page) => {
            this.loadContributions({
              company: this.state.selectedCompany,
              job_title: this.state.selectedJob,
              page: page,
            })
            this.setPage(page)
          }}
        />
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center gap-y-8 w-full">
        <ContributionCard
          companyName="foo"
          yoe={0}
          dateContributed={new Date()}
          job="bar"
          salary={0}
        />
        <Pagination
          count={Math.ceil(this.state.contributions.count / DEFAULT_PAGE_SIZE)}
          onChange={(_, page) => this.setPage(page)}
        />
      </div>
    )

    return (
      <>
        <Head>
          <title>
            {toTitleCase(this.props.router.pathname || 'home')} | MySalary.fyi
          </title>
        </Head>
        <main className={styles.main}>
          <Header
            title="Dashboard"
            breadcrumbs={[
              { title: 'Home', link: '/home' },
              { title: 'Dasboard', link: '/dashboard' },
            ]}
          />
          <div className={dashboard.content}>
            <ContentCard
              title="Salary Information"
              subtitle="Software Engineer"
              rightComponent={
                <div className="w-[15rem]">
                  <DropdownV2
                    value={this.state.selectedCompanySalary}
                    onChange={(v) => this.setSelectedCompanySalary(v)}
                    choices={companiesChoices}
                    placeholder="Filter by Company"
                  />
                </div>
              }
            >
              <SalaryInformation company={this.state.selectedCompanySalary} />
            </ContentCard>
            <ContentCard
              title="Contributions"
              rightComponent={
                <Button
                  classNames={[dashboard.contributeButton]}
                  title={
                    (
                      <div className={dashboard.titleContainer}>
                        <span className={dashboard.contributeButton__title}>
                          Contribute
                        </span>
                        <div className={dashboard.right}>
                          <BsArrowRight color="white" size={24} />
                        </div>
                      </div>
                    ) as any
                  }
                  onClick={() => this.props.router.push('contribute')}
                />
              }
            >
              <div>
                <div className={dashboard.filterContainer}>
                  <span className={dashboard.filterContainer__title}>
                    Filters:
                  </span>
                  <div className={dashboard.filterButtonsContainer}>
                    <DropdownV2
                      value={this.state.selectedJob}
                      onChange={(v) => {
                        this.loadContributions({
                          company: this.state.selectedCompany,
                          job_title: v,
                          page: this.state.page,
                        })
                        this.setSelectedJob(v)
                      }}
                      choices={this.props.jobs.map((item) => ({
                        label: item || 'All',
                        value: item,
                      }))}
                      placeholder="Filter by Job"
                    />
                    <DropdownV2
                      value={this.state.selectedCompany}
                      onChange={(v) => {
                        this.loadContributions({
                          company: v,
                          job_title: this.state.selectedJob,
                          page: this.state.page,
                        })
                        this.setSelectedCompany(v)
                      }}
                      choices={companiesChoices}
                      placeholder="Filter by Company"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  {this.state.isLoading ? (
                    <div className="w-full flex items-center justify-center">
                      Loading...
                    </div>
                  ) : (
                    renderContributions
                  )}
                </div>
              </div>
            </ContentCard>
          </div>
        </main>
      </>
    )
  }
}

const toTitleCase = (str: string) => `${str[1].toUpperCase()}${str.slice(2)}`
