import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useSegments, usePathname } from "expo-router";

const Header = ({}) => {
  const router = useRouter();
  const segments = useSegments();

  const { width, height } = Dimensions.get("window");
  const headerHeight = Platform.OS === "ios" ? height * 0.1 : height * 0.12;

  console.log("segments:", segments);

  const isProductsScreen =
    segments.join("/") === "pages/products/products_screen";

  return (
    <SafeAreaView style={{ backgroundColor: "#60a5fa" }}>
      <View
        style={{
          width: width, // Largura total da tela
          height: headerHeight, // Altura responsiva do header
          backgroundColor: "#60a5fa",
          paddingHorizontal: 15,
          elevation: 5,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute", // Faz o header ficar fixo
          top: 0, // Posiciona no topo da tela
          left: 0, // Garantir que o header esteja alinhado à esquerda
          right: 0, // Garantir que o header ocupe a largura total da tela
          zIndex: 10, // Garante que o header fique sobre outros elementos
        }}
      >
        {segments.length > 1 && (
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ position: "absolute", left: 15, top: 55 }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        )}
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          {isProductsScreen ? "Produtos" : ""}
        </Text>

        {isProductsScreen && (
          <TouchableOpacity
            onPress={() => alert("Carrinho pressionado!")}
            style={{ position: "absolute", right: 15, top: 5 }}
          >
            <Ionicons name="cart" size={24} color="#000" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;
