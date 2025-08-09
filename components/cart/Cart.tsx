'use client'

import { Cart as CartType, OptimisticCartItem } from '@/types'
import { Trash2, ShoppingBag, X } from 'lucide-react'
import { clearCartAction, removeFromCartAction } from '@/lib/actions'
import { useActionState } from 'react'

interface CartProps {
  cart: {
    items: OptimisticCartItem[]
    total: number
  }
}

export default function Cart({ cart }: CartProps) {
  const [clearState, clearAction, isClearingPending] = useActionState(
    clearCartAction,
    {
      success: false,
      message: '',
      items: [],
      total: 0,
    }
  )

  const [removeState, removeAction, isRemovingPending] = useActionState(
    removeFromCartAction,
    {
      success: false,
      message: '',
      items: [],
      total: 0,
    }
  )

  if (cart.items.length === 0) {
    return (
      <section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700'>
        <div className='flex flex-col items-center justify-center py-8'>
          <ShoppingBag className='w-16 h-16 text-gray-400 mb-4' />
          <p className='text-gray-600 dark:text-gray-300 text-lg'>El carrito está vacío</p>
          <p className='text-gray-500 dark:text-gray-400 text-sm mt-2'>¡Agrega algunos productos!</p>
        </div>
      </section>
    )
  }

  return (
    <section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700'>
      <header className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-semibold flex items-center text-gray-900 dark:text-gray-100'>
          <ShoppingBag className='w-5 h-5 mr-2' />
          Carrito ({cart.items.length})
        </h2>
        <form action={clearAction}>
          <button
            type='submit'
            disabled={isClearingPending}
            className='bg-red-600 dark:bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 flex items-center'
          >
            {isClearingPending ? (
              <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
            ) : (
              <Trash2 className='w-4 h-4 mr-2' />
            )}
            Limpiar
          </button>
        </form>
      </header>
      
      <main className='space-y-4'>
        <ul className='space-y-4'>
          {cart.items.map((item: OptimisticCartItem) => (
            <li
              key={item.product.id}
              className={`flex justify-between items-center py-3 px-2 border-b border-gray-200 dark:border-gray-600 rounded-lg transition-all duration-200 ${
                item.isPending
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className='flex-1'>
                <h4 className='font-medium flex items-center text-gray-900 dark:text-gray-100'>
                  {item.product.name}
                  {item.isPending && (
                    <div className='ml-2 animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500'></div>
                  )}
                </h4>
                <p className='text-sm text-gray-600 dark:text-gray-300'>
                  Cantidad: {item.quantity} × ${item.product.price}
                </p>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='text-right'>
                  <p className='font-semibold text-lg text-gray-900 dark:text-gray-100'>
                    ${item.product.price * item.quantity}
                  </p>
                </div>
                <form action={removeAction}>
                  <input type='hidden' name='productId' value={item.product.id} />
                  <button
                    type='submit'
                    disabled={isRemovingPending}
                    className='text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50'
                    aria-label={`Eliminar ${item.product.name} del carrito`}
                  >
                    <X className='w-4 h-4' />
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>

        <footer className='pt-4 border-t border-gray-200 dark:border-gray-600'>
          <div className='flex justify-between items-center text-xl font-bold mb-4 text-gray-900 dark:text-gray-100'>
            <span>Total:</span>
            <span className='text-green-600 dark:text-green-400'>${cart.total}</span>
          </div>
          <button className='w-full bg-green-600 dark:bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'>
            Proceder al Pago
          </button>
        </footer>
      </main>

      {clearState.message && (
        <div
          className={`mt-4 p-3 border rounded-lg ${
            clearState.success
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300'
          }`}
          role="status"
          aria-live="polite"
        >
          <p className='text-sm'>{clearState.message}</p>
        </div>
      )}

      {removeState.message && (
        <div
          className={`mt-4 p-3 border rounded-lg ${
            removeState.success
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300'
          }`}
          role="status"
          aria-live="polite"
        >
          <p className='text-sm'>{removeState.message}</p>
        </div>
      )}
    </section>
  )
}