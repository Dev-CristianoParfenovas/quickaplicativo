import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCart } from "../../contexts/CartContext";

export default function Layout() {
  const { cart } = useCart(); // Acesse os itens do carrinho a partir do contexto

  // Função para calcular o total de itens no carrinho
  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0); // Soma todas as quantidades
  };

  // Atualiza quando a tela ganha foco (quando o usuário retorna da tela de carrinho, por exemplo)
  useFocusEffect(
    useCallback(() => {
      // Aqui você pode chamar qualquer função necessária para atualizar o estado
      getTotalItems();
    }, [cart])
  );

  function handleNavigateCart() {
    router.push("/pages/orders/cart");
  }

  function handleNavigateEmployee_Customer() {
    router.push("");
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: "#60a5fa",
          },

          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      >
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "",

            drawerIcon: ({ focused, size }) => (
              <MaterialIcons
                name="home" // Nome do ícone do Material Icons
                size={size} // Tamanho do ícone
                color={focused ? "#2196f3" : "#000"} // Cor do ícone dependendo do foco
              />
            ),
          }}
        />

        <Drawer.Screen
          name="employee_customer" // Certifique-se de que este caminho está correto e corresponde ao que você deseja.
          options={{
            drawerLabel: "Vendas / Funcionário / Cliente",
            title: "",

            drawerIcon: ({ focused, size }) => (
              <MaterialIcons
                name="people" // Nome do ícone do Material Icons
                size={size} // Tamanho do ícone
                color={focused ? "#2196f3" : "#000"} // Cor do ícone dependendo do foco
              />
            ),
          }}
        />

        <Drawer.Screen
          name="product_service_screen" // Certifique-se de que este caminho está correto e corresponde ao que você deseja.
          options={{
            drawerLabel: "Vendas e Serviços",
            title: "Produtos",

            drawerIcon: ({ focused, size }) => (
              <MaterialIcons
                name="shopping-cart-checkout" // Nome do ícone do Material Icons
                size={size} // Tamanho do ícone
                color={focused ? "#2196f3" : "#000"} // Cor do ícone dependendo do foco
              />
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  // Ação a ser executada ao clicar no botão de carrinho
                  handleNavigateCart();
                }}
                style={{ marginRight: 10 }}
              >
                <View style={style.textcar}>
                  <Text> {getTotalItems()}</Text>
                </View>
                <MaterialIcons name="shopping-cart" size={25} color="#000" />
              </TouchableOpacity>
            ),
          }}
        />
        <Drawer.Screen
          name="productdetail"
          options={{
            drawerItemStyle: { display: "none" }, // Oculta do menu
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const style = StyleSheet.create({
  textcar: {
    fontSize: 5,
    color: "#fff",
    backgroundColor: "yellow",
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
    position: "absolute",
    zIndex: 99,
    bottom: -2,
    left: -8,
  },
});
