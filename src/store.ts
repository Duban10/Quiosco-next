import { create } from 'zustand';
import { OrderItem } from './types';
import { Product } from './generated/prisma/client';

interface Store {
  order: OrderItem[]
  addToOrder: (product: Product) => void,
  incrementQuantity: (id: Product['id']) => void,
  decrementQuantity: (id: Product['id']) => void,
  removeItemOrder: (id: Product['id']) => void,
  clearOrder: () => void,
}

const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product) => {
    const { categoryId, image, ...data } = product

    // Verificar si el producto ya está en el pedido
    const existingItem = get().order.find((item) => item.id === data.id);
    let order : OrderItem[] = []
    
    if (existingItem) {
        // Si ya está, incrementar la cantidad y recalcular el subtotal
        
        order = get().order.map((item) =>
            item.id === data.id
                ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.price }
                : item
        )
        
    } else {
        // Si no está, agregar el producto al pedido
        order = [...get().order, { 
                ...data, 
                quantity: 1, 
                subtotal: 1 * data.price
            }]
    }
    
    set(() => ({ order: order }))
  },
  incrementQuantity: (id: Product['id']) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.price }
          : item
      ),
    }));
  },
  decrementQuantity: (id: Product['id']) => {
      console.log('state', get().order, id)
    set((state) => ({

      order: state.order.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1, subtotal: (item.quantity - 1) * item.price }
          : item
      ),
    }));
  },
  removeItemOrder: (id: Product['id']) => {
    set((state) => ({
      order: state.order.filter((item) => item.id !== id),
    }));
  },
  clearOrder: () => {
    set(() => ({ order: [] }))
  }
}));

export default useStore;
