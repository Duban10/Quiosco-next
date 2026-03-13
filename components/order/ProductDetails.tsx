import React, { useMemo } from 'react'
import { MinusIcon, PlusIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { OrderItem } from '@/src/types'
import { formatPrice } from '@/src/utils'
import useStore from '@/src/store'

const MAX_ITEMS = 5
const MIN_ITEMS = 1

const ProductDetails = ({item}: {item: OrderItem}) => {

    const {incrementQuantity, decrementQuantity, removeItemOrder} = useStore((state) => state)

    const disabledIncreaseButton = useMemo(() => {
        return item.quantity >= MAX_ITEMS
    }, [item])

    const disabledDecreaseButton = useMemo(() => {
        return item.quantity <= MIN_ITEMS
    }, [item])

  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
        <div className="space-y-4">
            <div className="flex justify-between items-start">
                <p className="text-xl font-bold">{item.name} </p>

                <button
                type="button"
                onClick={() => removeItemOrder(item.id)}
                >
                <XCircleIcon className="text-red-600 h-8 w-8"/>
                </button>
            </div>
            <p className="text-2xl text-amber-500 font-black">
                {formatPrice(item.price)}
            </p>
            <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
                <button
                    type="button"
                    onClick={() => decrementQuantity(item.id)}
                    className='disabled:opacity-10'
                    disabled={disabledDecreaseButton}
                >
                    <MinusIcon className="h-6 w-6"/>
                </button>

                <p className="text-lg font-black ">
                {item.quantity}
                </p>

                <button
                    type="button"
                    onClick={() => incrementQuantity(item.id)}
                    disabled={disabledIncreaseButton}
                    className='disabled:opacity-10'
                >
                    <PlusIcon className="h-6 w-6"/>
                </button>
            </div>
            <p className="text-xl font-black text-gray-700">
                Subtotal: {''}
                <span className="font-normal"> 
                {formatPrice(item.subtotal)}
                </span>
            </p>
        </div>
    </div>
  )
}

export default ProductDetails
