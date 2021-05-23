import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { styled } from '@stitches/react'
import { Form, Formik } from 'formik'
import { useMutation } from 'react-query'

import axios from '@utils/axios'
import { Company, getCompanies } from '@utils/hooks/useCompanies'

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
  company_name?: number
  level?: number
  gender: string
  highestEd: string
  job_title: string
  yoe?: number
  yac?: number
  annual_salary: string
  bonus: string
}

const initialValues: InitialValues = {
  company_name: undefined,
  level: undefined,
  gender: undefined,
  highestEd: '',
  job_title: '',
  annual_salary: '',
  bonus: '',
}

export default function Contribute({
  companies,
  levels,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactNode {
  const router = useRouter()
  const { mutate } = useMutation(
    (values: any) => axios.post('api/contributions/', values),
    {
      onSuccess: () => router.push('dashboard'),
      onError: (err: any) => console.error(err?.response.data),
    }
  )

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
              onSubmit={(values) => {
                mutate({
                  bonus: parseFloat(values.bonus.replaceAll(',', '')),
                  salary: parseFloat(values.annual_salary.replaceAll(',', '')),
                  years_of_experience: values.yoe,
                  years_at_company: values.yac,
                  highest_academic_level_attained: values.highestEd,
                  company_id: values.company_name,
                  gender: values.gender,
                  job_title: values.job_title,
                  level: values.level,
                })
              }}
            >
              {({ values, setFieldValue, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <Box className="grid grid-cols-2 gap-x-16 gap-y-4">
                    <DropdownV2
                      choices={companies.map((item) => ({
                        label: item.short_name,
                        value: item.id,
                      }))}
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
                      choices={levels.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))}
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
                        type="number"
                      />
                      <FormInput
                        name="yac"
                        value={values.yac}
                        onChange={handleChange}
                        placeholder="Years at Company"
                        type="number"
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

export interface Level {
  id: number
  name: string
  order: number
  company: Company
}

// eslint-disable-next-line
export async function getStaticProps() {
  try {
    const companies = await getCompanies()
    const levels = await axios
      .get<Level[]>('api/levels/')
      .then((res) => res.data || [])

    return {
      props: { companies, levels },
    }
  } catch (error) {
    return {
      props: { companies: [], levels: [] },
    }
  }
}
