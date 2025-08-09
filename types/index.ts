export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface CartState {
  cart: Cart;
  isLoading: boolean;
  error: string | null;
}

export interface OptimisticCartItem extends CartItem {
  isPending?: boolean;
}

export interface ActionResponse {
  success: boolean;
  message: string;
  items: CartItem[];
  total: number;
}

export interface OptimizationResult {
  products: Product[];
  totalPrice: number;
  budget: number;
  remaining: number;
  algorithmProducts: Product[];
}

export interface OptimizationResponse {
  error: string | null;
  result: OptimizationResult | null;
}
