import styles from './styles.module.scss'

interface Props {
  title: string
  subtitle?: string
  rightComponent?: React.ReactNode
  children: React.ReactElement
}

export default function ContentCard({
  title,
  subtitle,
  children,
  rightComponent,
}: Props): React.ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <h4 className={styles.subtitle}>{subtitle}</h4>
        </div>

        {rightComponent}
      </div>
      {children}
    </div>
  )
}
