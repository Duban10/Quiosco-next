import { OrderWithProducts } from '@/src/types'
import React from 'react'

type LatestOrderItemProps = {
    order: OrderWithProducts
}

const LatestOrderItem = ({order}:LatestOrderItemProps) => {
  return (
    <div className='bg-white shadow p-5 space-y-5 rounded-lg'>
        <p className='text-lg font-bold text-slate-600'>
            Cliente: {order.name}
        </p>
      
        <ul className='divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500'>
            {order.orderProducts.map(product => (
                <li className='flex py-6 text-lg'>
                    <p>
                        <span className='font-bold'>
                            ({product.quantity}) {''}
                        </span>
                        {product.product.name}
                    </p>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default LatestOrderItem
