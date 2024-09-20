import React, { createContext, useContext, useState, ReactNode } from "react";

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
};

type CartItem = {
  product: Product;

  quantity: number;

  totalPrice: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, totalPrice: number) => void;
  clearCart: () => void; // Adiciona a função de limpar o carrinho
  updateCartItemQuantity: (productId: string, newQuantity: number) => void;
  removeCartItem: (productId: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (
    product: Product,
    quantity: number,
    totalPrice: number
  ) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                totalPrice: item.totalPrice + totalPrice,
              }
            : item
        );
      } else {
        return [...prevCart, { product, quantity, totalPrice }];
      }
    });
  };

  // Função para limpar o carrinho
  const clearCart = () => {
    setCart([]);
  };

  const updateCartItemQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeCartItem = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        updateCartItemQuantity,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
