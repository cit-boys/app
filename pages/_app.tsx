import { AppProps } from 'next/app'
import Head from 'next/head'

import Layout from '../components/Layout'

import 'tailwindcss/tailwind.css'
import '../styles/global.scss'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
