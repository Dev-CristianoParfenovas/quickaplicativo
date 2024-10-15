import React from "react";
import { View, Image, StyleSheet } from "react-native";
import CartProvider from "../../contexts/CartContext";
import { EmployeeCustomerProvider } from "../../contexts/EmployeeCustomerContext";

const Screen_Home = () => {
  return (
    <View style={styles.container}>
      <EmployeeCustomerProvider>
        <CartProvider>
          <Image
            //LOGO DO SISTEMA
            source={require("../../assets/Logo_QuickApp.png")}
            style={{ width: 229, height: 229 }}
            className="mb-5"
          />
        </CartProvider>
      </EmployeeCustomerProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#172554",
  },
});
export default Screen_Home;
