import cn from 'classnames'

import styles from './styles.module.scss'

interface Props {
  title: string | React.ReactNode
  classNames?: string[]
}

export default function Button({
  title,
  classNames,
}: Props): React.ReactElement {
  return (
    <div className={cn(styles.container, classNames)}>
      {typeof title === 'string' ? (
        <span className={styles.title}>{title}</span>
      ) : (
        <div>{title}</div>
      )}
    </div>
  )
}
