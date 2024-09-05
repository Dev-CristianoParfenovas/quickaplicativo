import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#60a5fa",
        },

        headerTintColor: "#000",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="screens" options={{ headerShown: false }} />
    </Stack>
  );
}
