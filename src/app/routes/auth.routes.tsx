import React from "react";
import { View } from "react-native";
import SignIn from "../pages/signIn_screen";

function AuthRoutes() {
  console.log("Debugging component");
  return (
    <View className="flex-1">
      <SignIn />
    </View>
  );
}

export default AuthRoutes;
