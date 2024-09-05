import "../../src/styles/global.css";

import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function RootLayout() {
  function handleNavigateCart() {
    router.push("/pages/orders/cart");
  }

  return (
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
        options={({ navigation }) => ({
          title: "Carrinho",
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="white"
              style={{ marginLeft: 10 }}
              onPress={() => navigation.navigate("product_service_screen")} // Navega para a tela de produtos
            />
          ),
        })}
      />

      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    </Stack>
  );
}
