import { Stack } from "expo-router";
import { EmployeeCustomerProvider } from "../contexts/EmployeeCustomerContext";

export default function Layout() {
  return (
    <EmployeeCustomerProvider>
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
    </EmployeeCustomerProvider>
  );
}
