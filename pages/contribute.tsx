import Head from 'next/head'
import { styled } from '@stitches/react'
import { Form, Formik } from 'formik'

import Header from '@components/Header'
import ContentCard from '@components/ContentCard'
import DropdownV2 from '@components/DropdownV2'
import FormInput from '@components/FormInput'

import styles from './styles.module.scss'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core'
import Button from '@components/Button'

const Box = styled('div', {})

interface InitialValues {
  company_name: number | null
  level: number | null
  gender: string | null
  highestEd: string
  job_title: string
  yoe: number | null
  yac: number | null
  annual_salary: string
  bonus: string
}

const initialValues: InitialValues = {
  company_name: null,
  level: null,
  gender: null,
  highestEd: '',
  job_title: '',
  yoe: null,
  yac: null,
  annual_salary: '',
  bonus: '',
}

export default function contribute(): React.ReactNode {
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
            <Formik
              initialValues={initialValues}
              onSubmit={() => {
                'asdf'
              }}
            >
              {({ values, setFieldValue, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <Box className="grid grid-cols-2 gap-x-16 gap-y-4">
                    <DropdownV2
                      choices={[
                        { label: 'Rococo', value: 1 },
                        { label: 'Alliance', value: 2 },
                      ]}
                      value={values.company_name}
                      onChange={(v) => setFieldValue('company_name', v)}
                      placeholder="Company Name"
                    />

                    <FormInput
                      name="job_title"
                      value={values.job_title}
                      onChange={handleChange}
                      placeholder="Job Title"
                    />
                    <DropdownV2
                      choices={[
                        { label: 'SWE I', value: 1 },
                        { label: 'SWE II', value: 2 },
                      ]}
                      value={values.level}
                      onChange={(v) => setFieldValue('level', v)}
                      placeholder="Level"
                    />
                    <Box className="grid gap-x-4 grid-cols-2">
                      <FormInput
                        name="yoe"
                        value={values.yoe}
                        onChange={handleChange}
                        placeholder="Years of Experience"
                      />
                      <FormInput
                        name="yac"
                        value={values.yac}
                        onChange={handleChange}
                        placeholder="Years at Company"
                      />
                    </Box>
                    <FormInput
                      name="bonus"
                      value={values.bonus}
                      onChange={handleChange}
                      placeholder="Bonus in Php"
                    />
                    <FormInput
                      name="annual_salary"
                      value={values.annual_salary}
                      onChange={handleChange}
                      placeholder="Annual Salary in PHP"
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
                      value={values.highestEd}
                      onChange={(v) => setFieldValue('highestEd', v)}
                      placeholder="Level"
                    />
                    <FormControl component="fieldset">
                      <FormLabel
                        component="legend"
                        style={{ fontFamily: 'Poppins' }}
                      >
                        Gender
                      </FormLabel>
                      <RadioGroup
                        value={values.gender}
                        onChange={handleChange}
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
                </Form>
              )}
            </Formik>
          </ContentCard>
        </Box>
      </main>
    </>
  )
}
