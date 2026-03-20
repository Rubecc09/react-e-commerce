import { createContext, useState, useContext } from 'react';

// 1. Create the context
export const CartContext = createContext();

// 2. Create the Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add to Cart Function
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove from Cart Function
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Update Quantity (+/-)
  const updateQuantity = (productId, amount) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.max(1, item.quantity + amount);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  //Clear Cart Function (resets cart after checkout)
  const clearCart = () => {
    setCart([]);
  };

  // Value object to share
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,  // ← Added to exported value
    cartCount: cart.reduce((acc, item) => acc + item.quantity, 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to make usage easier
export const useCart = () => useContext(CartContext);