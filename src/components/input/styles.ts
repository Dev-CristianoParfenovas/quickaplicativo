import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  input: {
    height: "100%",
    width: "100%",
    paddingLeft: 2,
    borderRadius: 40,
  },
  boxInput: {
    width: 350,
    height: 52,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: "#d1d5db",
    backgroundColor: "#FFF",
    marginTop: 2,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingLeft: 5,
  },
  button: {
    width: "10%",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#172554", //"#dbeafe", // Fundo branco semitransparente para os campos de entrada
    borderRadius: 8,
    padding: 3,
    marginBottom: 15,
  },
  icon: {
    position: "absolute",
    marginRight: 10,
    left: 8,
    top: 54,
    color: "#6b7280",
  },
  iconsenha: {
    height: 30,
    width: "10%",
    position: "absolute",
    left: 8,
    top: 97,
    color: "#6b7280",
  },

  labelError: {
    alignSelf: "flex-start",
    color: "#ff375b",
    marginBottom: 8,
  },
});
