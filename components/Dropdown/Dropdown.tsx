import React, { useEffect, useRef, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

import DropdownItem from './DropdownItem'
import styles from './styles.module.scss'

interface DropdownItem {
  label: string
  value: string
}

interface Props {
  selected: string
  setSelected: (str: string) => void
  choices: DropdownItem[]
}

export default function Dropdown({
  choices,
  selected,
  setSelected,
}: Props): React.ReactElement {
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    if (selected === undefined) setSelected(choices[0].value)

    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) setShow(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.header} onClick={() => setShow(!show)}>
        <p className={styles.title}>
          {choices.find((item) => item.value === selected)?.label}
        </p>
        <FiChevronDown size={16} color="#A0A3BD" />
      </div>
      {show ? (
        <div className={styles.choicesContainer}>
          {choices.map((item, index) => (
            <DropdownItem
              label={item.label}
              value={item.value}
              selected={item.value === selected}
              key={index}
              onClick={(e) => {
                setSelected(e.currentTarget.value)
                setShow(false)
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
