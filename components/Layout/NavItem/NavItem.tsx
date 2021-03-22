import Link from 'next/link'

import styles from './styles.module.scss'

interface Props {
  selected: boolean
  icon: React.ReactElement
  link: string
}

export default function NavItem({
  selected,
  icon,
  link,
}: Props): React.ReactElement {
  return (
    <Link href={link}>
      <a>
        <div className={styles.container}>
          <div className={styles.iconContainer}>
            {selected ? <div className={styles.indicator} /> : null}
            {icon}
          </div>
        </div>
      </a>
    </Link>
  )
}
