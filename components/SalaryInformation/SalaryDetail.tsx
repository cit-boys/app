import cn from 'classnames'
import styles from './styles.module.scss'

type Position = 'left' | 'center' | 'right'
interface Props {
  position: Position
  salary: number
}

const determineTitle = (pos: Position) => {
  if (pos === 'left') return 'Min'
  else if (pos === 'center') return 'Median'
  return 'Max'
}

export default function SalaryDetail({
  position,
  salary,
}: Props): React.ReactElement {
  return (
    <div
      className={cn(styles.salaryDetailContainer, {
        [styles.right]: position === 'right',
        [styles.left]: position === 'left',
        [styles.center]: position === 'center',
      })}
    >
      <h6 className={styles.title}>{determineTitle(position)}</h6>
      <span className={styles.salary}>
        {new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'PHP',
        }).format(salary)}
      </span>
    </div>
  )
}
