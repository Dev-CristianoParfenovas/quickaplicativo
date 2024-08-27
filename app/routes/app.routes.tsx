import React from "react";
import { View } from "react-native";
import ProductScreen from "../pages/products/products_screen";

function AppRoutes() {
  return (
    <View className="flex-1">
      <ProductScreen />
    </View>
  );
}

export default AppRoutes;
