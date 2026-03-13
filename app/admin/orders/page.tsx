import OrderCard from '@/components/order/OrderCard'
import Heading from '@/components/ui/Heading'
import prisma from '@/src/lib/prisma'
import React from 'react'


async function getPendingOrders() {
  const orders = await prisma.order.findMany({
    where: {
      status: false,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        }
      }
    }
  })
  return orders
}

const OrderPage = async () => {
  const orders = await getPendingOrders()

  console.log(JSON.stringify(orders, null, 2))
  return (
    <>
    <Heading>
        Administra tus ordenes
    </Heading>

    {
      orders.length ? (
        <div className='grid grid-col grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5'>
          {
          orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
          }
        </div>
      ):(
        <p className='text-center my-10'>No hay ordenes pendientes</p> 
      )
    }
    </>
  )
}

export default OrderPage
