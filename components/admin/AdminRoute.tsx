'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface linkProps {
    url: string,
    text: string,
    blank: boolean,
}


const AdminRoute = ({link}: {link: linkProps}) => {

    const pathname = usePathname()
    const isActive = pathname.startsWith(link.url)
  return (
    <Link
        className={`font-bold text-lg border-t border-gray-200 last-of-type:border-b py-2 px-4
        ${isActive ? 'bg-amber-400' : ''}`}
        href={link.url}
        target={link.blank ? '_blank' : '_self'}
    >
      {link.text}
    </Link>
  )
}

export default AdminRoute
