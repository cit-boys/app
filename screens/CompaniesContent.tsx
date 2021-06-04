import React, { Component } from 'react'
import Head from 'next/head'
import { styled } from '@stitches/react'

import { Company } from '@utils/hooks/useCompanies'
import CompaniesList from '@components/CompaniesList'
import ContentCard from '@components/ContentCard'
import Header from '@components/Header'

import styles from '../pages/styles.module.scss'

interface Props {
  companies: {
    popular: Company[]
    unpopular: Company[]
  }
}

export default class CompaniesContent extends Component<Props> {
  render(): React.ReactElement {
    return (
      <>
        <Head>
          <title>Companies | MySalary.fyi</title>
        </Head>
        <main className={styles.main}>
          <Header
            title="Directory"
            breadcrumbs={[
              { title: 'Home', link: '/home' },
              { title: 'Directory', link: '/companies' },
            ]}
          />

          <Box
            className="flex flex-col items-center justify-start overflow-y-auto"
            css={{ padding: '5% 0' }}
          >
            <ContentCard title="Companies">
              <Box className="flex flex-col gap-y-8">
                <CompaniesList
                  title="Popular Companies"
                  companies={this.props.companies.popular.map(
                    (item) => item.short_name
                  )}
                />
                <CompaniesList
                  title="All Companies"
                  companies={this.props.companies.unpopular.map(
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
