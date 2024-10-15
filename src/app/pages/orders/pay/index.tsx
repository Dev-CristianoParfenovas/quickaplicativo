import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const Payment = () => {
  return (
    <View style={styles.container}>
      <Text>Pagamento Pix</Text>
      <Image
        source={{
          uri: "https://i.pinimg.com/originals/01/9a/2d/019a2d16277d159cd2ef1298a4c60ab8.png",
        }}
        style={styles.image}
      />
      <Text style={styles.textototal}>Total: R$ 77,70</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={{ color: "white", fontSize: 16, marginRight: 10 }}>
          Confirmar Pagamento
        </Text>
        <Ionicons name="card" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
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
  textototal: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Payment;
