import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useCart } from "../../contexts/CartContext";

interface Category {
  id: string;
  name: string;
}

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
};

type CategoryProps = {
  id: string;
  name: string;
};

type EmployeeProps = {
  id: string;
  name: string;
};

const products = [
  {
    id: "1",
    name: "Óleo Mobil 20w50 SL 1 litro",
    price: "R$ 55,48",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    id: "2",
    name: "Oleo Motor Carro 5w30 100% Sintetico SP - Valvoline",
    price: "R$ 75,39",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    id: "3",
    name: "Óleo Lubrificante do Motor Lubrax Essencial SL 20W50 para Carros 1 Litro",
    price: "R$ 64,39",
    image:
      "data:image/jpeg;base64,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",
  },

  {
    id: "4",
    name: "ÓLEO LUBRIFICANTE MOBIL SUPER 2000 X1 15W40 SL - 1 LITRO",
    price: "R$ 83,69",
    image:
      "data:image/jpeg;base64,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",
  },

  {
    id: "5",
    name: "Óleo De Motor Original Ford Motorcraft 5W30 100% Sintético",
    price: "R$ 44,19",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREkhbdoLvp46WJvo7x8HJewaz6CxLW4AETHg&s",
  },

  {
    id: "6",
    name: "Óleo Ipiranga 20w50",
    price: "R$ 46,19",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROIODF5_b_1QdHwEWtY9endYInlQS627LAwg&s",
  },

  {
    id: "7",
    name: "Óleo Shell Helix HX3 25W-60",
    price: "R$ 74,19",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWGZ_zNdm26cpfCcj8TWMccjK7P_HjRJUPzQ&s",
  },
];

const categories: Category[] = [
  { id: "1", name: "Óleo Sintético" },
  { id: "2", name: "Óleo Mineral" },
  { id: "3", name: "Óleo de Freio" },
  { id: "4", name: "Filtros" },
  { id: "5", name: "Baterias" },
];

const ProductServiceScreen: React.FC = () => {
  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [employee, setEmployee] = useState<EmployeeProps[] | []>([]);

  // Acessando o carrinho e a função de adicionar produto
  const { cart, addToCart } = useCart();

  // Estado para armazenar o item selecionado, começa com o primeiro item
  const [selectedCategory, setSelectedCategory] = useState<string>("1");

  // Função para renderizar cada item do FlatList
  const renderItem = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity
      style={[
        style.categoryItem,
        {
          backgroundColor: selectedCategory === item.id ? "#60a5fa" : "#f0f0f0",
        }, // Muda o fundo se o item estiver selecionado
      ]}
      onPress={() => setSelectedCategory(item.id)} // Atualiza o estado ao clicar
    >
      <Text
        style={[
          style.categoryText,
          { color: selectedCategory === item.id ? "#fff" : "#000" }, // Altera a cor do texto com base na seleção
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  const router = useRouter();

  const handlePress = (id: String) => {
    router.push(`/pages/products/products_detail_screen/${id}`);
  };

  const renderProduct: ListRenderItem<Product> = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.id)}>
      <View className="bg-white rounded-3xl shadow-md p-4 m-2 flex-row items-center">
        <Image
          source={{ uri: item.image }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
        <View className="ml-4 flex-1">
          <Text className="text-lg font-bold" numberOfLines={1}>
            {item.name}{" "}
          </Text>
          <Text className="text-gray-700 ">{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 justify-start  p-4  bg-gray-100">
      <Text style={style.title}>Funcionário:</Text>
      <View style={style.pickerContainer}>
        <Picker
          selectedValue={employee}
          style={style.picker}
          onValueChange={(itemValue) => setEmployee(itemValue)}
        >
          <Picker.Item label="Selecione o funcionário" value="" />
          <Picker.Item label="Jõao" value="joao" />
          <Picker.Item label="Pedro" value="pedro" />
          <Picker.Item label="José" value="jose" />
          <Picker.Item label="Carlos" value="carlos" />
          <Picker.Item label="Ana" value="ana" />
          <Picker.Item label="Marcia" value="marcias" />
        </Picker>
      </View>

      <View style={style.containercategory}>
        <Text style={style.title}>Categoria:</Text>
        <FlatList
          //LISTA AS CATEGORIAS
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false} // Oculta a barra de rolagem
          contentContainerStyle={style.flatListContent}
        />
      </View>

      <FlatList
        //LISTA OS PRODUTOS
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const style = StyleSheet.create({
  icon: {
    position: "absolute",
    marginRight: 10,
    left: 20,
    top: 68,
  },
  input: {
    flex: 1, // O TextInput ocupa o espaço restante
    fontSize: 16,
  },
  picker: {
    height: 50,
    marginBottom: 7,
    backgroundColor: "#e5e7eb",
  },
  categorylist: {
    backgroundColor: "#000",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10, // Arredondar as bordas
    marginBottom: 16,
    overflow: "hidden", // Garantir que o conteúdo dentro respeite as bordas arredondadas
    width: "100%",
    height: 56,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginStart: 5,
    marginBottom: 8,
  },
  labelcategory: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  categoryItem: {
    padding: 8,
    marginHorizontal: 2,

    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "#f3f4f6", // Cor de fundo dos itens
    borderRadius: 16, // Borda arredondada
    alignItems: "center",
    justifyContent: "center",
    //shadowColor: "#000", // Sombra para dar profundidade
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 5,
    //elevation: 5, // Sombra no Android
  },
  categoryText: {
    fontSize: 14, // Tamanho da fonte do texto
    color: "#000", // Cor do texto
    fontWeight: "bold",
  },
  flatListContent: {
    paddingHorizontal: 10, // Adiciona espaçamento horizontal ao conteúdo do FlatList
  },
  containercategory: {
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#f3f4f6", // Cor de fundo da tela
  },
});

export default ProductServiceScreen;