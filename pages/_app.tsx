import { AppProps } from 'next/app'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'

import Layout from '../components/Layout'

import 'tailwindcss/tailwind.css'
import '../styles/global.scss'

const queryClient = new QueryClient()

export default function MyApp({
  Component,
  pageProps,
  router,
}: AppProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} router={router} />
      </Layout>
    </QueryClientProvider>
  )
}
