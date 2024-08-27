import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CartItens() {
  return (
    <View className=" flex-1 items-center">
      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2021/12/12/16/10/qr-6865526_640.png",
        }} // URL da imagem do QR Code
        style={{ width: 100, height: 100, marginTop: 205, marginBottom: 20 }} // Ajuste o tamanho e o espaçamento da imagem
      />
      <Text>TOTAL: R$ 850,00</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Ação ao clicar no botão
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            marginRight: 10, // Espaço entre o texto e o ícone
          }}
        >
          Finalizar a compra
        </Text>
        <Ionicons name="checkmark-circle-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#60a5fa",
    flexDirection: "row", // Alinha o texto e o ícone em uma linha
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 16,
    height: 50,
    width: 350,
    marginTop: 70,
  },
});
