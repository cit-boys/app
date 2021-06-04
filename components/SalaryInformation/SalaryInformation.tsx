import { useSalaryInfo } from '@utils/hooks'
import { useEffect } from 'react'
import Bar from './Bar'
import SalaryDetail from './SalaryDetail'
import styles from './styles.module.scss'

interface Props {
  company: number
}

export default function SalaryInformation(params: Props): React.ReactElement {
  const {
    data: { max, min, info, median },
    isLoading,
    refetch,
  } = useSalaryInfo({ params })

  useEffect(() => {
    refetch()
  }, [params.company])

  if (isLoading) return null

  const totalContributions = info.reduce(
    (acc, item) => acc + item.contributions,
    0
  )

  const barWidths = info.map(
    (level) =>
      ((level.contributions / totalContributions) * 100).toString() + 'fr'
  )

  return (
    <div style={{ paddingTop: '4rem' }}>
      <div
        className={styles.bar}
        style={{ gridTemplateColumns: barWidths.join(' ') }}
      >
        {info.map((level, index) => (
          <div
            key={index}
            style={{
              display: 'grid',
              gridTemplateColumns: index !== 0 ? 'auto 1fr' : '1fr',
              justifyItems: 'center',
            }}
          >
            {index ? (
              <div
                style={{
                  backgroundColor: 'white',
                  height: '100%',
                  width: '1.5rem',
                }}
              />
            ) : null}
            <Bar
              label={level.level}
              key={index}
              even={!!(index % 2)}
              company={params.company}
            />
          </div>
        ))}
      </div>
      <div className={styles.salaryRange}>
        <SalaryDetail position="left" salary={min} />
        <SalaryDetail position="center" salary={median} />
        <SalaryDetail position="right" salary={max} />
      </div>
    </div>
  )
}
