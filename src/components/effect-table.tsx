import { GlobalStyles } from "@/constants/theme"
import { View } from "react-native"
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
  const renderTypes = (effect: any) =>
    effect.length > 0 ? (
      effect.map((type: any) => (
        <ThemedText key={`2dt-${type.name}`}>{type.name}</ThemedText>
      ))
    ) : (
      <ThemedText>NA</ThemedText>
    )

  return (
    <View style={GlobalStyles.column}>
      <ThemedText type="title">{title}</ThemedText>
      <View>
        <View>
          <ThemedText type="bold">Attacking</ThemedText>

          <View>{renderTypes(effectTo)}</View>
        </View>
        <View>
          <ThemedText type="bold">Defending</ThemedText>

          <View>{renderTypes(effectFrom)}</View>
        </View>
      </View>
    </View>
  )
}
