import React from "react";
import { View } from "react-native";
import Routes from "./routes";
import { Stack } from "expo-router";
import CartProvider from "./contexts/CartContext";

export default function App() {
  return (
    <View className="flex-1">
      <CartProvider>
        <Routes />
        <Stack />
      </CartProvider>
    </View>
  );
}
