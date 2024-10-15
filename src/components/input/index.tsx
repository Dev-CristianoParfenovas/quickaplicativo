import React, { forwardRef, Fragment, LegacyRef } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Ionicons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { style } from "./styles";

const schema = yup.object({
  email: yup.string().email("Email inválido").required("Informe seu email!!"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 digitos")
    .required("Informe sua senha!!"),
});

type IconComponent =
  | React.ComponentType<React.ComponentProps<typeof MaterialIcons>>
  | React.ComponentType<React.ComponentProps<typeof FontAwesome>>
  | React.ComponentType<React.ComponentProps<typeof Octicons>>
  | React.ComponentType<React.ComponentProps<typeof SimpleLineIcons>>
  | React.ComponentType<React.ComponentProps<typeof Ionicons>>;

type Props = TextInputProps & {
  IconLeft?: IconComponent;
  IconRight?: IconComponent;
  IconLeftName?: string;
  IconRightName?: string;
  title?: string;
  onIconLeftPress?: () => void;
  onIconRightPress?: () => void;
};

const Input = forwardRef((Props: Props, ref: LegacyRef<TextInput> | null) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    IconLeft,
    IconRight,
    IconLeftName,
    IconRightName,
    title,
    onIconLeftPress,
    onIconRightPress,
    ...rest
  } = Props;

  const calculateSizeWidth = () => {
    if (IconLeft && IconRight) {
      return "80%";
    } else if (IconLeft || IconRight) {
      return "90%";
    } else {
      return "100%";
    }
  };

  const calculateSizePaddingLeft = () => {
    if (IconLeft && IconRight) {
      return 0;
    } else if (IconLeft || IconRight) {
      return 8;
    } else {
      return 20;
    }
  };

  return (
    <Fragment>
      <View
        style={[style.boxInput, { paddingLeft: calculateSizePaddingLeft() }]}
      >
        {IconLeft && IconLeftName && (
          <TouchableOpacity onPress={onIconLeftPress} style={style.button}>
            <IconLeft name={IconLeftName as any} size={20} color="#6b7280" />
          </TouchableOpacity>
        )}

        <TextInput
          style={[style.input, { width: calculateSizeWidth() }]}
          placeholder={title}
          {...rest}
        />

        {IconRight && IconRightName && (
          <TouchableOpacity onPress={onIconRightPress} style={style.button}>
            <IconRight name={IconRightName as any} size={20} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>
    </Fragment>
  );
});

export default Input;
