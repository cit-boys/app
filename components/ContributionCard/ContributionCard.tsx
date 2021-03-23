import Image from 'next/image'
import styles from './styles.module.scss'

interface Props {
  name: string
  companyName: string
  yoe: number
  job: string
  dateContributed: string
  salary: string
}

export default function ContributionCard({
  name,
  companyName,
  yoe,
  dateContributed,
  job,
  salary,
}: Props): React.ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.userDetails}>
        <Image
          src="/avatar.png"
          width={32}
          height={32}
          className={styles.avatar}
        />
        <span className={styles.name}>{name}</span>
      </div>
      <div className={styles.grid}>
        <span className={styles.company}>{companyName}</span>
        <span className={styles.yoe}>{yoe} YOE</span>
        <span className={styles.job}>{job}</span>
        <span className={styles.dateContributed}>{dateContributed}</span>
        <span className={styles.salary}>{salary}</span>
      </div>
    </div>
  )
}
