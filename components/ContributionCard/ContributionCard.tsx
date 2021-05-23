import { formatDistanceToNow } from 'date-fns'
import styles from './styles.module.scss'
import { motion } from 'framer-motion'

interface Props {
  companyName: string
  yoe: number
  job: string
  dateContributed: Date
  salary: number
}

export default function ContributionCard({
  companyName,
  yoe,
  dateContributed,
  job,
  salary,
}: Props): React.ReactElement {
  return (
    <motion.div className={styles.container} whileHover={{ y: -5 }}>
      <span className={styles.name}>{companyName}</span>
      <span className={styles.yoe}>{yoe} YOE</span>
      <span className={styles.job}>{job}</span>
      <span className={styles.dateContributed}>
        submitted {formatDistanceToNow(dateContributed, { addSuffix: true })}
      </span>
      <span className={styles.salary}>
        {new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'PHP',
        }).format(salary)}
      </span>
    </motion.div>
  )
}
