// src/context/CartContext.js
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

 const removeFromCart = (id, decreaseOnly = false) => {
  setCartItems((prevItems) => {
    const item = prevItems.find((i) => i.id === id);
    if (!item) return prevItems;

    if (decreaseOnly && item.quantity > 1) {
      return prevItems.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      );
    }

    return prevItems.filter((i) => i.id !== id);
  });
};


  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
