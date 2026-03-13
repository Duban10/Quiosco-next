import { Product } from '@/src/generated/prisma/client'
import { formatPrice } from '@/src/utils/index'
import Image from 'next/image'
import React from 'react'
import AddProductButton from './AddProductButton'

const ProductCard = ({product}: {product: Product}) => {
  return (
    <div>
      <div className='bg-white p-4 rounded-lg shadow-md'>
        <Image 
          width={400}
          height={500}
          src={ product.image.startsWith('https://res.cloudinary.com') ? product.image : `/products/${product.image}.jpg`} 
          alt={product.name} 
          // className='w-full h-40 object-cover rounded-md' 
        />
        <div className='mt-2'>
          <h3 className='text-2xl font-bold'>{product.name}</h3>
          {/* <p className='text-gray-600'>{product.description}</p> */}
          <p className='text-amber-500 text-4xl font-bold mt-5'>{formatPrice(product.price)}</p>
          <AddProductButton 
            product={product}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductCard
