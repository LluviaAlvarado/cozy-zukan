import { getAllTypes } from "@/api/poke"
import EffectivenessTable from "@/components/effect-table"
import TypesDropdown from "@/components/types-dropdown"
import { ThemedText } from "@/components/ui/themed-text"
import { Colors, GlobalStyles } from "@/constants/theme"
import { AxiosError } from "axios"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import { StyleSheet, useColorScheme, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function TypesScreen() {
  const [types, setTypes] = useState<any>(null)
  const [selectedType, setSelectedType] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const scheme = useColorScheme()
  const colors = Colors[scheme === "unspecified" ? "dark" : scheme]

  useEffect(() => {
    setLoading(true)
    getAllTypes()
      .then((list) => {
        setTypes(list)
        setSelectedType(list[0])
        console.log(list[0])
      })
      .then(() => setLoading(false))
      .catch((e: Error | AxiosError) => (console.log(e), setLoading(false)))
  }, [])

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={StyleSheet.absoluteFill}
      />

      {loading ? (
        <ThemedText>Loading pokemon types...</ThemedText>
      ) : (
        <View className="flex flex-col gap-2 items-center text-center">
          <ThemedText type="title">Effectiveness of:</ThemedText>
          <TypesDropdown
            values={types.map((type: any) => type.name)}
            onSelect={(type: string) =>
              setSelectedType(types.find((t: any) => t.name === type))
            }
            value={selectedType.name}></TypesDropdown>
          {selectedType && (
            <View className="flex flex-col gap-2 items-center dark-text">
              <EffectivenessTable
                title="Supper Effective"
                effectTo={selectedType.damage_relations.double_damage_to}
                effectFrom={selectedType.damage_relations.double_damage_from}
              />
              <EffectivenessTable
                title="Not Very Effective"
                effectTo={selectedType.damage_relations.half_damage_to}
                effectFrom={selectedType.damage_relations.half_damage_from}
              />
              <EffectivenessTable
                title="No Effect"
                effectTo={selectedType.damage_relations.no_damage_to}
                effectFrom={selectedType.damage_relations.no_damage_from}
              />
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  )
}
