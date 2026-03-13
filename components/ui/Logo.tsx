import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex justify-center items-center mt-5'>
      <div className='relative w-40 h-40'>
        <Image 
            src='/logo.svg'
            alt='Logotipo Fresh Coffe'
            fill={true}
        />
      </div>
    </div>
  )
}

export default Logo
