import clsx from 'clsx'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType } from 'react'

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>,
  'onClick'
> & {
  active?: boolean
  disabled?: boolean
  icon: ElementType
  label: string
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}

// TODO: take "size" prop which controls the padding
export function Button({
  active = false,
  className,
  disabled = false,
  href,
  icon,
  label,
  onClick,
  ...rest
}: ButtonProps) {
  const Icon = icon

  const enabledClassNames =
    'active:shadow-none active:scale-95 focus:ring-2 focus:ring-cyan-500 hover:transition-all hover:shadow-sm'
  const enabledInactiveClassNames =
    'text-neutral-400 focus:text-neutral-500 hover:text-neutral-500 hover:bg-neutral-200/50'
  const enabledActiveClassNames = 'text-cyan-500 hover:bg-cyan-200/50'
  const disabledClassNames = 'text-neutral-400/50 cursor-not-allowed'

  const classNames = clsx(
    'leading-none rounded-full focus-visible:outline-none',
    disabled && disabledClassNames,
    !disabled && enabledClassNames,
    !disabled && active && enabledActiveClassNames,
    !disabled && !active && enabledInactiveClassNames
  )

  if (typeof href === 'string' && href.length > 0) {
    return (
      <a
        className={clsx(classNames, className)}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        <span className="sr-only">{label}</span>
        <Icon size="1em" aria-hidden="true" />
      </a>
    )
  }

  return (
    <button
      className={clsx(classNames, className)}
      aria-label={label}
      type="button"
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <Icon size="1em" />
    </button>
  )
}
