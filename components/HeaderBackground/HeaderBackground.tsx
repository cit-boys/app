import styles from './styles.module.scss'

interface Props {
  children: React.ReactElement
}

export default function Header({ children }: Props): React.ReactElement {
  return (
    <header className={styles.container}>
      <div className={styles.bgContainer}>
        <img src="/Wave.svg" className={styles.bg} />
      </div>
      {children}
    </header>
  )
}
