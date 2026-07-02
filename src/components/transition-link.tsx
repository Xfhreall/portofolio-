'use client'

import React from 'react'
import Link from 'next/link'

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
}

export function TransitionLink({ href, children, ...props }: TransitionLinkProps) {
  const external = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')

  return external ? (
    <a href={href} {...props}>
      {children}
    </a>
  ) : (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}
