import { styled } from '@stitches/react'
import { toCurency } from '@utils/helpers'
import React, { Component } from 'react'
import { AiOutlineTag } from 'react-icons/ai'

interface Props {
  title: string
  top_salaries: number[]
}

export default class JobTitleCard extends Component<Props> {
  render(): React.ReactElement {
    return (
      <Box css={{ backgroundColor: '#F3EFFF' }} className="p-6 rounded-xl">
        <Box className="flex items-center gap-x-3">
          <Text css={{ color: '#2A00A295' }} className="font-semibold text-xl">
            {this.props.title}
          </Text>
        </Box>
        <Box className="flex flex-wrap gap-4 mt-6">
          {this.props.top_salaries.map((item, index) => (
            <Box
              key={index}
              className="flex items-center gap-x-2 py-2 px-4 rounded-full "
              css={{ backgroundColor: '#DED3FF95' }}
            >
              <AiOutlineTag color="#2A00A295" size={24} />
              <Text css={{ color: '#2A00A295' }} className="font-semibold">
                {toCurency(item)}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    )
  }
}

const Box = styled('div', {})
const Text = styled('h3', {})
