import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { styled } from '@stitches/react'
import { AiOutlineCheck } from 'react-icons/ai'
import { HiOutlineSelector } from 'react-icons/hi'

import styles from './styles.module.scss'

const Text = styled('span', {})

interface Props<T> {
  choices: { label: string; value: T }[]
  value: T
  onChange: (arg0: T) => void
  placeholder?: string
}

export default function Dropdown<T>({
  value,
  choices,
  onChange,
  placeholder = 'Select an option',
}: Props<T>): React.ReactElement {
  const selectedLabel = choices.find((item) => item.value === value)?.label

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <div className="relative mt-1">
            <Listbox.Button
              className="relative w-full py-4 pl-4 pr-10 text-left rounded-xl cursor-pointer focus:outline-none"
              style={{ backgroundColor: '#eff0f6' }}
            >
              <Text
                className="block truncate"
                css={{
                  color: selectedLabel ? '#181818' : 'rgb(160, 163, 189)',
                }}
              >
                {selectedLabel || placeholder}
              </Text>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <HiOutlineSelector
                  color="rgba(156,163,175,1)"
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute w-full py-1 mt-2 overflow-auto text-base rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                style={{ backgroundColor: '#eff0f6' }}
              >
                {choices.map((item, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `${active ? styles.container : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                    }
                    value={item.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? 'font-medium' : 'font-normal'
                          } block truncate`}
                        >
                          {item.label}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? 'text-amber-600' : 'text-amber-600'
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <AiOutlineCheck
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
