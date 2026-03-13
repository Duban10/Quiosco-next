"use client"

import useStore from '@/src/store'
import { Product } from '@/src/generated/prisma/client'

type AddProductButtonProps = {
    product: Product
}


const AddProductButton = ({product}: AddProductButtonProps) => {
    const addToOrder = useStore((state) => state.addToOrder)

  return (
    <button 
      onClick={() => addToOrder(product) }
    className='bg-indigo-500 hover:bg-indigo-600 w-full text-white px-4 py-2 rounded-md mt-5' type='button'>
        Agregar al pedido
    </button>
  )
}

export default AddProductButton
