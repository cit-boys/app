import { useState } from 'react'
import SalaryModal from './SalaryModal'
import styles from './styles.module.scss'
import { motion } from 'framer-motion'

interface Props {
  label: string
  even: boolean
  company: number
}

export default function Bar({
  label,
  even,
  company,
}: Props): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={styles.barSection}>
        <div className={styles.marker} onClick={() => setIsOpen(true)}>
          <motion.div className={styles.pinHead} whileHover={{ scale: 1.15 }}>
            <span className={styles.label}>{label}</span>
          </motion.div>
          <div
            className={styles.needle}
            style={{ height: even ? '1rem' : '0.5rem' }}
          />
        </div>
      </div>
      <SalaryModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        company={company}
        level={label}
      />
    </>
  )
}
