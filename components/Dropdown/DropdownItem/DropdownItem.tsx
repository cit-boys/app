import cn from 'classnames'

import styles from './styles.module.scss'

interface Props {
  label: string
  value: any
  selected: boolean
  onClick: (e: React.MouseEvent<HTMLOptionElement>) => void
}

export default function DropdownItem({
  label,
  value,
  selected,
  onClick,
}: Props): React.ReactElement {
  return (
    <option
      onClick={onClick}
      value={value}
      label={label}
      className={cn([
        styles.label,
        styles.container,
        { [styles.active]: selected },
      ])}
    >
      {label}
    </option>
  )
}
