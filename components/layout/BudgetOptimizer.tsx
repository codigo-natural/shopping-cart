'use client'

import { useActionState } from 'react'
import { Product } from '@/types'
import { Calculator, Zap } from 'lucide-react'
import { optimizeBudgetAction } from '@/lib/actions'

interface BudgetOptimizerProps {
  products: Product[]
}

const PRODUCTS = [
  { id: 1, name: 'Producto 1', price: 60 },
  { id: 2, name: 'Producto 2', price: 100 },
  { id: 3, name: 'Producto 3', price: 120 },
  { id: 4, name: 'Producto 4', price: 70 },
]

export default function BudgetOptimizer({ products }: BudgetOptimizerProps) {
  const [state, action, isPending] = useActionState(optimizeBudgetAction, {
    error: 'Ingresa un presupuesto para comenzar',
    result: null,
  } as const)

  return (
    <section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700'>
      <header className='mb-6'>
        <h2 className='text-xl font-semibold flex items-center text-gray-900 dark:text-gray-100'>
          <Calculator className='w-5 h-5 mr-2' />
          Optimizador de Presupuesto
          {isPending && (
            <div
              className='ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500'
              aria-hidden='true'
            ></div>
          )}
        </h2>
      </header>

      <main className='space-y-4'>
        <p className='text-sm text-gray-600 dark:text-gray-300'>
          Encuentra la mejor combinación usando algoritmo de programación
          dinámica.
        </p>

        <section>
          <h3 className='font-medium text-gray-900 dark:text-gray-100 mb-3'>
            Productos disponibles:
          </h3>
          <ul className='grid grid-cols-1 gap-2'>
            {PRODUCTS.map((product) => (
              <li
                key={product.id}
                className='flex justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded'
              >
                <span className='text-sm text-gray-900 dark:text-gray-100'>
                  {product.name}
                </span>
                <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                  ${product.price}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <form action={action} className='space-y-4'>
          <div className='flex flex-col sm:flex-row gap-2'>
            <label htmlFor='budget' className='sr-only'>
              Presupuesto
            </label>
            <input
              id='budget'
              name='budget'
              type='number'
              placeholder='Ingresa tu presupuesto'
              min='1'
              required
              className='flex-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
            <button
              type='submit'
              disabled={isPending}
              className='bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 flex items-center'
            >
              {isPending ? (
                <>
                  <div
                    className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'
                    aria-hidden='true'
                  ></div>
                  Calculando...
                </>
              ) : (
                <>
                  <Zap className='w-4 h-4 mr-2' />
                  Optimizar
                </>
              )}
            </button>
          </div>
        </form>

        {state.error && (
          <div
            className='p-3 bg-blue-600/20 dark:bg-blue-900/20 border border-blue-700 dark:border-blue-700 rounded-lg'
            role='alert'
          >
            <p className='text-gray-700 dark:text-gray-200 text-sm'>
              {state.error}
            </p>
          </div>
        )}

        {state.result && (
          <section className='mt-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg border border-gray-200 dark:border-gray-600'>
            <header className='mb-3'>
              <h3 className='font-medium text-blue-900 dark:text-blue-300 flex items-center'>
                <Zap className='w-4 h-4 mr-2' />
                Combinación óptima para ${state.result.budget}:
              </h3>
            </header>

            {state.result.products.length > 0 ? (
              <div className='space-y-3'>
                <ul className='space-y-3'>
                  {state.result.products.map((product: Product) => (
                    <li
                      key={product.id}
                      className='flex justify-between text-sm bg-white dark:bg-gray-700 p-2 rounded'
                    >
                      <span className='text-gray-900 dark:text-gray-100'>
                        {product.name}
                      </span>
                      <span className='font-medium text-gray-900 dark:text-gray-100'>
                        ${product.price}
                      </span>
                    </li>
                  ))}
                </ul>
                <footer className='border-t pt-3 space-y-2'>
                  <div className='flex justify-between font-bold text-blue-900 dark:text-blue-300'>
                    <span>Total optimizado:</span>
                    <span>${state.result.totalPrice}</span>
                  </div>
                  <div className='flex justify-between text-sm text-blue-700 dark:text-blue-400'>
                    <span>Presupuesto restante:</span>
                    <span>${state.result.remaining}</span>
                  </div>
                  <div className='text-xs text-blue-600 dark:text-blue-400 mt-2'>
                    ✨ Eficiencia:{' '}
                    {(
                      (state.result.totalPrice / state.result.budget) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </footer>
              </div>
            ) : (
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                No se encontraron productos que se ajusten al presupuesto.
              </p>
            )}
          </section>
        )}
      </main>
    </section>
  )
}
