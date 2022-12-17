import { FC } from 'react'

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
  const baseButton = 'rounded-md font-bold'
  const sizeMode =
    size === 'small'
      ? 'py-1.5 px-4 text-xs'
      : size === 'medium'
      ? 'py-2 px-5 text-sm'
      : size === 'large'
      ? 'py-3 px-6 text-base'
      : size === 'fullwidth'
      ? 'py-3 px-6 w-full text-base'
      : ''

  const className = disabled
    ? `text-gray-400 bg-gray-300 ${baseButton} ${sizeMode}`
    : `text-white bg-blue-800 ${baseButton} ${sizeMode}`
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
