import { NextRequest, NextResponse } from 'next/server';
import { Product, CartItem } from '@/types';

// Carrito en memoria (en producción usarías una base de datos)
let cart: CartItem[] = [];

const products: Product[] = [
  { id: 1, name: "Producto 1", price: 100 },
  { id: 2, name: "Producto 2", price: 200 },
  { id: 3, name: "Producto 3", price: 150 },
  { id: 4, name: "Producto 4", price: 80 },
  { id: 5, name: "Producto 5", price: 250 }
];

export async function GET() {
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  return NextResponse.json({
    items: cart,
    total
  });
}

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();
    
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' }, 
        { status: 400 }
      );
    }

    // Buscar el producto
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' }, 
        { status: 404 }
      );
    }

    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.product.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        product,
        quantity: 1
      });
    }

    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return NextResponse.json({
      items: cart,
      total,
      message: 'Product added to cart successfully'
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' }, 
      { status: 400 }
    );
  }
}

export async function DELETE() {
  cart = [];
  return NextResponse.json({
    items: cart,
    total: 0,
    message: 'Cart cleared successfully'
  });
}
