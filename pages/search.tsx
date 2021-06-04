import { styled } from '@stitches/react'

import Link from 'next/link'
import { getCompanies, Company } from '@utils/hooks/useCompanies'
import Head from 'next/head'
import ContentCard from '@components/ContentCard'
import { InferGetStaticPropsType } from 'next'
import { useEffect, useState } from 'react'
import Button from '@components/Button'

const Box = styled('div', {})
const Title = styled('h3', {})
const CompanyName = styled('span', {})

function CompaniesList({
  companies,
  title,
}: {
  companies: string[]
  title: string
}) {
  return (
    <Box>
      {title ? <Title className="font-light mb-3">{title}</Title> : null}
      <Box className="flex flex-wrap gap-4">
        {companies.map((item, index) => (
          <Link href={`/companies/${item.toLocaleLowerCase()}`} key={index}>
            <a>
              <Box
                css={{ backgroundColor: '#F3EFFF', width: 'fit-content' }}
                className="flex items-center justify-center py-3 px-4 rounded-lg cursor-pointer filter hover:brightness-95"
              >
                <CompanyName
                  className="font-semibold"
                  css={{ color: '#5F2EEA95' }}
                >
                  {item}
                </CompanyName>
              </Box>
            </a>
          </Link>
        ))}
      </Box>
    </Box>
  )
}

export default function Search({
  companies,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
  const [companiesList, setcompaniesList] = useState<Company[]>(companies)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (search === '') setcompaniesList(companies)
  }, [search])

  return (
    <>
      <Head>
        <title>Search | MySalary.fyi</title>
      </Head>
      <main>
        <Box
          className="flex flex-col items-center justify-start overflow-y-auto"
          css={{ padding: '5% 0' }}
        >
          <Box className="w-[85%] px-16 flex justify-between">
            <input
              type="text"
              placeholder="Search"
              className="text-xl py-4 outline-none"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <Button
              title="Search"
              onClick={() =>
                setcompaniesList(
                  companies.filter((item) =>
                    item.short_name.toLowerCase().includes(search)
                  )
                )
              }
            />
          </Box>
          <ContentCard title="Companies">
            <Box className="flex flex-col gap-y-8">
              <CompaniesList
                title=""
                companies={companiesList.map((item) => item.short_name)}
              />
            </Box>
          </ContentCard>
        </Box>
      </main>
    </>
  )
}

// eslint-disable-next-line
export async function getStaticProps() {
  try {
    const companies = await getCompanies()

    return {
      props: { companies },
    }
  } catch (error) {
    return {
      props: { companies: [] },
    }
  }
}
