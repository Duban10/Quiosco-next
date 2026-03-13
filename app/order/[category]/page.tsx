import React from 'react'
import prisma from '@/src/lib/prisma'
import ProductCard from '@/components/products/ProductCard'
import Heading from '@/components/ui/Heading'

async function getProducts(category: string) {
  const categoryData = await prisma.product.findMany({
    where: {
      category:{
        slug: category
      }
    }
  })

  return categoryData
}

export default async function OrderPage({params: {category}}: {params: {category: string}}) {
  console.log('category ---> ', category)
  const products = await getProducts(category)
  console.log('products ---> ', products)
  return (
    <>
      <Heading>Elige y personaliza tu pedido a continuacion</Heading>  
      <div className='grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 items-start'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
