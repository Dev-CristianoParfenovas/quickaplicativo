import React, { useState } from "react";
import {
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { router } from "expo-router";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/src/components/input";

const schema = yup.object({
  email: yup.string().email("Email inválido").required("Informe seu email!!"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 digitos")
    .required("Informe sua senha!!"),
});

const SignIn = () => {
  const [hidePass, setHidePass] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleNavigate() {
    router.push("../../(drawer)/screens");
  }

  function handleNavigateCad() {
    router.push("/pages/cad_screen");
  }

  function handleSignIn(data: any) {
    console.log(data);
    handleNavigate();
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 justify-center items-center p-5 bg-blue-950">
        <Image
          //LOGO DO SISTEMA
          source={require("../../assets/Logo_QuickApp.png")}
          style={{ width: 229, height: 229 }}
          className="mb-5"
          // Ajuste o tamanho conforme necessário
        />

        <View>
          <Controller //EMAIL
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                title="Digite seu email"
                keyboardType="email-address"
                IconLeft={MaterialIcons}
                IconLeftName="email"
                /* style={[
                  {
                    borderWidth: errors.email && 1,
                    borderColor: errors.email && "#ff375b",
                  },
                ]}*/
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
              <Input
                title="Digite sua senha"
                keyboardType="default"
                IconLeft={Ionicons}
                secureTextEntry={hidePass}
                IconLeftName={hidePass ? "eye-off" : "eye"}
                onIconLeftPress={() => setHidePass(!hidePass)}
                /* style={[
                  styles.input,
                  {
                    borderWidth: errors.email && 1,
                    borderColor: errors.email && "#ff375b",
                  },
                ]}*/
                onBlur={onBlur} //chamado qdo. o textinput é focado
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.labelError}>{errors.password?.message}</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(handleSignIn)}
        >
          <Text className="text-white text-center font-bold text-xl">
            Acessar
          </Text>
        </TouchableOpacity>

        <Text className="mb-5 mt-2 items-end text-gray-300">
          Esqueceu a senha?
        </Text>
        <Text className="mb-5 mt-1 justify-center items-center text-gray-300">
          Ou
        </Text>

        <TouchableOpacity
          style={styles.buttonabrirconta}
          onPress={handleNavigateCad}
        >
          <Text className=" text-gray-600 text-center font-bold text-xl">
            Criar Conta
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
  boxInput: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: "#d1d5db",
    backgroundColor: "#FFF",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },

  inputContainer: {
    width: "100%",
    backgroundColor: "#172554", //"#dbeafe", // Fundo branco semitransparente para os campos de entrada
    borderRadius: 8,
    padding: 3,
    marginBottom: 15,
  },
  input: {
    height: 52,
  },
  button: {
    backgroundColor: "#60a5fa",
    borderRadius: 40,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 350,
    marginBottom: 8,
  },

  buttonabrirconta: {
    backgroundColor: "#FFF",
    borderColor: "#60a5fa",
    borderWidth: 1,
    borderRadius: 30,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 350,
  },
  icon: {
    position: "absolute",
    marginRight: 10,
    left: 8,
    top: 24,
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

export default SignIn;
