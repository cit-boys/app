import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { InferGetServerSidePropsType } from 'next'
import { BsArrowRight } from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import axios from '@utils/axios'
import { useContributions } from '@utils/hooks'
import { getCompanies } from '@utils/hooks/useCompanies'
import Button from '@components/Button'
import ContentCard from '@components/ContentCard'
import ContributionCard from '@components/ContributionCard'
import DropdownV2 from '@components/DropdownV2'
import Header from '@components/Header'
import SalaryInformation from '@components/SalaryInformation'
import { Pagination } from '@material-ui/lab'
import { DEFAULT_PAGE_SIZE } from '@utils/helpers'

import styles from '../styles.module.scss'
import dashboard from './dashboard.module.scss'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const toTitleCase = (str: string) => `${str[1].toUpperCase()}${str.slice(2)}`

export default function Directory({
  companies,
  jobs,
}: InferGetServerSidePropsType<typeof getStaticProps>): React.ReactElement {
  const router = useRouter()
  const [selectedCompanySalary, setSelectedCompanySalary] = useState<
    number | string
  >(1)
  const [selectedJob, setSelectedJob] = useState<string>()
  const [selectedCompany, setSelectedCompany] = useState<number | string>()
  const [page, setPage] = useState(1)

  const { data: contributions, refetch, isLoading } = useContributions({
    params: {
      company: selectedCompany as number,
      job_title: selectedJob,
      page,
    },
  })

  useEffect(() => {
    refetch()
  }, [selectedCompany, selectedJob])

  const companiesChoices = companies.map((item, index) => ({
    label: index ? item.short_name : 'All',
    value: index ? item.id : '',
  }))

  const renderContributions = contributions.results.length ? (
    <div className="flex flex-col items-center justify-center gap-y-8 w-full">
      <div className="w-full flex flex-row justify-between">
        {contributions.results.map((item, index) => (
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
        count={Math.ceil(contributions.count / DEFAULT_PAGE_SIZE)}
        onChange={(_, page) => setPage(page)}
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
      <Pagination count={Math.ceil(contributions.count / DEFAULT_PAGE_SIZE)} />
    </div>
  )

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
              <div className="w-[15rem]">
                <DropdownV2
                  value={selectedCompanySalary}
                  onChange={setSelectedCompanySalary}
                  choices={companiesChoices}
                  placeholder="Filter by Company"
                />
              </div>
            }
          >
            <SalaryInformation company={selectedCompanySalary as number} />
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
                onClick={() => router.push('contribute')}
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
                    value={selectedJob}
                    onChange={setSelectedJob}
                    choices={jobs.map((item) => ({
                      label: item || 'All',
                      value: item,
                    }))}
                    placeholder="Filter by Job"
                  />
                  <DropdownV2
                    value={selectedCompany}
                    onChange={setSelectedCompany}
                    choices={companiesChoices}
                    placeholder="Filter by Company"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                {isLoading ? (
                  <div className="w-full flex items-center justify-center">
                    <Loader
                      type="TailSpin"
                      color="#00BFFF"
                      height={40}
                      width={40}
                    />
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

// eslint-disable-next-line
export async function getStaticProps() {
  try {
    const companies = await getCompanies()
    const jobs = await axios
      .get<string[]>('api/jobs/')
      .then((res) => res.data || [])

    companies.unshift({ id: 0, location: '', name: '', short_name: '' })
    jobs.unshift('')

    return {
      props: { companies, jobs },
    }
  } catch (error) {
    return {
      props: { companies: [], jobs: [] },
    }
  }
}
