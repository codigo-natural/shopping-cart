import { Suspense } from 'react'
import { getProducts, getCart } from '@/lib/actions'
import ProductCard from '@/components/product/ProductCard'
import Cart from '@/components/cart/Cart'
import BudgetOptimizer from '@/components/layout/BudgetOptimizer'
import ThemeToggle from '@/components/theme/ThemeToggle'
import { RefreshCw, Store, Zap } from 'lucide-react'

function ProductsLoading() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className='bg-white p-6 rounded-lg shadow animate-pulse'
        >
          <div className='h-6 bg-gray-200 rounded mb-4'></div>
          <div className='h-8 bg-gray-200 rounded mb-4'></div>
          <div className='h-32 bg-gray-200 rounded mb-4'></div>
          <div className='h-10 bg-gray-200 rounded'></div>
        </div>
      ))}
    </div>
  )
}

function CartLoading() {
  return (
    <div className='bg-white p-6 rounded-lg shadow animate-pulse'>
      <div className='h-6 bg-gray-200 rounded mb-4'></div>
      <div className='space-y-3'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className='h-16 bg-gray-200 rounded'></div>
        ))}
      </div>
    </div>
  )
}

async function ProductsList() {
  const products = await getProducts()

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

async function CartSection() {
  const cart = await getCart()

  return <Cart cart={cart} />
}

export default async function Home() {
  const productsPromise = getProducts()

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8'>
        <div className='fixed top-4 right-4 sm:top-6 sm:right-6 z-50'>
          <ThemeToggle />
        </div>
        <header className='text-center mb-8 sm:mb-12'>
          <div className='flex flex-col sm:flex-row items-center justify-center mb-4 space-y-2 sm:space-y-0'>
            <Store className='w-8 h-8 sm:w-12 sm:h-12 text-blue-600 sm:mr-3' />
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent'>
              Tienda Next.js 15
            </h1>
          </div>
          <p className='text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 px-4'>Powered by React 19 + Next.js 15 con Server Actions y useOptimistic</p>
          <div className='flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-4'>
            <span className='flex items-center'>
              <Zap className='w-4 h-4 mr-1' />
              Server Actions
            </span>
            <span className='flex items-center'>
              <RefreshCw className='w-4 h-4 mr-1' />
              Optimistic Updates
            </span>
            <span className='flex items-center'>
              <Store className='w-4 h-4 mr-1' />
              React 19
            </span>
          </div>
        </header>

        <main className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
          <section className='lg:col-span-2 order-2 lg:order-1'>
            <h2 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 flex items-center text-gray-900 dark:text-gray-100'>
              <Store className='w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-blue-600' />
              Productos Disponibles
            </h2>

            <Suspense fallback={<ProductsLoading />}>
              <ProductsList />
            </Suspense>
          </section>

          <aside className='space-y-4 sm:space-y-6 order-1 lg:order-2'>
            <Suspense fallback={<CartLoading />}>
              <CartSection />
            </Suspense>

            <Suspense
              fallback={
                <div className='bg-white p-6 rounded-lg shadow animate-pulse h-64'></div>
              }
            >
              <BudgetOptimizer products={await productsPromise} />
            </Suspense>
          </aside>
        </main>

        <footer className='mt-8 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700'>
          <div className='text-center text-gray-500 dark:text-gray-400 text-sm'>
            <p className='mb-2'>Construido con las últimas tecnologías</p>
            <div className='flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm'>
              <span>Next.js 15</span>
              <span>•</span>
              <span>React 19</span>
              <span>•</span>
              <span>Server Actions</span>
              <span>•</span>
              <span>useOptimistic</span>
              <span>•</span>
              <span>Suspense</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
