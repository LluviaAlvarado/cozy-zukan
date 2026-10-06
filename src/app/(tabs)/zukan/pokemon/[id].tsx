import { getPokeInfo } from "@/api/poke"
import { ThemedText } from "@/components/ui/themed-text"
import { ThemedView } from "@/components/ui/themed-view"
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Image, StyleSheet, View } from "react-native"

export default function PokemonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [pokemon, setPokemon] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

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

  return (
    <ThemedView style={styles.container}>
      {error ? (
        <ThemedText>Could not load Pokemon: {error}</ThemedText>
      ) : !pokemon ? (
        <ThemedText>Loading Pokemon...</ThemedText>
      ) : (
        <View style={styles.content}>
          {pokemon.sprite ? (
            <Image
              source={{ uri: pokemon.sprite }}
              style={styles.sprite}
              accessibilityLabel={`${pokemon.name} sprite`}
            />
          ) : null}
          <ThemedText type="title">{pokemon.name}</ThemedText>
          <ThemedText>#{pokemon.id}</ThemedText>
          <ThemedText>{pokemon.types.join(" / ")}</ThemedText>
        </View>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    gap: 12,
  },
  sprite: {
    width: 160,
    height: 160,
  },
})
