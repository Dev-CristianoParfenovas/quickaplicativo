import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

type ProductDetailProps = {
  product: {
    id: string;
    name: string;
    price: string;
    image: string;
  };
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  const router = useRouter();

  const handleAddToCart = () => {
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>R$ {product.price}</Text>
      <Button title="Adicionar ao Carrinho" onPress={handleAddToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    color: "#888",
    marginVertical: 20,
  },
});

export default ProductDetail;
