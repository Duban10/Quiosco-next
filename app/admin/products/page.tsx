import { redirect } from 'next/navigation'
import Link from 'next/link'
import ProductPaginations from '@/components/products/ProductPaginations'
import ProductTable from '@/components/products/ProductTable'
import Heading from '@/components/ui/Heading'
import prisma from '@/src/lib/prisma'
import React from 'react'
import ProductSearchForm from '@/components/products/ProductSearchForm'

async function getTotalProducts() {
  const totalProducts = await prisma.product.count()
  return totalProducts
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize
  const products = await prisma.product.findMany({
    take: pageSize,
    skip, 
    include: {
      category: true
    }
  })
  return products
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({searchParams}: {searchParams: {page: string}}) {

  const page = +searchParams.page || 1
  const pageSize = 10

  // const products = await getProducts(page, pageSize)
  // const totalProducts = await getTotalProducts()

  if (page < 0) redirect(`/admin/products`)

  // CUANDO UNA CONSULTA NO DEPENDENDE DE OTRA, ENTONCES SE PUEDE HACER EN PARALELO
  const productsData = await getProducts(page, pageSize)
  const totalProductsData = await getTotalProducts()
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])

  const totalPages = Math.ceil(totalProducts / pageSize)

  if (page > totalPages) redirect(`/admin/products`)
  
  
  // console.log('products --> ', products)
  console.log('searchParms', searchParams)
  
  return (
    <>
    <Heading>
      Administra tus productos
    </Heading>

    <div className='flex flex-col lg:flex-row lg:justify-between'>
      <Link href='/admin/products/new'
        className='bg-amber-400 w-full text-black p-3 rounded-md lg:w-auto text-xl px-10 py-3 font-bold text-center cursor-pointer'
      >
        Crear Producto
      </Link>
      <ProductSearchForm />
    </div>
    <ProductTable products={products} />
    <ProductPaginations page={page} totalPages={totalPages} />
    </>
  )
}
