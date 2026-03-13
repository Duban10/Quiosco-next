
"use client"
import { useMemo } from 'react'
import { toast } from 'react-toastify'
import useStore from '@/src/store'
import ProductDetails from './ProductDetails'
import { formatPrice } from '@/src/utils'
import { OrderSchema } from '@/src/schema'
import createOrderAction from '@/actions/create-order-action'

export default function OrderSummary() {
  const { order, clearOrder } = useStore((state) => state)
  const total = useMemo(() => order.reduce((acc, item) => acc + item.subtotal, 0), [order])

  const handleCreateOrder = async (formdata: FormData) => {
    // const name = formdata.get('name')
    // console.log('name --> ', name)

    const data = {
      name: formdata.get('name') as string,
      total,
      order
    }

    const result = OrderSchema.safeParse(data)
    console.log('result --> ', result)
    if (!result.success) {
      result.error.issues.forEach((issue) => toast.error(issue.message))
      return
    }

    const response = await createOrderAction(data)
    if (response?.errors) {
      response.errors.forEach((issue) => toast.error(issue.message))
      return
    }

    toast.success('Pedido creado con éxito')
    clearOrder()
  }

  return (
    <aside className='lg:h-screen lg:overflow-y-auto md:w-64 lg:w-96 p-5'>
      <h1 className='text-4xl font-bold text-center'>Mi Pedido</h1>

      { order.length === 0 ? (
        <p className='text-center my-10'>No hay productos en el pedido</p>
      ) : (   
        order.map((item) => (
          <ProductDetails key={item.id} item={item} />          
        )))}

        {
          order.length > 0 && (     
            <>
              <p className='text-2xl text-right mt-20'>
                <span className='font-bold'>Total: {formatPrice(total)}</span> 
              </p>

              <form action={handleCreateOrder} className='w-full mt-10 space-y-5'>
                <input 
                  type="text" 
                  className='bg-white p-2 border border-gray-300 rounded w-full'
                  placeholder='Ingresa tu nombre'
                  name='name'
                />

                <input 
                  type="submit" 
                  className='py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold'
                  value='Confirmar Pedido'
                />
              </form>

            </>
          )
        } 


    </aside>
  )
}

