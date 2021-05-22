import React, { ReactElement } from 'react'
import Modal from 'react-modal'
import { styled } from '@stitches/react'
import styles from './styles.module.scss'
import { PieChart } from 'react-minimal-pie-chart'
import Button from '@components/Button'
import { useRouter } from 'next/router'

const Box = styled('div', {})
const Text = styled('span', {
  variants: {
    type: {
      subTitle: {
        fontWeight: 400,
        fontSize: '1.125rem',
        lineHeight: '34px',
        letterSpacing: '0.75px',
      },
    },
  },
})
const Price = styled(Text, {
  fontWeight: 600,
  fontSize: '1.5rem',
  lineHeight: '28px',
  letterSpacing: '0.75px',

  variants: {
    size: {
      large: {
        fontSize: '2rem',
        lineHeight: '38px',
        letterSpacing: '1px',
      },
    },
  },
})

const PriceLabel = styled(Text, {
  color: '#767070',
  fontWeight: 400,
  fontSize: '1rem',
  lineHeight: '28px',
  letterSpacing: '0.75px',
})

interface Props {
  isOpen: boolean
  setIsOpen: (arg0: boolean) => void
}

Modal.setAppElement('#__next')

export default function SalaryModal({
  isOpen,
  setIsOpen,
}: Props): ReactElement {
  const router = useRouter()
  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick
      onRequestClose={() => setIsOpen(false)}
      style={{
        overlay: { backgroundColor: '#432A2A50', zIndex: 999 },
        content: {
          zIndex: 99,
          height: 'fit-content',
          width: 'fit-content',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '1.5rem',
          padding: '2.5rem',
        },
      }}
    >
      <Box css={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Box
          css={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '4rem',
          }}
        >
          <Box css={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Box css={{ display: 'flex', flexDirection: 'column' }}>
              <Text className={styles.jobTitle}>SWII</Text>
              <Text type="subTitle">Alliance Software Inc.</Text>
            </Box>
            <Box css={{ display: 'flex', flexDirection: 'column' }}>
              <Price size="large">P30,000</Price>
              <PriceLabel>Total Estimate</PriceLabel>
            </Box>
          </Box>
          <Box>
            <PieChart
              data={[
                { value: 25000, color: 'rgba(108, 223, 167, 1)' },
                { color: 'rgba(70, 148, 247, 1)', value: 5000 },
              ]}
              lineWidth={40}
              style={{ width: '10rem' }}
            />
          </Box>
        </Box>
        <Box css={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Box
            css={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
            }}
          >
            <Box css={{ display: 'flex', flexDirection: 'column' }}>
              <Price css={{ color: 'rgba(108, 223, 167, 1)' }}>P20,000</Price>
              <PriceLabel>Salary</PriceLabel>
            </Box>
            <Box css={{ display: 'flex', flexDirection: 'column' }}>
              <Price css={{ color: 'rgba(70, 148, 247, 1)' }}>P5,000</Price>
              <PriceLabel>Bonus</PriceLabel>
            </Box>
          </Box>
          <Button
            title="Add Salary"
            style={{ borderRadius: 8 }}
            onClick={() => router.push('contribute')}
          />
        </Box>
      </Box>
    </Modal>
  )
}
