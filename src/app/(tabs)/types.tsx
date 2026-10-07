import { getAllTypes } from "@/api/poke"
import EffectivenessTable from "@/components/effect-table"
import TypesDropdown from "@/components/types-dropdown"
import { ThemedText } from "@/components/ui/themed-text"
import { Colors, GlobalStyles } from "@/constants/theme"

import { AxiosError } from "axios"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function TypesScreen() {
  const [types, setTypes] = useState<any[] | null>(null)
  const [selectedType, setSelectedType] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const scheme = useColorScheme()
  const colors = Colors[scheme === "unspecified" ? "dark" : scheme]

  useEffect(() => {
    getAllTypes()
      .then((list) => {
        setTypes(list)
        setSelectedType(list[0] ?? null)
      })
      .catch((error: Error | AxiosError) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      {loading ? (
        <ThemedText type="info">Loading Pokemon types...</ThemedText>
      ) : selectedType && types ? (
        <View style={GlobalStyles.column}>
          <ThemedText type="title">Effectiveness of type:</ThemedText>
          <TypesDropdown
            values={types.map((type) => type.name)}
            onSelect={(type: string) =>
              setSelectedType(types.find((item) => item.name === type))
            }
            value={selectedType.name}
          />
          <ScrollView>
            <View style={GlobalStyles.column}>
              <EffectivenessTable
                title="Super Effective"
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
          </ScrollView>
        </View>
      ) : (
        <ThemedText>Pokemon types are unavailable.</ThemedText>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  test: {
    flex: 2,
  },
})
