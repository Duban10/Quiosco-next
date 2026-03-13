import ProductSearchForm from '@/components/products/ProductSearchForm'
import ProductTable from '@/components/products/ProductTable'
import Heading from '@/components/ui/Heading'
import prisma from '@/src/lib/prisma'
import React from 'react'

async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })
    return products
}

const SearchPage = async ({searchParams}: {searchParams: {search: string}}) => {

    const products = await searchProducts(searchParams.search)
    console.log('products', products)
  return (
    <>
        <Heading>
        Resultados de búsqueda para: {searchParams.search}
        </Heading>

        <div className='flex flex-col lg:flex-row lg:justify-end gap-5'>
            <ProductSearchForm />
        </div>

        {
            products.length ?
                <ProductTable products={products} />
            :
            <p className='text-center pt-10'>No se encontraron productos</p>
        }
    </>
  )
}

export default SearchPage
