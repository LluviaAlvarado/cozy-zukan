import { getPokeInfo } from "@/api/poke"
import { ThemedText } from "@/components/ui/themed-text"
import { ThemedView } from "@/components/ui/themed-view"
import { GlobalStyles, Spacing } from "@/constants/theme"
import { useTypeColor } from "@/hooks/use-type-color"
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Image, StyleSheet, View } from "react-native"

export default function PokemonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [pokemon, setPokemon] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const getTypeColor = useTypeColor()

  useEffect(() => {
    let active = true

    getPokeInfo(id)
      .then((result) => {
        if (active) setPokemon(result)
      })
      .catch((requestError: Error) => {
        if (active) setError(requestError.message)
      })

    return () => {
      active = false
    }
  }, [id])

  const renderTypes = (types: any) =>
    types.map((type: any) => (
      <ThemedText
        key={`2dt-${type}`}
        style={[
          styles.type,
          {
            backgroundColor: getTypeColor(type),
          },
        ]}>
        {type}
      </ThemedText>
    ))

  return (
    <ThemedView
      style={[
        GlobalStyles.safeArea,
        {
          marginBottom: Spacing.four,
        },
      ]}>
      {error ? (
        <ThemedText type="info">Could not load Pokemon: {error}</ThemedText>
      ) : !pokemon ? (
        <ThemedText type="info">Loading Pokemon...</ThemedText>
      ) : (
        <View style={styles.container}>
          {pokemon.sprite ? (
            <Image
              source={{ uri: pokemon.sprite }}
              style={styles.sprite}
              accessibilityLabel={`${pokemon.name} sprite`}
            />
          ) : null}
          <ThemedText type="title">{pokemon.name}</ThemedText>
          <ThemedText>#{pokemon.id}</ThemedText>
          <View style={styles.typesRow}>{renderTypes(pokemon.types)}</View>
          <ThemedText>Chance for it to be a girlypop:</ThemedText>
          <ThemedText type="bold">
            {(pokemon.gender_rate / 8) * 100}%
          </ThemedText>
        </View>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignContent: "flex-start",
    gap: Spacing.two,
  },
  sprite: {
    width: 160,
    height: 160,
  },
  typesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.one,
  },
  type: {
    textAlign: "center",
    borderRadius: Spacing.two,
    width: "25%",
    alignSelf: "center",
    padding: Spacing.half,
  },
})
