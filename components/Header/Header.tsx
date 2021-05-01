import HeaderBackground from '@components/HeaderBackground'
import Link from 'next/link'
import { styled } from '@stitches/react'

import styles from './styles.module.scss'

const Box = styled('div', {})
interface Breadcrumb {
  title: string
  link: string
}

interface Props {
  title: string
  breadcrumbs?: Breadcrumb[]
  rightComponent?: React.ReactNode
}

export default function Header({
  title,
  breadcrumbs,
  rightComponent,
}: Props): React.ReactElement {
  return (
    <HeaderBackground>
      <Box className={styles.container + ' flex justify-between items-start'}>
        <Box className={styles.headerDetails}>
          {breadcrumbs ? (
            <Box className={styles.breadcrumbs}>
              {breadcrumbs.map((item, index) => (
                <Box
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
                </Box>
              ))}
            </Box>
          ) : null}
          <h1 className={styles.headerTitle}>{title}</h1>
        </Box>
        {rightComponent}
      </Box>
    </HeaderBackground>
  )
}
