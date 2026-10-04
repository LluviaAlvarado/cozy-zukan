import ZukanScreen from "@/app"
import PokemonScreen from "@/app/pokemon/pokemon"
import { Colors } from "@/constants/theme"
import { createNativeStackNavigator } from "expo-router/build/react-navigation/native-stack/navigators/createNativeStackNavigator"
import { createStaticNavigation } from "expo-router/build/react-navigation/native/createStaticNavigation"
import { NativeTabs } from "expo-router/unstable-native-tabs"
import { useColorScheme } from "react-native"

export default function AppTabs() {
  const scheme = useColorScheme()
  const colors = Colors[scheme === "unspecified" ? "dark" : scheme]

  const ZukanRootStack = createNativeStackNavigator({
    screens: {
      Zukan: {
        screen: ZukanScreen,
        options: { title: "Zukan" },
      },
      Pokemon: {
        screen: PokemonScreen,
        options: { title: "Pokemon" },
      },
    },
  })
  const StackNavigation = createStaticNavigation(ZukanRootStack)

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Zukan</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="stars_2" />
        <StackNavigation />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="types">
        <NativeTabs.Trigger.Label>Types</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="interests" />
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
