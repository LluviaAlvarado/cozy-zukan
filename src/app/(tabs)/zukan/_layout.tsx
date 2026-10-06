import { Colors } from "@/constants/theme"
import { Stack } from "expo-router"
import { useColorScheme } from "react-native"

export default function ZukanStackLayout() {
  const scheme = useColorScheme()
  const colors = Colors[scheme === "unspecified" ? "dark" : scheme]

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
      }}>
      <Stack.Screen name="index" options={{ title: "Zukan" }} />
      <Stack.Screen name="pokemon/[id]" options={{ title: "Pokemon" }} />
    </Stack>
  )
}
