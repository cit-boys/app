import ContentCard from '@components/ContentCard'
import Dropdown from '@components/Dropdown'
import Header from '@components/Header'
import SalaryInformation from '@components/SalaryInformation'
import { useState } from 'react'

import dashboard from './dashboard.module.scss'
import styles from './styles.module.scss'

export default function Directory(): React.ReactElement {
  const [selected, setSelected] = useState<string>()

  return (
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
      </div>
    </main>
  )
}
