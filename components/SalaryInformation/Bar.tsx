import { useState } from 'react'
import SalaryModal from './SalaryModal'
import styles from './styles.module.scss'

interface Props {
  label: string
  even: boolean
}

export default function Bar({ label, even }: Props): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={styles.barSection}>
        <div className={styles.marker} onClick={() => setIsOpen(true)}>
          <div className={styles.pinHead}>
            <span className={styles.label}>{label}</span>
          </div>
          <div
            className={styles.needle}
            style={{ height: even ? '1rem' : '0.5rem' }}
          />
        </div>
      </div>
      <SalaryModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
