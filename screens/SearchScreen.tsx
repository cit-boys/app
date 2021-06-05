import { useEffect, useState } from 'react'
import { styled } from '@stitches/react'
import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import Button from '@components/Button'
import CompaniesList from '@components/CompaniesList'
import ContentCard from '@components/ContentCard'
import { Company, getCompanies } from '@utils/hooks/useCompanies'

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

const Box = styled('div', {})
