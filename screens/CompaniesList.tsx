import Head from 'next/head'
import Header from '@components/Header'
import ContentCard from '@components/ContentCard'
import { styled } from '@stitches/react'

import styles from '../pages/styles.module.scss'
import Link from 'next/link'
import { Company } from '@utils/hooks/useCompanies'

const Box = styled('div', {})
const Title = styled('h3', {})
const CompanyName = styled('span', {})

interface CompaniesListProps {
  companies: string[]
  title: string
}

function CompaniesList({ companies, title }: CompaniesListProps) {
  return (
    <Box>
      <Title className="font-light mb-4">{title}</Title>
      <Box className="flex flex-wrap gap-4">
        {companies.map((item, index) => (
          <Link href={`/companies/${item.toLocaleLowerCase()}`} key={index}>
            <a>
              <Box
                css={{ backgroundColor: '#F3EFFF', width: 'fit-content' }}
                className="flex items-center justify-center py-3 px-4 rounded-lg cursor-pointer filter hover:brightness-95"
              >
                <CompanyName
                  className="font-semibold"
                  css={{ color: '#5F2EEA95' }}
                >
                  {item}
                </CompanyName>
              </Box>
            </a>
          </Link>
        ))}
      </Box>
    </Box>
  )
}

interface Props {
  companies: {
    popular: Company[]
    unpopular: Company[]
  }
}

export default function Companies({ companies }: Props): React.ReactElement {
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
                companies={companies.popular.map((item) => item.short_name)}
              />
              <CompaniesList
                title="All Companies"
                companies={companies.unpopular.map((item) => item.short_name)}
              />
            </Box>
          </ContentCard>
        </Box>
      </main>
    </>
  )
}
