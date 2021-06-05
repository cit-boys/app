import React, { Component } from 'react'

import ContentCard from '@components/ContentCard'
import Header from '@components/Header'
import Head from 'next/head'
import { styled } from '@stitches/react'
import styles from '../pages/styles.module.scss'
import JobTitleCard from '@components/JobTitleCard'

interface Props {
  companyName: string
  details: Array<{
    job_title: string
    salaries: number[]
  }>
}

export default class CompanyDetailContent extends Component<Props> {
  render(): React.ReactElement {
    return (
      <>
        <Head>
          <title>{this.props.companyName} | MySalary.fyi</title>
        </Head>
        <main className={styles.main}>
          <Header
            title={this.props.companyName}
            breadcrumbs={[
              { title: 'Home', link: '/home' },
              { title: 'Directory', link: '/companies' },
              {
                title: this.props.companyName,
                link: `/companies/${this.props.companyName.toLowerCase()}`,
              },
            ]}
          />

          <Box
            className="flex flex-col items-center justify-start overflow-y-auto"
            css={{ padding: '5% 0' }}
          >
            <ContentCard title={`Compensation at ${this.props.companyName}`}>
              <Box className="flex flex-col gap-y-8">
                {this.props.details.map((item, index) => (
                  <JobTitleCard
                    title={item.job_title}
                    top_salaries={item.salaries}
                    key={index}
                  />
                ))}
              </Box>
            </ContentCard>
          </Box>
        </main>
      </>
    )
  }
}

const Box = styled('div', {})
