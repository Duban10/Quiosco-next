import Heading from '@/components/ui/Heading'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='text-center'>
        <Heading>Ptoducto no encontrado</Heading>
        <Link
            href="/admin/products"
            className='bg-amber-400 text-black px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto hover:bg-amber-500'
        >Ir a productos</Link>
    </div>
  )
}

export default NotFound
