import { Colors } from "@/constants/theme"
import { NativeTabs } from "expo-router/unstable-native-tabs"
import { useColorScheme } from "react-native"

export default function TabsLayout() {
  const scheme = useColorScheme()
  const colors = Colors[scheme === "unspecified" ? "dark" : scheme]

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.button}
      labelStyle={{ selected: { color: colors.text } }}>
      <NativeTabs.Trigger name="zukan">
        <NativeTabs.Trigger.Label>Zukan</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="stars_2" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="types">
        <NativeTabs.Trigger.Label>Types</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="interests" />
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
