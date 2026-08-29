'use client'

import Image from 'next/image'
import Link from 'next/link'
import { clsx } from 'clsx'

export interface LogoProps {
  variant?: 'horizontal' | 'mark' | 'app-icon-dark' | 'app-icon-cream'
  theme?: 'dark' | 'white' | 'accent'
  height?: number
  width?: number
  href?: string
  className?: string
  priority?: boolean
  alt?: string
}

export default function Logo({
  variant = 'horizontal',
  theme = 'dark',
  height,
  width,
  href,
  className,
  priority = false,
  alt = 'StandUrl Logo',
}: LogoProps) {
  let src = '/logo-horizontal-dark.svg'
  let defaultWidth = 140
  let defaultHeight = 33

  if (variant === 'horizontal') {
    if (theme === 'white') {
      src = '/logo-horizontal-white.svg'
    } else if (theme === 'accent') {
      src = '/logo-horizontal-accent.svg'
    } else {
      src = '/logo-horizontal-dark.svg'
    }
    defaultWidth = 140
    defaultHeight = 33
  } else if (variant === 'mark') {
    if (theme === 'white') {
      src = '/logo-mark-white.svg'
    } else if (theme === 'accent') {
      src = '/logo-mark-accent.svg'
    } else {
      src = '/logo-mark-dark.svg'
    }
    defaultWidth = 36
    defaultHeight = 36
  } else if (variant === 'app-icon-dark') {
    src = '/app-icon-dark.png'
    defaultWidth = 40
    defaultHeight = 40
  } else if (variant === 'app-icon-cream') {
    src = '/app-icon-cream.png'
    defaultWidth = 40
    defaultHeight = 40
  }

  const finalHeight = height ?? defaultHeight
  const finalWidth = width ?? (height ? Math.round(height * (defaultWidth / defaultHeight)) : defaultWidth)

  const content = (
    <Image
      src={src}
      alt={alt}
      width={finalWidth}
      height={finalHeight}
      priority={priority}
      className={clsx('object-contain inline-block', className)}
    />
  )

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center transition-opacity hover:opacity-90">
        {content}
      </Link>
    )
  }

  return content
}
