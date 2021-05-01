import { InputHTMLAttributes, ReactElement } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { styled } from '@stitches/react'

const Box = styled('div', {})
const Input = styled('input', {})

export default function SearchInput(
  props: InputHTMLAttributes<HTMLInputElement>
): ReactElement {
  return (
    <Box
      css={{ backgroundColor: '#EFF0F6' }}
      className="px-4 py-3 ml-2 rounded-xl flex-row"
    >
      <AiOutlineSearch
        color="#A0A3BD"
        size={20}
        className="inline-block mr-2"
      />
      <Input
        placeholder="Search"
        css={{ backgroundColor: 'transparent', outline: 'none' }}
        {...props}
      />
    </Box>
  )
}
