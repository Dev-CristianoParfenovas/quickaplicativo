import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: "1", name: "Óleo Sintético" },
  { id: "2", name: "Óleo Mineral" },
  { id: "3", name: "Óleo de Freio" },
  { id: "4", name: "Filtros" },
  { id: "5", name: "Baterias" },
];

const Employee_Customer = () => {
  const [employee, setEmployee] = useState<string>("");

  return (
    <View className="flex-1 justify-start  p-4  bg-gray-100">
      <Text style={styles.title}>Funcionário:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={employee}
          style={styles.picker}
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

        <TextInput />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Employee_Customer;
