import "../styles/global.css";
import React, { useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Stack, useLocalSearchParams, router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import CartProvider from "./contexts/CartContext";
import { TouchableOpacity } from "react-native";
import {
  EmployeeCustomerProvider,
  useEmployeeCustomer,
} from "./contexts/EmployeeCustomerContext";

export default function Layout() {
  const { employee, customer, setEmployee, setCustomer } =
    useEmployeeCustomer();

  const params = useLocalSearchParams();

  // Atualiza o contexto com os parâmetros recebidos
  useFocusEffect(
    useCallback(() => {
      if (params.employee && params.customer) {
        setEmployee(params.employee as string);
        setCustomer(params.customer as string);
      } else {
        console.log("Parâmetros recebidos: ", params);
      }
    }, [params, setEmployee, setCustomer])
  );

  useEffect(() => {
    // Para garantir que você está sempre trabalhando com valores atualizados
    console.log("Funcionário:", employee);
    console.log("Cliente:", customer);
  }, [employee, customer]);

  const handleNavigateToProductService = () => {
    console.log("Navegando para a tela de produtos com:", {
      employee,
      customer,
    });
    router.push({
      pathname: "../../../screens/product_service_screen",
      params: { employee: employee, customer: customer },
    });
  };

  return (
    <EmployeeCustomerProvider>
      <CartProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#60a5fa",
            },
            headerTintColor: "#FFF",
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen name="index" options={{ title: "" }} />

          <Stack.Screen
            name="pages/products/products_detail_screen/[id]"
            options={{ title: "Detalhe do produto" }}
          />
          <Stack.Screen
            name="pages/cad_screen/index"
            options={{ title: "Cadastro" }}
          />
          <Stack.Screen
            name="pages/orders/cart/index"
            options={{
              headerBackVisible: false,
              title: "Carrinho",
            }}
          />

          <Stack.Screen
            name="pages/orders/pay/index"
            options={{
              headerBackVisible: false,
              title: "Pagamento",
            }}
          />

          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        </Stack>
      </CartProvider>
    </EmployeeCustomerProvider>
  );
}
