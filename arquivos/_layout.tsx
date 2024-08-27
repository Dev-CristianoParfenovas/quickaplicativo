import Header from "@/app/src/header/header";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffff",
        tabBarActiveBackgroundColor: "#60a5fa",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Carrinho",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={27} name="shopping-cart" color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
