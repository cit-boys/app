import cn from 'classnames'
import { ButtonHTMLAttributes } from 'react'

import styles from './styles.module.scss'

interface Props {
  title: string | React.ReactElement
  classNames?: string[]
}

export default function Button({
  title,
  classNames,
  ...rest
}: Props & ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  return (
    <button className={cn(styles.container, classNames)} {...rest}>
      {typeof title === 'string' ? (
        <span className={styles.title}>{title}</span>
      ) : (
        <div>{title}</div>
      )}
    </button>
  )
}
