import { getAllPoke } from "@/api/poke"
import { ThemedText } from "@/components/ui/themed-text"
import { Colors, GlobalStyles, Spacing } from "@/constants/theme"
import NumberIcon from "@expo/material-symbols/123.xml"
import SearchIcon from "@expo/material-symbols/search.xml"
import AlphaIcon from "@expo/material-symbols/sort_by_alpha.xml"
import { Host, Icon } from "@expo/ui"
import { Switch } from "@expo/ui/jetpack-compose"
import { AxiosError } from "axios"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function ZukanScreen() {
  const [pokeList, setPokeList] = useState<any[] | null>(null)
  const [filteredPokeList, setFilteredPokeList] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortAlpha, setSortAlpha] = useState(false)
  const [loading, setLoading] = useState(true)
  const scheme = useColorScheme()
  const colors = Colors[scheme === "unspecified" ? "dark" : scheme]

  useEffect(() => {
    getAllPoke()
      .then((list) => {
        setPokeList(list)
        setFilteredPokeList(sortList(filterList(list)))
      })
      .catch((error: Error | AxiosError) => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (pokeList) {
      setFilteredPokeList(sortList(filterList(pokeList)))
    }
  }, [searchTerm, sortAlpha, pokeList])

  const sortList = (list: any[]) =>
    [...list].sort((a, b) =>
      sortAlpha
        ? a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
        : Number(a.id) - Number(b.id),
    )

  const filterList = (list: any[]) => {
    const term = searchTerm.trim().toLowerCase()
    return list.filter((pokemon) =>
      term ? pokemon.name.toLowerCase().includes(term) : true,
    )
  }

  const renderPokemon = () =>
    filteredPokeList.map((pokemon) => (
      <Pressable
        style={[
          styles.poke,
          {
            borderColor: colors.backgroundElement,
            borderWidth: 2,
            borderTopWidth: 0,
          },
        ]}
        key={pokemon.id}
        onPress={() =>
          router.push({
            pathname: "/zukan/pokemon/[id]",
            params: { id: String(pokemon.id) },
          })
        }>
        <ThemedText type="bold">{pokemon.name}</ThemedText>
      </Pressable>
    ))

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      {loading ? (
        <ThemedText>Loading Pokemon...</ThemedText>
      ) : (
        <View style={GlobalStyles.column}>
          <LinearGradient
            colors={[colors.input, "transparent"]}
            start={{ x: 0.8, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.inputGradient}>
            <TextInput
              accessibilityLabel="Search Pokemon"
              onChangeText={setSearchTerm}
              value={searchTerm}
              style={styles.input}
            />
            <Host matchContents style={styles.searchIcon}>
              <Icon
                name={SearchIcon}
                size={32}
                color={scheme === "dark" ? "teal" : "violet"}
              />
            </Host>
          </LinearGradient>
          <View style={styles.sort}>
            <ThemedText type="small">Order by</ThemedText>
            <Host matchContents>
              <Switch
                value={sortAlpha}
                onCheckedChange={setSortAlpha}
                colors={{
                  checkedThumbColor: colors.button,
                  checkedTrackColor: colors.buttonSecondary,
                  uncheckedThumbColor: colors.buttonSecondary,
                  uncheckedTrackColor: colors.backgroundElement,
                  uncheckedBorderColor: colors.buttonSecondary,
                }}
              />
            </Host>
            <Host matchContents>
              <Icon
                name={sortAlpha ? AlphaIcon : NumberIcon}
                size={24}
                color={scheme === "dark" ? "teal" : "violet"}
              />
            </Host>
          </View>
          <ScrollView style={styles.pokeList}>{renderPokemon()}</ScrollView>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sort: {
    flexDirection: "row",
    gap: Spacing.one,
    justifyContent: "flex-end",
    alignItems: "center",
    alignContent: "space-between",
  },
  inputGradient: {
    flex: 0,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 24,
  },
  input: {
    flex: 1,
    padding: Spacing.half,
  },
  searchIcon: {
    marginHorizontal: Spacing.one,
    marginVertical: Spacing.half,
  },
  pokeList: {
    flex: 1,
    minHeight: "50%",
  },
  poke: {
    gap: Spacing.one,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.four,
  },
})
