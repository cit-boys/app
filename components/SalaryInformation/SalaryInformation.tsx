import Bar from './Bar'
import SalaryDetail from './SalaryDetail'
import styles from './styles.module.scss'

interface Level {
  label: string
  contributions: number
}

interface Data {
  totalContributions: number
  levels: Level[]
}

const data: Data = {
  totalContributions: 200,
  levels: [
    { label: 'SWE I', contributions: 80 },
    { label: 'SWE II', contributions: 50 },
    { label: 'SWE III', contributions: 45 },
    { label: 'SWE IV', contributions: 25 },
  ],
}

export default function SalaryInformation(): React.ReactElement {
  const barWidths = data.levels.map(
    (level) =>
      ((level.contributions / data.totalContributions) * 100).toString() + 'fr'
  )

  return (
    <div style={{ paddingTop: '4rem' }}>
      <div
        className={styles.bar}
        style={{ gridTemplateColumns: barWidths.join(' ') }}
      >
        {data.levels.map((level, index) => (
          <div key={index}>
            <Bar label={level.label} key={index} even={!!(index % 2)} />
            {index ? (
              <div
                style={{
                  backgroundColor: 'white',
                  height: '100%',
                  width: '1.5rem',
                }}
              />
            ) : null}
          </div>
        ))}
      </div>
      <div className={styles.salaryRange}>
        <SalaryDetail position="left" salary="16,000" />
        <SalaryDetail position="center" salary="16,000" />
        <SalaryDetail position="right" salary="16,000" />
      </div>
    </div>
  )
}
