import { AppProps } from 'next/app'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Layout from '../components/Layout'

import '../styles/global.scss'

const toTitleCase = (str: string) => `${str[1].toUpperCase()}${str.slice(2)}`

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{toTitleCase(router.pathname)} | MySalary.fyi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
