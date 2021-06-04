import React, { Component } from 'react'
import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { Router } from 'next/router'
import { styled } from '@stitches/react'

import axios from '@utils/axios'
import { getCompanies } from '@utils/hooks/useCompanies'

import Header from '@components/Header'
import ContentCard from '@components/ContentCard'
import DropdownV2 from '@components/DropdownV2'
import FormInput from '@components/FormInput'
import Button from '@components/Button'

import styles from './styles.module.scss'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core'

export interface Level {
  id: number
  name: string
  order: number
  company: number
}

interface State {
  company_id?: number
  level?: number
  gender?: string
  highest_academic_level_attained?: string
  job_title?: string
  yoe?: number
  yac?: number
  annual_salary?: string
  bonus?: string
}

export default class ContributeForm extends Component<
  InferGetStaticPropsType<typeof getStaticProps> & { router: Router },
  State
> {
  state = {
    company_id: 0,
    level: 0,
    gender: '',
    highest_academic_level_attained: '',
    job_title: '',
    yoe: undefined,
    yac: undefined,
    annual_salary: '',
    bonus: '',
  }

  submitForm(): void {
    axios
      .post('api/contributions/', {
        ...this.state,
        bonus: parseFloat(this.state.bonus.replaceAll(',', '')),
        salary: parseFloat(this.state.annual_salary.replaceAll(',', '')),
      })
      .then(() => this.props.router.push('/dashboard'))
      .catch(console.error)
  }

  setCompanyId(company_id: number): void {
    this.setState({ ...this.state, company_id })
  }

  setJobTitle(job_title: string): void {
    this.setState({ ...this.state, job_title })
  }

  setLevel(level: number): void {
    this.setState({ ...this.state, level })
  }

  setYOE(yoe: number): void {
    this.setState({ ...this.state, yoe })
  }

  setYAC(yac: number): void {
    this.setState({ ...this.state, yac })
  }

  setGender(gender: string): void {
    this.setState({ ...this.state, gender })
  }

  setEducation(highest_academic_level_attained: string): void {
    this.setState({ ...this.state, highest_academic_level_attained })
  }

  setSalary(annual_salary: string): void {
    this.setState({ ...this.state, annual_salary })
  }

  setBonus(bonus: string): void {
    this.setState({ ...this.state, bonus })
  }

  // eslint-disable-next-line
  mapChoices(item: Level) {
    return { label: item.name, value: item.id }
  }

  render(): React.ReactElement {
    return (
      <>
        <Head>
          <title>Contribute | MySalary.fyi</title>
        </Head>

        <main className={styles.main}>
          <Header
            title="Contribute Salary"
            breadcrumbs={[
              { title: 'Home', link: '/home' },
              { title: 'Contribute', link: '/dashboard/contribute' },
            ]}
          />

          <Box
            className="flex flex-col items-center justify-start overflow-y-auto"
            css={{ padding: '5% 0' }}
          >
            <ContentCard title="Add a Salary">
              <form
                method="post"
                onSubmit={(e) => {
                  e.preventDefault()
                  this.submitForm()
                }}
              >
                <Box className="grid grid-cols-2 gap-x-16 gap-y-4">
                  <DropdownV2
                    choices={this.props.companies.map((item, index) => ({
                      label: index ? item.short_name : 'All',
                      value: index ? item.id : 0,
                    }))}
                    value={this.state.company_id}
                    onChange={(id) => this.setCompanyId(id)}
                    placeholder="Company Name"
                  />

                  <FormInput
                    name="job_title"
                    value={this.state.job_title}
                    onChange={(e) => this.setJobTitle(e.target.value)}
                    placeholder="Job Title"
                  />

                  <DropdownV2
                    choices={
                      this.state.company_id
                        ? this.props.levels
                            .filter(
                              (item) => item.company === this.state.company_id
                            )
                            .map(this.mapChoices)
                        : this.props.levels.map(this.mapChoices)
                    }
                    value={this.state.level}
                    onChange={(v) => {
                      // current solution looks like it handles the test case: changing the company if the current level is on a different company
                      // but values.level persists even if the ui looks like it set the field to undefined
                      if (!this.state.company_id)
                        this.setCompanyId(
                          this.props.levels.find((item) => item.company === v)
                            .company
                        )
                      this.setLevel(v)
                    }}
                    placeholder="Level"
                  />

                  <Box className="grid gap-x-4 grid-cols-2">
                    <FormInput
                      name="yoe"
                      value={this.state.yoe}
                      onChange={(e) => this.setYOE(parseInt(e.target.value))}
                      placeholder="Years of Experience"
                      type="number"
                    />
                    <FormInput
                      name="yac"
                      value={this.state.yac}
                      onChange={(e) => this.setYAC(parseInt(e.target.value))}
                      placeholder="Years at Company"
                      type="number"
                    />
                  </Box>

                  <FormInput
                    name="bonus"
                    value={this.state.bonus}
                    onChange={(e) => this.setBonus(e.target.value)}
                    placeholder="Bonus in Php"
                  />
                  <FormInput
                    name="annual_salary"
                    value={this.state.annual_salary}
                    onChange={(e) => this.setSalary(e.target.value)}
                    placeholder="Monthly Salary in PHP"
                  />
                  <DropdownV2
                    choices={[
                      { label: 'None', value: 'N' },
                      { label: 'Grade School', value: 'G' },
                      { label: 'High School', value: 'H' },
                      { label: 'Associate Degree', value: 'A' },
                      { label: "Bachelor's Degree", value: 'B' },
                      { label: "Master's Degree", value: 'M' },
                      { label: 'Doctorate', value: 'D' },
                    ]}
                    value={this.state.highest_academic_level_attained}
                    onChange={(v) => this.setEducation(v)}
                    placeholder="Highest Education Attained"
                  />

                  <FormControl component="fieldset">
                    <FormLabel
                      component="legend"
                      style={{ fontFamily: 'Poppins' }}
                    >
                      Gender
                    </FormLabel>
                    <RadioGroup
                      value={this.state.gender}
                      onChange={(e) => this.setGender(e.target.value)}
                      name="gender"
                      row
                      style={{ fontFamily: 'Poppins' }}
                    >
                      <FormControlLabel
                        value="F"
                        control={<Radio />}
                        label="Female"
                        className={styles.poppins}
                      />
                      <FormControlLabel
                        value="M"
                        control={<Radio />}
                        label="Male"
                        className={styles.poppins}
                      />
                      <FormControlLabel
                        value="O"
                        control={<Radio />}
                        label="Other"
                        className={styles.poppins}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <Box className="flex justify-end mt-2">
                  <Button title="Contibute" type="submit" />
                </Box>
              </form>
            </ContentCard>
          </Box>
        </main>
      </>
    )
  }
}

// eslint-disable-next-line
export async function getStaticProps() {
  try {
    const companies = await getCompanies()
    const levels = await axios
      .get<Level[]>('api/levels/')
      .then((res) => res.data || [])

    companies.unshift({ id: 0, location: '', name: '', short_name: '' })

    return {
      props: { companies, levels },
    }
  } catch (error) {
    return {
      props: { companies: [], levels: [] },
    }
  }
}

const Box = styled('div', {})
