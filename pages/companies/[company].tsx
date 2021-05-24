import { InferGetServerSidePropsType } from 'next'
import ContentCard from '@components/ContentCard'
import Header from '@components/Header'
import SearchInput from '@components/SearchInput'
import Head from 'next/head'
// import { useRouter } from 'next/router'
import { styled } from '@stitches/react'
import { GetServerSidePropsContext } from 'next'
import Error from 'next/error'
import { BsArrowRight } from 'react-icons/bs'
import { AiOutlineTag } from 'react-icons/ai'

import styles from '../styles.module.scss'

const toTitleCase = (str: string) => `${str[0].toUpperCase()}${str.slice(1)}`
const Box = styled('div', {})
const Text = styled('h3', {})

const d1 = [
  'Rococo',
  'Lexmark',
  'Symph',
  'Lexmark',
  'Symph',
  'Lexmark',
  'Symph',
  'Lexmark',
  'Symph',
  'Lexmark',
  'Symph',
  'Lexmark',
  'Symph',
  'Lexmark',
  'Symph',
  'Lexmark',
]

const d = {
  company_name: 'Rococo',
  company_full_name: 'Rococo Global Technologies Corporation',
  description:
    'The largest offshore center of Rococo Japan. It focuses on the development of web and mobile applications.',
  jobs: [
    {
      title: 'Software Engineer',
      top_salaries: ['16,000', '20,000', '25,000', '30,000', '35,000'],
    },
    {
      title: 'Project Manager',
      top_salaries: ['16,000', '20,000', '25,000', '30,000', '35,000'],
    },
  ],
}

function JobTitleCard({
  title,
  top_salaries,
}: {
  title: string
  top_salaries: string[]
}) {
  return (
    <Box css={{ backgroundColor: '#F3EFFF' }} className="p-6 rounded-xl">
      <Box className="flex items-center gap-x-3">
        <Text css={{ color: '#2A00A295' }} className="font-semibold text-xl">
          {title}
        </Text>
        <BsArrowRight color="#2A00A295" size={24} />
      </Box>
      <Box className="flex flex-wrap gap-4 mt-6">
        {top_salaries.map((item, index) => (
          <Box
            key={index}
            className="flex items-center gap-x-2 py-2 px-4 rounded-full "
            css={{ backgroundColor: '#DED3FF95' }}
          >
            <AiOutlineTag color="#2A00A295" size={24} />
            <Text css={{ color: '#2A00A295' }} className="font-semibold">
              {item}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default function CompanyDetail({
  companyName,
  errorCode,
}: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactNode {
  // const { query } = useRouter()

  if (errorCode === 404) return <Error statusCode={errorCode} />

  return (
    <>
      <Head>
        <title>{companyName} | MySalary.fyi</title>
      </Head>
      <main className={styles.main}>
        <Header
          title={companyName}
          breadcrumbs={[
            { title: 'Home', link: '/home' },
            { title: 'Directory', link: '/companies' },
            {
              title: companyName,
              link: `/companies/${companyName.toLowerCase()}`,
            },
          ]}
          rightComponent={
            <Box className="max-w-xl">
              <Text className="text-white font-semibold text-xl mb-2">
                {d.company_full_name}
              </Text>
              <Text className="text-white text-lg">{d.description}</Text>
            </Box>
          }
        />

        <Box
          className="flex flex-col items-center justify-start overflow-y-auto"
          css={{ padding: '5% 0' }}
        >
          <ContentCard
            title={`Compensation at ${companyName}`}
            rightComponent={<SearchInput />}
          >
            <Box className="flex flex-col gap-y-8">
              {d.jobs.map((item, index) => (
                <JobTitleCard
                  title={item.title}
                  top_salaries={item.top_salaries}
                  key={index}
                />
              ))}
            </Box>
          </ContentCard>
        </Box>
      </main>
    </>
  )
}

// eslint-disable-next-line
export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  // call api get data
  let errorCode = 404

  if (d1.some((item) => query.company === item.toLowerCase())) errorCode = 200

  return {
    props: { errorCode, companyName: toTitleCase(query.company as string) },
  }
}
