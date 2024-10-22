// hooks/useCart.ts
import { useState } from 'react';

// Define la interfaz CartItem y la exportamos para que sea accesible
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Agregar un producto al carrito
  const addItemToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }

      return [...prevItems, item];
    });
  };

  // Eliminar un producto del carrito
  const removeItemFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Calcular el total del carrito
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    getTotalPrice,
  };
};
