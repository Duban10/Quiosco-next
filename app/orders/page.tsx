"use client"

import Logo from '@/components/ui/Logo'
import useSWR from 'swr' // SE USA EN CLIENTE
import React from 'react'
import { OrderWithProducts } from '@/src/types'
import LatestOrderItem from '@/components/order/LatestOrderItem'

const OrdersPage = () => {

    const url = '/orders/api'
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 30000, // MEDIO MINUTO
    revalidateOnFocus: false
  })

  if (isLoading) return <p>Cargando ...</p>


  if (data) return (
    <>
      <h1 className='text-center mt-20 text-6xl font-black'>Ordenes listas</h1>
      <Logo />

      {data.length ? (
        <div className='grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10'>
            {data.map(order => (
                <LatestOrderItem 
                    key={order.id}
                    order={order}
                />
            ))}
        </div>
      ):(
        <p className='text-center my-10'>No hay ordenes listas</p>
      )}

    </>
  )
}

export default OrdersPage
