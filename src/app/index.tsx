import React from "react";
import { View } from "react-native";
import Routes from "./routes";
import { Stack } from "expo-router";
import CartProvider from "./contexts/CartContext";
import { EmployeeCustomerProvider } from "./contexts/EmployeeCustomerContext";

export default function App() {
  console.log("Debugging component");
  return (
    <View className="flex-1">
      <EmployeeCustomerProvider>
        <CartProvider>
          <Routes />
          <Stack />
        </CartProvider>
      </EmployeeCustomerProvider>
    </View>
  );
}
