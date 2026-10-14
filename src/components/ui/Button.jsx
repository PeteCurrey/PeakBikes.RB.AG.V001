import React from 'react'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  icon,
  disabled = false,
  ...props
}) {
  const base = variant === 'primary' ? 'pb-btn-primary'
             : variant === 'outline' ? 'pb-btn-outline'
             : 'pb-btn-ghost'

  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: '',
    lg: 'text-lg px-8 py-4',
  }

  const cls = `${base} ${sizes[size]} ${className}`

  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
        {icon && <span className="flex-shrink-0">{icon}</span>}
      </a>
    )
  }

  return (
    <button onClick={onClick} disabled={disabled} className={cls} {...props}>
      {children}
      {icon && <span className="flex-shrink-0">{icon}</span>}
    </button>
  )
}
