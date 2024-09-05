import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CartProvider from "../../contexts/CartContext";

const Screen_Home = () => {
  return (
    <View style={style.container}>
      <CartProvider>
        <Image
          //LOGO DO SISTEMA
          source={require("../../assets/Logo_QuickApp.png")}
          style={{ width: 229, height: 229 }}
          className="mb-5"
          // Ajuste o tamanho conforme necessário
        />
      </CartProvider>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#172554",
  },
});
export default Screen_Home;
