import React, { ChangeEvent, Component } from 'react'
import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { styled } from '@stitches/react'

import Button from '@components/Button'
import CompaniesList from '@components/CompaniesList'
import ContentCard from '@components/ContentCard'
import { Company, getCompanies } from '@utils/hooks/useCompanies'

interface State {
  search: string
  companiesList: Company[]
}

export default class SearchScreen extends Component<
  InferGetStaticPropsType<typeof getStaticProps>,
  State
> {
  state: State = { search: '', companiesList: this.props.companies }

  setCompaniesList(): void {
    this.setState({
      ...this.state,
      companiesList: this.props.companies.filter((item) =>
        item.short_name.toLowerCase().includes(this.state.search)
      ),
    })
  }

  setSearch(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({ ...this.state, search: e.target.value })
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
              <Button title="Search" onClick={() => this.setCompaniesList()} />
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

// eslint-disable-next-line
export async function getStaticProps() {
  try {
    const companies = await getCompanies()

    return {
      props: { companies },
    }
  } catch (error) {
    return {
      props: { companies: [] },
    }
  }
}

const Box = styled('div', {})
