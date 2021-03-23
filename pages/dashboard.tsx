import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ContentCard from '@components/ContentCard'
import Dropdown from '@components/Dropdown'
import Header from '@components/Header'
import SalaryInformation from '@components/SalaryInformation'

import dashboard from './dashboard.module.scss'
import styles from './styles.module.scss'

const toTitleCase = (str: string) => `${str[1].toUpperCase()}${str.slice(2)}`

export default function Directory(): React.ReactElement {
  const router = useRouter()
  const [selected, setSelected] = useState<string>()

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
          {/* <ContentCard
          title="Contributions"
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
        </ContentCard> */}
        </div>
      </main>
    </>
  )
}
