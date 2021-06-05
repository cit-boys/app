import { styled } from '@stitches/react'
import Link from 'next/link'

interface Props {
  companies: string[]
  title: string
}

export default function CompaniesList({
  companies,
  title,
}: Props): React.ReactElement {
  return (
    <Box>
      {title ? <Title className="font-light mb-3">{title}</Title> : null}
      <Box className="flex flex-wrap gap-4">
        {companies.map((item, index) => (
          <Link href={`/companies/${item.toLowerCase()}`} key={index}>
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

const Box = styled('div', {})
const Title = styled('h3', {})
const CompanyName = styled('span', {})
