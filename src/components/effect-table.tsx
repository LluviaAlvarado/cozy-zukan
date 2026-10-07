import { Colors, GlobalStyles, Spacing } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"
import { StyleSheet, View } from "react-native"
import { ThemedText } from "./ui/themed-text"

interface Props {
  title: string
  effectTo: any[]
  effectFrom: any[]
}

export default function EffectivenessTable({
  title,
  effectTo,
  effectFrom,
}: Props) {
  const scheme = useColorScheme()
  const colors = Colors[scheme === "unspecified" ? "dark" : scheme]

  const getTypeColor = (type: keyof typeof colors) => {
    return colors[type]
  }

  const renderTypes = (effect: any) =>
    effect.length > 0 ? (
      effect.map((type: any) => (
        <ThemedText
          key={`2dt-${type.name}`}
          style={[
            styles.type,
            {
              backgroundColor: getTypeColor(type.name),
            },
          ]}>
          {type.name}
        </ThemedText>
      ))
    ) : (
      <ThemedText style={styles.center}>NA</ThemedText>
    )

  return (
    <View style={GlobalStyles.column}>
      <ThemedText type="subtitle">{title}</ThemedText>
      <View style={GlobalStyles.row}>
        <View style={GlobalStyles.column}>
          <ThemedText type="bold" style={styles.center}>
            Attacking
          </ThemedText>
          <View style={GlobalStyles.column}>{renderTypes(effectTo)}</View>
        </View>
        <View style={GlobalStyles.column}>
          <ThemedText type="bold" style={styles.center}>
            Defending
          </ThemedText>
          <View style={GlobalStyles.column}>{renderTypes(effectFrom)}</View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    textAlign: "center",
  },
  type: {
    textAlign: "center",
    borderRadius: Spacing.two,
    width: "50%",
    alignSelf: "center",
  },
})
