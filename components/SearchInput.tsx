import FormInput from './FormInput'
import { AiOutlineSearch } from 'react-icons/ai'

export default function SearchInput(): React.ReactElement {
  return (
    <FormInput
      placeholder="Search"
      leftIcon={
        <AiOutlineSearch
          color="#A0A3BD"
          size={20}
          className="inline-block mr-2"
        />
      }
    />
  )
}
