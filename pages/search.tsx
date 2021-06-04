import React, { ChangeEvent, Component } from 'react'
import Head from 'next/head'
import { styled } from '@stitches/react'

import Button from '@components/Button'
import CompaniesList from '@components/CompaniesList'
import ContentCard from '@components/ContentCard'
import { Company, getCompanies } from '@utils/hooks/useCompanies'

interface State {
  search: string
  companiesList: Company[]

  companies: Company[]
  isLoading: boolean
}

export default class SearchScreen extends Component<any, State> {
  state: State = {
    search: '',
    companiesList: [],
    companies: [],
    isLoading: false,
  }

  // eslint-disable-next-line
  async loadCompanies() {
    this.setState({ ...this.state, isLoading: true })

    const companies = await getCompanies()

    this.setState({
      ...this.state,
      companies,
      companiesList: companies,
      isLoading: false,
    })
  }

  componentDidMount(): void {
    this.loadCompanies()
  }

  setCompaniesList(companiesList: Company[]): void {
    this.setState({
      ...this.state,
      companiesList,
    })
  }

  setSearch(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.value === '')
      this.setState({
        ...this.state,
        search: '',
        companiesList: this.state.companies,
      })
    else this.setState({ ...this.state, search: e.target.value })
  }

  handleOnClickSearch(): void {
    this.setCompaniesList(
      this.state.companies.filter((item) =>
        item.short_name.toLowerCase().includes(this.state.search)
      )
    )
  }

  render(): React.ReactElement {
    return (
      <>
        <Head>
          <title>Search | MySalary.fyi</title>
        </Head>
        <main>
          <Box
            className="flex flex-col items-center justify-start overflow-y-auto"
            css={{ padding: '5% 0' }}
          >
            <Box className="w-[85%] px-16 flex justify-between">
              <input
                type="text"
                placeholder="Search"
                className="text-xl py-4 outline-none"
                value={this.state.search}
                onChange={(e) => this.setSearch(e)}
              />
              <Button
                title="Search"
                onClick={() => this.handleOnClickSearch()}
              />
            </Box>
            <ContentCard title="Companies">
              <Box className="flex flex-col gap-y-8">
                <CompaniesList
                  title=""
                  companies={this.state.companiesList.map(
                    (item) => item.short_name
                  )}
                />
              </Box>
            </ContentCard>
          </Box>
        </main>
      </>
    )
  }
}

const Box = styled('div', {})
