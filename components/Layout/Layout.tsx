import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineHome } from 'react-icons/ai'
import { MdSearch } from 'react-icons/md'
import { RiDashboardLine } from 'react-icons/ri'
import { AiOutlineDatabase } from 'react-icons/ai'

import NavItem from './NavItem'
import styles from './styles.module.scss'

const iconSize = 24
type NavItemProps = { link: string; icon: React.ReactElement }
const mainLinks: NavItemProps[] = [
  {
    link: '/home',
    icon: <AiOutlineHome color="white" size={iconSize} />,
  },
  {
    link: '/dashboard',
    icon: <RiDashboardLine color="white" size={iconSize} />,
  },
  {
    link: '/companies',
    icon: <AiOutlineDatabase color="white" size={iconSize} />,
  },
]

interface Props {
  children: React.ReactElement
}

export default function Layout({ children }: Props): React.ReactElement {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <nav className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <Link href="/home">
            <a>
              <Image
                src="/logo.png"
                alt="MySalary.fyi Logo"
                height={32}
                width={32}
                className={styles.logo}
              />
            </a>
          </Link>
        </div>
        <NavItem
          selected={router.pathname === '/search'}
          icon={<MdSearch color="white" size={iconSize} />}
          link="/search"
        />
        <div className={styles.divider} />
        <div className={styles.mainLinks}>
          {mainLinks.map((item, index) => (
            <NavItem
              key={index.toString()}
              {...item}
              selected={router.pathname.startsWith(item.link)}
            />
          ))}
        </div>
        <div className={styles.divider} style={{ marginBottom: 0 }} />
        <div className={styles.avatarContainer}>
          <Image src="/avatar.png" height={32} width={32} />
        </div>
      </nav>
      {children}
    </div>
  )
}
