# Prueba Técnica: API y Carrito de Compras

Una aplicación completa de e-commerce desarrollada con **Next.js 15** y **React 19** que incluye:

- **Backend API RESTful** con Route Handlers
- **Frontend moderno** con React y TypeScript  
- **Carrito de compras** funcional
- **Algoritmo de optimización** de presupuesto (Knapsack Problem)
- **Diseño responsive** con Tailwind CSS

## Características

### Backend (API Routes)
- `GET /api/products` - Lista de productos disponibles
- `POST /api/cart` - Agregar producto al carrito
- `GET /api/cart` - Obtener contenido del carrito
- `DELETE /api/cart` - Limpiar carrito

### Frontend
- **Lista de productos** con interfaz moderna
- **Carrito de compras** con gestión de cantidades
- **Optimizador de presupuesto** que encuentra la mejor combinación de productos
- **Notificaciones toast** para feedback del usuario
- **Estados de carga** y manejo de errores

### Algoritmo de Optimización
Implementa el **problema de la mochila (Knapsack Problem)** para encontrar la combinación óptima de productos que maximice el valor sin exceder el presupuesto dado.

## Tecnologías Utilizadas (React 19 + Next.js 15)

- **Next.js 15** (App Router, Async Request APIs)
- **React 19** (use(), useOptimistic(), useActionState(), Server Actions)
- **TypeScript**
- **Server Actions** para operaciones del servidor
- **Suspense** para loading states
- **useOptimistic** para actualizaciones

## Nuevas Características de React 19 y Next.js 15

### React 19:
- **use()** hook para promises y context
- **useOptimistic()** para actualizaciones optimistas del UI
- **useActionState()** para manejo de estado de Server Actions
- **startTransition()** para transiciones suaves
- **Server Actions** integrados

### Next.js 15:
- **Async Request APIs** 
- **Server Components** mejorados
- **Suspense** nativo para loading states

## Instalación y Ejecución

### Prerrequisitos
- Node.js v22.0.0  
- npm

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/codigo-natural/shopping-cart.git
   cd shopping-cart
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## Pruebas de la API

### Obtener productos
```bash
curl http://localhost:3000/api/products
```

### Agregar producto al carrito
```bash
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 1}'
```

### Ver carrito
```bash
curl http://localhost:3000/api/cart
```

### Limpiar carrito
```bash
curl -X DELETE http://localhost:3000/api/cart
```

## Funcionalidades Implementadas

### Parte 1: Backend
- API RESTful con Next.js 15 Route Handlers
- Endpoint `/api/products` que devuelve lista estática
- Endpoint `/api/cart` para agregar productos
- Endpoint `/api/cart` para obtener carrito
- Carrito en memoria (no persistente)
- Manejo de errores y validaciones

### Parte 2: Frontend
- Interfaz React con TypeScript
- Lista de productos desde la API
- Funcionalidad de agregar al carrito
- Vista del carrito con productos
- Diseño responsive y moderno
- Estados de carga y notificaciones

### Parte 3: Algoritmo
- Función `findBestCombination(products, budget)`
- Implementación del problema de la mochila
- Interfaz para probar con diferentes presupuestos
- Visualización de resultados óptimos


## Algoritmo de Optimización

El optimizador implementa el **problema de la mochila** usando programación dinámica:

```typescript
function findBestCombination(products: Product[], budget: number): Product[] {
  // Implementación del algoritmo de la mochila
  // Encuentra la combinación óptima sin exceder el presupuesto
}
```

**Ejemplo:**
- Presupuesto: $150
- Productos disponibles: 
  - Producto 1: $60
  - Producto 2: $100  
  - Producto 3: $120
  - Producto 4: $70

**Resultado óptimo:** Producto 1 ($60) + Producto 4 ($70) = $130