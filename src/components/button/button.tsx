import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
// Exemplo de importação de ícones, você pode usar o pacote de sua escolha
import Icon from "react-native-vector-icons/FontAwesome";
import { stylesbutton } from "./button.styles";

interface ButtonProps {
  texto: string; // Expecting a string for the button text
  leftIcon?: React.ReactNode; // Ícone opcional à esquerda
  rightIcon?: React.ReactNode; // Ícone opcional à direita
  onPress?: () => void; // Adicionando o onPress como uma prop
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity style={stylesbutton.btn} onPress={props.onPress}>
      <View style={stylesbutton.content}>
        {props.leftIcon && (
          <View style={stylesbutton.icon}>{props.leftIcon}</View>
        )}
        <Text style={stylesbutton.texto}>{props.texto || "Default Text"}</Text>
        {props.rightIcon && (
          <View style={stylesbutton.icon}>{props.rightIcon}</View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default Button;
