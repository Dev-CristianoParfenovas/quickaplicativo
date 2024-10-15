import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useCart } from "../../contexts/CartContext";
import {
  EmployeeCustomerProvider,
  useEmployeeCustomer,
} from "../../contexts/EmployeeCustomerContext";

export default function Layout() {
  const { cart } = useCart(); // Acesse os itens do carrinho a partir do contexto
  const { employee, customer, setEmployee, setCustomer } =
    useEmployeeCustomer();

  const params = useLocalSearchParams();
  // Atualiza o contexto com os parâmetros recebidos
  useFocusEffect(
    useCallback(() => {
      if (params.employee && params.customer) {
        setEmployee(params.employee as string);
        setCustomer(params.customer as string);
      }
    }, [params, setEmployee, setCustomer])
  );

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

  // Função para navegar para o carrinho com os parâmetros
  const handleNavigateCart = () => {
    router.push({
      pathname: "/pages/orders/cart", //"pages/orders/cart",
      params: { employee: employee, customer: customer }, // Passando os parâmetros
    });
  };

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
