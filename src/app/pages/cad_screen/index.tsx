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
import { Picker } from "@react-native-picker/picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Input from "@/src/components/input";

const schema = yup.object({
  username: yup.string().required("Informe seu nome!!"),
  email: yup.string().email("Email inválido").required("Informe seu email!!"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 digitos")
    .required("Informe sua senha!!"),

  phone: yup
    .string()
    .matches(/^\d{10,11}$/, "Informe um telefone válido")
    .required("Informe seu telefone!!"),
});

type TipoEmpresaProps = {
  id: string;
  name: string;
};

function maskPhone(value: string): string {
  return value
    .replace(/\D/g, "") // Remove todos os caracteres não numéricos
    .replace(/^(\d{2})(\d)/, "($1) $2") // Adiciona parênteses em volta do DDD
    .replace(/(\d{5})(\d)/, "$1-$2") // Adiciona o hífen depois do quinto dígito
    .replace(/(-\d{4})\d+?$/, "$1"); // Limita o número de caracteres
}

const CadScreen = () => {
  const [tipoEmpresa, setTipoEmpresa] = useState<TipoEmpresaProps[] | []>([]);
  // const [empresaSelected, setEmpresaSelected] = useState<TipoEmpresaProps>();
  const [hidePass, setHidePass] = useState(true);
  const router = useRouter();

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

  function handleSignIn(data: any) {
    handleNavigate();
    console.log(data);
  }

  const navigation = useNavigation<any>(); // Use any para evitar problemas de tipo

  return (
    <View className="flex-1 justify-start items-center p-5 mt-18 bg-gray-100">
      <View className="w-full justify-center items-center">
        <Text className="mt-12 p-2 text-3xl">Cadastre-se aqui</Text>
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>Tipo de Empresa:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipoEmpresa}
            style={styles.picker}
            onValueChange={(itemValue) => setTipoEmpresa(itemValue)}
          >
            <Picker.Item label="Selecione o tipo de empresa" value="" />
            <Picker.Item label="E-commerce" value="ecommerce" />
            <Picker.Item label="Serviços" value="servicos" />
          </Picker>
        </View>

        <Controller //NOME
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              title="Nome/Razão social"
              keyboardType="default"
              IconLeft={MaterialIcons}
              IconLeftName="people"
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
        {errors.username && (
          <Text style={styles.labelError}>{errors.username?.message}</Text>
        )}

        <Controller // Campo de Telefone com máscara
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              title="Digite seu telefone"
              keyboardType="phone-pad"
              IconLeft={MaterialIcons}
              IconLeftName="phone"
              onBlur={onBlur}
              value={value}
              onChangeText={(text) => onChange(maskPhone(text))} // Aplica a máscara
            />
          )}
        />
        {errors.email && (
          <Text style={styles.labelError}>{errors.phone?.message}</Text>
        )}

        <Controller //EMAIL
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              title="Digite seu email"
              keyboardType="email-address"
              IconLeft={MaterialIcons}
              IconLeftName="email"
              /*style={[
                //  styles.input,
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
                // styles.input,
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

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10, // Arredondar as bordas
    marginBottom: 16,
    overflow: "hidden", // Garantir que o conteúdo dentro respeite as bordas arredondadas
    width: "100%",
    height: 56,
  },
  input: {
    height: 52,
    //width: "100%",
    borderRadius: 40,
  },
  button: {
    backgroundColor: "#60a5fa",
    borderRadius: 30,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    height: 50,
    width: 350,
  },
  labelError: {
    height: 52,
    width: "100%",
    alignSelf: "flex-start",
    color: "#ff375b",
    marginBottom: 8,
  },
  picker: {
    height: 50,
    marginBottom: 7,
    backgroundColor: "#e5e7eb",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 10,
  },
});

export default CadScreen;
