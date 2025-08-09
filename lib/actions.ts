'use server'

import { revalidatePath } from 'next/cache'
import { Product, CartItem } from '@/types'

// Simulamos una base de datos en memoria
let cart: CartItem[] = []

const products: Product[] = [
  { id: 1, name: "Producto 1", price: 100 },
  { id: 2, name: "Producto 2", price: 200 },
  { id: 3, name: "Producto 3", price: 150 },
  { id: 4, name: "Producto 4", price: 80 },
  { id: 5, name: "Producto 5", price: 250 }
]

export async function getProducts(): Promise<Product[]> {
  // Simulamos latencia de red
  await new Promise(resolve => setTimeout(resolve, 100))
  return products
}

export async function getCart() {
  await new Promise(resolve => setTimeout(resolve, 50))
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

  return {
    items: cart,
    total
  }
}

export async function addToCartAction(prevState: any, formData: FormData) {
  try {
    if (!formData) {
      return {
        success: false,
        message: 'No se recibieron datos del formulario',
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      }
    }

    const productId = Number(formData.get('productId'))

    if (!productId || isNaN(productId)) {
      return {
        success: false,
        message: 'ID de producto inválido',
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      }
    }

    await new Promise(resolve => setTimeout(resolve, 300))

    const product = products.find(p => p.id === productId)

    if (!product) {
      return {
        success: false,
        message: 'Producto no encontrado',
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      }
    }

    const existingItem = cart.find(item => item.product.id === productId)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        product,
        quantity: 1
      })
    }

    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

    revalidatePath('/')

    return {
      success: true,
      message: `${product.name} agregado al carrito`,
      items: cart,
      total
    }
  } catch (error) {
    console.error('Error in addToCartAction:', error)
    return {
      success: false,
      message: 'Error al agregar producto al carrito',
      items: cart,
      total: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    }
  }
}

export async function clearCartAction(prevState: any, formData: FormData) {
  try {
    await new Promise(resolve => setTimeout(resolve, 200))

    cart = []
    revalidatePath('/')

    return {
      success: true,
      message: 'Carrito limpiado exitosamente',
      items: cart,
      total: 0
    }
  } catch (error) {
    console.error('Error in clearCartAction:', error)
    return {
      success: false,
      message: 'Error al limpiar el carrito',
      items: cart,
      total: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    }
  }
}

export async function removeFromCartAction(prevState: any, formData: FormData) {
  try {
    if (!formData) {
      return {
        success: false,
        message: 'No se recibieron datos del formulario',
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      }
    }

    const productId = Number(formData.get('productId'))

    if (!productId || isNaN(productId)) {
      return {
        success: false,
        message: 'ID de producto inválido',
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      }
    }

    await new Promise(resolve => setTimeout(resolve, 200))

    const itemToRemove = cart.find(item => item.product.id === productId)
    cart = cart.filter(item => item.product.id !== productId)
    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

    revalidatePath('/')

    return {
      success: true,
      message: itemToRemove ? `${itemToRemove.product.name} eliminado del carrito` : 'Producto eliminado',
      items: cart,
      total
    }
  } catch (error) {
    console.error('Error in removeFromCartAction:', error)
    return {
      success: false,
      message: 'Error al eliminar producto del carrito',
      items: cart,
      total: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    }
  }
}

export async function optimizeBudgetAction(
  prevState: { error: string | null; result: any },
  formData: FormData
) {
  try {
    if (!formData) {
      return {
        error: 'No se recibieron datos del formulario',
        result: null
      }
    }

    const budgetValue = formData.get('budget')
    const budget = budgetValue ? Number(budgetValue) : 0

    if (!budget || budget <= 0 || isNaN(budget)) {
      return {
        error: 'Por favor ingresa un presupuesto válido',
        result: null
      }
    }

    await new Promise(resolve => setTimeout(resolve, 500))

    const algorithmProducts: Product[] = [
      { id: 1, name: "Producto 1", price: 60 },
      { id: 2, name: "Producto 2", price: 100 },
      { id: 3, name: "Producto 3", price: 120 },
      { id: 4, name: "Producto 4", price: 70 }
    ]

    function findBestCombination(products: Product[], budget: number): Product[] {
      const n = products.length
      const dp: number[][] = Array(n + 1).fill(null).map(() => Array(budget + 1).fill(0))

      for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= budget; w++) {
          const currentProduct = products[i - 1]

          if (currentProduct.price <= w) {
            dp[i][w] = Math.max(
              dp[i - 1][w],
              dp[i - 1][w - currentProduct.price] + currentProduct.price
            )
          } else {
            dp[i][w] = dp[i - 1][w]
          }
        }
      }

      const selectedProducts: Product[] = []
      let w = budget

      for (let i = n; i > 0 && w > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
          selectedProducts.push(products[i - 1])
          w -= products[i - 1].price
        }
      }

      return selectedProducts
    }

    const result = findBestCombination(algorithmProducts, budget)
    const totalPrice = result.reduce((sum, product) => sum + product.price, 0)

    return {
      error: null,
      result: {
        products: result,
        totalPrice,
        budget,
        remaining: budget - totalPrice,
        algorithmProducts
      }
    }
  } catch (error) {
    console.error('Error in optimizeBudgetAction:', error)
    return {
      error: 'Error al procesar la optimización',
      result: null
    }
  }
}
