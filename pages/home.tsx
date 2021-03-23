import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '@components/Header'

const toTitleCase = (str: string) => `${str[1].toUpperCase()}${str.slice(2)}`

export default function Home(): React.ReactElement {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{toTitleCase(router.pathname || 'home')} | MySalary.fyi</title>
      </Head>
      <main>
        <Header title="Home" />
      </main>
    </>
  )
}
