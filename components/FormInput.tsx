import { InputHTMLAttributes, ReactElement } from 'react'
import { styled } from '@stitches/react'

const Box = styled('div', {})
const Input = styled('input', {})

interface Props {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export default function SearchInput({
  leftIcon,
  rightIcon,
  ...rest
}: Props & InputHTMLAttributes<HTMLInputElement>): ReactElement {
  return (
    <Box
      css={{ backgroundColor: '#EFF0F6' }}
      className="px-4 py-3 rounded-xl flex-row flex"
    >
      {leftIcon}
      <Input
        css={{ backgroundColor: 'transparent', outline: 'none' }}
        className="h-full flex-grow"
        {...rest}
      />
      {rightIcon}
    </Box>
  )
}
