import { StyleSheet } from "react-native";

export const stylesbutton = StyleSheet.create({
  btn: {
    backgroundColor: "#60a5fa",
    borderRadius: 40,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
    marginBottom: 8,
  },
  texto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    padding: 8,
    textAlign: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginHorizontal: 5, // Espaçamento para o ícone
  },
});
