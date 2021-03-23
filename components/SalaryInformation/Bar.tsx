import styles from './styles.module.scss'

interface Props {
  label: string
  even: boolean
}

export default function Bar({ label, even }: Props): React.ReactElement {
  return (
    <div className={styles.barSection}>
      <div className={styles.marker}>
        <div className={styles.pinHead}>
          <span className={styles.label}>{label}</span>
        </div>
        <div
          className={styles.needle}
          style={{ height: even ? '1rem' : '0.5rem' }}
        />
      </div>
    </div>
  )
}
