import React, { Component } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import Modal from 'react-modal'
import { NextRouter, withRouter } from 'next/router'

import Button from '@components/Button'
import { styled } from '@stitches/react'
import axios from '@utils/axios'
import { toCurency } from '@utils/helpers'

import styles from './styles.module.scss'

interface Props {
  company: number
  level: string
  isOpen: boolean
  setIsOpen: (arg0: boolean) => void
  router: NextRouter
}

interface State {
  contribution: {
    level: string
    company: string
    salary: number
    bonus: number
  }
}

Modal.setAppElement('#__next')

class SalaryModal extends Component<Props> {
  state: State = {
    contribution: {
      level: '',
      company: '',
      salary: 0,
      bonus: 0,
    },
  }

  componentDidMount(): void {
    this.loadContributionDetail()
  }

  // eslint-disable-next-line
  async loadContributionDetail() {
    const contribution = await axios
      .get('api/contributions/contributiondetail/', {
        params: { company: this.props.company, level: this.props.level },
      })
      .then((res) => res.data)

    this.setState({ ...this.state, contribution })
  }

  render(): React.ReactElement {
    return (
      <Modal
        isOpen={this.props.isOpen}
        shouldCloseOnOverlayClick
        onRequestClose={() => this.props.setIsOpen(false)}
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
            <Box
              css={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <Box css={{ display: 'flex', flexDirection: 'column' }}>
                <Text className={styles.jobTitle}>
                  {this.state.contribution.level}
                </Text>
                <Text type="subTitle">{this.state.contribution.company}</Text>
              </Box>
              <Box css={{ display: 'flex', flexDirection: 'column' }}>
                <Price size="large">
                  {toCurency(
                    this.state.contribution.salary +
                      this.state.contribution.bonus
                  )}
                </Price>
                <PriceLabel>Total Estimate</PriceLabel>
              </Box>
            </Box>
            <Box>
              <PieChart
                data={[
                  {
                    value: this.state.contribution.salary,
                    color: 'rgba(108, 223, 167, 1)',
                  },
                  {
                    color: 'rgba(70, 148, 247, 1)',
                    value: this.state.contribution.bonus,
                  },
                ]}
                lineWidth={40}
                style={{ width: '10rem' }}
              />
            </Box>
          </Box>
          <Box
            css={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <Box
              css={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
              }}
            >
              <Box css={{ display: 'flex', flexDirection: 'column' }}>
                <Price css={{ color: 'rgba(108, 223, 167, 1)' }}>
                  {toCurency(this.state.contribution.salary)}
                </Price>
                <PriceLabel>Salary</PriceLabel>
              </Box>
              <Box css={{ display: 'flex', flexDirection: 'column' }}>
                <Price css={{ color: 'rgba(70, 148, 247, 1)' }}>
                  {toCurency(this.state.contribution.bonus)}
                </Price>
                <PriceLabel>Bonus</PriceLabel>
              </Box>
            </Box>
            <Button
              title="Add Salary"
              style={{ borderRadius: 8 }}
              onClick={() => this.props.router.push('contribute')}
            />
          </Box>
        </Box>
      </Modal>
    )
  }
}

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

export default withRouter(SalaryModal)
