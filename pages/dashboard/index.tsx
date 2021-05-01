import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ContentCard from '@components/ContentCard'
import Dropdown from '@components/Dropdown'
import Header from '@components/Header'
import SalaryInformation from '@components/SalaryInformation'
import { BsArrowRight } from 'react-icons/bs'

import dashboard from './dashboard.module.scss'
import styles from '../styles.module.scss'
import Button from '@components/Button'
import ContributionCard from '@components/ContributionCard'

const toTitleCase = (str: string) => `${str[1].toUpperCase()}${str.slice(2)}`

export default function Directory(): React.ReactElement {
  const router = useRouter()
  const [selected, setSelected] = useState<string>()
  const [selectedJob, setSelectedJob] = useState<string>()
  const [selectedCompany, setSelectedCompany] = useState<string>()

  return (
    <>
      <Head>
        <title>{toTitleCase(router.pathname || 'home')} | MySalary.fyi</title>
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
              <Dropdown
                choices={[
                  { label: 'Alliance', value: 'alliance' },
                  { label: 'Rococo', value: 'rococo' },
                ]}
                selected={selected}
                setSelected={setSelected}
              />
            }
          >
            <SalaryInformation />
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
              />
            }
          >
            <div>
              <div className={dashboard.filterContainer}>
                <span className={dashboard.filterContainer__title}>
                  Filters:
                </span>
                <div className={dashboard.filterButtonsContainer}>
                  <Dropdown
                    selected={selectedJob}
                    setSelected={setSelectedJob}
                    choices={[
                      { label: 'Software Engineer', value: '1' },
                      { label: 'Project Manager', value: '2' },
                      { label: 'Scrum Master', value: '3' },
                    ]}
                  />
                  <Dropdown
                    selected={selectedCompany}
                    setSelected={setSelectedCompany}
                    choices={[
                      { label: 'Alliance', value: '1' },
                      { label: 'Rococo', value: '2' },
                    ]}
                  />
                </div>
              </div>
              <div
                style={{
                  display: 'grid',
                  columnGap: '1rem',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                }}
              >
                <ContributionCard
                  name="Jane Doe"
                  companyName="Alliance"
                  yoe={4}
                  job="Software Engineer I"
                  dateContributed="2 hours ago"
                  salary="P27,000"
                />
                <ContributionCard
                  name="John Doe"
                  companyName="Alliance"
                  yoe={6}
                  job="Software Engineer I"
                  dateContributed="3 hours ago"
                  salary="P29,000"
                />
                <ContributionCard
                  name="Andres Bonifacio"
                  companyName="Alliance"
                  yoe={7}
                  job="Software Engineer I"
                  dateContributed="5 hours ago"
                  salary="P31,000"
                />
                <ContributionCard
                  name="Jose Rizal"
                  companyName="Alliance"
                  yoe={7}
                  job="Software Engineer II"
                  dateContributed="5 hours ago"
                  salary="P34,000"
                />
              </div>
            </div>
          </ContentCard>
        </div>
      </main>
    </>
  )
}
