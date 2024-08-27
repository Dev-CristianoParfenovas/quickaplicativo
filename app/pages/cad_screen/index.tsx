import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required("Informe seu nome!!"),
  email: yup.string().email("Email inválido").required("Informe seu email!!"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 digitos")
    .required("Informe sua senha!!"),
});

const CadScreen = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleNavigate() {
    router.push("/pages/products/products_screen");
  }

  function handleSignIn(data: any) {
    console.log(data);
    handleNavigate();
  }

  const navigation = useNavigation<any>(); // Use any para evitar problemas de tipo

  return (
    <View className="flex-1 justify-start items-center p-5 mt-15 bg-gray-100">
      <View className="w-full justify-center items-center">
        <Text className="mt-16 p-2 text-3xl">Cadastre-se aqui</Text>
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Controller //NOME
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="w-full mb-5 border border-gray-300 p-4 rounded-3xl bg-white"
              style={[
                styles.input,
                {
                  borderWidth: errors.username && 1,
                  borderColor: errors.username && "#ff375b",
                },
              ]}
              placeholder="Nome"
              onBlur={onBlur} //chamado qdo. o textinput é focado
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.username && (
          <Text style={styles.labelError}>{errors.username?.message}</Text>
        )}

        <Controller //EMAIL
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="w-full mb-5 border border-gray-300 p-4 rounded-3xl bg-white"
              keyboardType="email-address"
              style={[
                styles.input,
                {
                  borderWidth: errors.email && 1,
                  borderColor: errors.email && "#ff375b",
                },
              ]}
              placeholder="Digite seu email"
              onBlur={onBlur} //chamado qdo. o textinput é focado
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.labelError}>{errors.email?.message}</Text>
        )}

        <Controller //SENHA
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="w-full mb-5 border border-gray-300 p-4 rounded-3xl bg-white"
              style={[
                styles.input,
                {
                  borderWidth: errors.password && 1,
                  borderColor: errors.password && "#ff375b",
                },
              ]}
              placeholder="Digite sua senha"
              secureTextEntry={true}
              keyboardType="default" // Permite números e letras
              autoCapitalize="none"
              onBlur={onBlur} //chamado qdo. o textinput é focado
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.labelError}>{errors.password?.message}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(handleSignIn)}
        >
          <Text className="text-white text-center font-bold text-xl">
            Cadastrar
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
  input: {
    height: 57,
  },
  button: {
    backgroundColor: "#60a5fa",
    borderRadius: 16,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    height: 50,
    width: 350,
  },
  labelError: {
    alignSelf: "flex-start",
    color: "#ff375b",
    marginBottom: 8,
  },
});

export default CadScreen;
