import type { FC } from 'react'
import styles from './Button.module.scss'

export interface ButtonProps {
  primary?: boolean
  backgroundColor?: string
  size?: 'small' | 'medium' | 'large' | 'fullwidth'
  label: string
  disabled?: boolean
  type?: 'button' | 'reset' | 'submit'
  onClick?: () => void
}

export const Button: FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const sizeMode =
    size === 'small'
      ? styles.sizeSmall
      : size === 'medium'
        ? styles.sizeMedium
        : size === 'large'
          ? styles.sizeLarge
          : size === 'fullwidth'
            ? styles.sizeFullwidth
            : ''

  const className = disabled
    ? `${styles.disabled} ${styles.baseButton} ${sizeMode}`
    : `${styles.enabled} ${styles.baseButton} ${sizeMode}`

  return primary ? (
    <button className={className} disabled={disabled} {...props}>
      {label}
    </button>
  ) : (
    <button
      className={className}
      style={{ backgroundColor }}
      disabled={disabled}
      type={type}
      {...props}
    >
      {label}
    </button>
  )
}
