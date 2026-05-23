'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useTransitionNavigate } from './transition-context'

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
}

export function TransitionLink({ href, children, ...props }: TransitionLinkProps) {
  const router = useRouter()
  const { startTransition } = useTransitionNavigate()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Invoke the parent's onClick handler if it exists (e.g. to close the menu overlay)
    if (props.onClick) {
      props.onClick(e)
    }

    if (e.defaultPrevented) return
    if (e.metaKey || e.ctrlKey) return

    e.preventDefault()
    
    // For external links or hash links, handle standard behavior
    if (href.startsWith('http') || href.startsWith('#') || href.includes('mailto:') || href.includes('tel:')) {
      if (href.startsWith('#')) {
        // Smooth scroll to anchor
        const targetId = href.replace('#', '')
        const elem = document.getElementById(targetId)
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        window.open(href, props.target || '_self')
      }
      return
    }

    // Play entrance transition, then route
    startTransition(() => {
      router.push(href)
    })
  }

  return (
    <a href={href} {...props} onClick={handleClick}>
      {children}
    </a>
  )
}
