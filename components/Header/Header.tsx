import HeaderBackground from '@components/HeaderBackground'
import Link from 'next/link'

import styles from './styles.module.scss'

interface Breadcrumb {
  title: string
  link: string
}

interface Props {
  title: string
  breadcrumbs?: Breadcrumb[]
}

export default function Header({
  title,
  breadcrumbs,
}: Props): React.ReactElement {
  return (
    <HeaderBackground>
      <div className={styles.container}>
        <div className={styles.headerDetails}>
          {breadcrumbs ? (
            <div className={styles.breadcrumbs}>
              {breadcrumbs.map((item, index) => (
                <div
                  key={index}
                  style={{ display: 'flex', flexDirection: 'row' }}
                >
                  <Link href={item.link}>
                    <a className={styles.linkTitle}>{item.title}</a>
                  </Link>
                  {breadcrumbs.length !== index + 1 ? (
                    <p
                      className={styles.linkFontStyle}
                      style={{ margin: '0 1rem' }}
                    >
                      /
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
          <h1 className={styles.headerTitle}>{title}</h1>
        </div>
      </div>
    </HeaderBackground>
  )
}
