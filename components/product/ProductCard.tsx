'use client'

import { Product } from '@/types'
import { ShoppingCart, Plus, Check } from 'lucide-react'
import { addToCartAction } from '@/lib/actions'
import {
  useActionState,
  useOptimistic,
  startTransition,
  useEffect,
  useState,
} from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [state, action, isPending] = useActionState(addToCartAction, {
    success: false,
    message: '',
    items: [],
    total: 0,
  })

  const [optimisticAdded, setOptimisticAdded] = useOptimistic(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (state.success && !isPending) {
      setShowSuccess(true)
      const timer = setTimeout(() => {
        setShowSuccess(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [state.success, isPending])

  const handleAddToCart = () => {
    startTransition(() => {
      setOptimisticAdded(true)
    })
  }

  return (
    <article className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 h-full flex flex-col'>
      <header>
        <h3 className='text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100'>
          {product.name}
        </h3>
      </header>

      <main className='flex-grow'>
        <div className='text-3xl font-bold text-green-600 mb-4'>
          ${product.price}
        </div>
        <figure className='w-full bg-gradient-to-r from-blue-500 to-green-500 h-32 rounded-lg mb-4 flex items-center justify-center'>
          <span className='text-white font-semibold'>Imagen del Producto</span>
        </figure>
      </main>

      <footer className='flex flex-col space-y-2'>
        <form action={action} className='w-full'>
          <input type='hidden' name='productId' value={product.id} />
          <button
            type='submit'
            disabled={isPending}
            onClick={handleAddToCart}
            className='w-full bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 flex items-center justify-center'
          >
            {isPending ? (
              <>
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                Agregando...
              </>
            ) : showSuccess ? (
              <>
                <Check className='w-4 h-4 mr-2' />
                ¡Agregado!
              </>
            ) : optimisticAdded ? (
              <>
                <Plus className='w-4 h-4 mr-2' />
                Procesando...
              </>
            ) : (
              <>
                <ShoppingCart className='w-4 h-4 mr-2' />
                Agregar al Carrito
              </>
            )}
          </button>
        </form>

        {state.message && (
          <div
            className={`text-sm text-center ${
              state.success
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
            role="status"
            aria-live="polite"
          >
            {state.message}
          </div>
        )}
      </footer>
    </article>
  )
}