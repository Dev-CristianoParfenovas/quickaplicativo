import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Input from "@/src/components/input";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "@/src/components/button/button";
import { Ionicons } from "@expo/vector-icons";
import { Href, router, useRouter } from "expo-router";

interface Customer {
  id: string;
  name: string;
}

const customers: Customer[] = [
  {
    id: "1",
    name:
      "Distr. de Bebidas Corotis\n" +
      "Fone: (11)98752-7374\n" +
      "Rua dos Alcools, 11",
  },
];

const Employee_Customer = () => {
  // Supondo que customers seja uma lista pré-definida de clientes
  const customers: Customer[] = [
    { id: "1", name: "Transportes Sinivaldo Express" },
    { id: "2", name: "Cristiano Mendes da Silva" },
    { id: "3", name: "Juca Bala" },
  ];

  const [employee, setEmployee] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [filteredCustomers, setFilteredCustomers] =
    useState<Customer[]>(customers);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  ); // Define selectedCustomer corretamente

  const router = useRouter();

  // Função para navegar e enviar parâmetros
  function handleNavigateProducts() {
    if (employee && selectedCustomer) {
      router.push({
        pathname: "../screens/product_service_screen",
        params: {
          employee,
          customer: selectedCustomer.name, // Enviar o nome do cliente selecionado
        },
      });
    } else {
      alert("Por favor, selecione um funcionário e um cliente.");
    }
  }

  // Função para filtrar os clientes com base no texto digitado
  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  return (
    <View className="flex-1 justify-start p-5 bg-gray-100">
      <Text style={styles.title}>Funcionário:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={employee}
          style={styles.picker}
          onValueChange={(itemValue) => setEmployee(itemValue)}
        >
          <Picker.Item label="Selecione o funcionário" value="" />
          <Picker.Item label="João" value="João" />
          <Picker.Item label="Pedro" value="Pedro" />
          <Picker.Item label="José" value="José" />
          <Picker.Item label="Carlos" value="Carlos" />
          <Picker.Item label="Ana" value="Ana" />
          <Picker.Item label="Márcia" value="Márcia" />
        </Picker>
      </View>

      <Text style={styles.title}>Buscar por:</Text>
      <Input
        title="Placa / Telefone / Nome"
        IconLeft={MaterialIcons}
        IconLeftName="search"
        onChangeText={handleSearch}
      />

      {/* Exibir os resultados filtrados */}
      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedCustomer(item)}>
            <Text
              style={[
                styles.customerItem,
                selectedCustomer?.id === item.id && styles.selectedCustomer,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Button
        texto="Acessar Vendas"
        rightIcon={<Ionicons name="cart-outline" size={24} color="white" />}
        onPress={handleNavigateProducts}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
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
  picker: {
    height: 50,
    marginBottom: 7,
    backgroundColor: "#e5e7eb",
  },
  customerItem: {
    padding: 10,
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
    // Adicione se quiser quebrar linha
    flexWrap: "wrap",
  },
  selectedCustomer: {
    backgroundColor: "#d3d3d3", // Cor de fundo para o item selecionado
  },
});

export default Employee_Customer;
