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
  const [pokeList, setPokeList] = useState<any>(null)
  const [filteredPokeList, setFilteredPokeList] = useState<any>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortAlpha, setSortAlpha] = useState(false)
  const [loading, setLoading] = useState(true)
  const scheme = useColorScheme()
  const colors = Colors[scheme === "unspecified" ? "dark" : scheme]

  useEffect(() => {
    setLoading(true)
    getAllPoke()
      .then((list) => {
        setPokeList(list)
        setFilteredPokeList(filterList(list))
      })
      .then(() => setLoading(false))
      .catch((e: Error | AxiosError) => (console.log(e), setLoading(false)))
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (pokeList) {
        setFilteredPokeList(sortList(filterList(pokeList)))
      }
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [searchTerm, pokeList])

  useEffect(() => {
    if (filteredPokeList) {
      setFilteredPokeList(sortList(filteredPokeList))
    }
  }, [sortAlpha])

  const sortList = (list: any[]) => {
    return [...list].sort((a, b) => {
      if (sortAlpha) {
        return a.name.localeCompare(b.name, undefined, {
          sensitivity: "base",
        })
      }
      const idA = Number(a.id)
      const idB = Number(b.id)
      return idA - idB
    })
  }

  const filterList = (list: any[]) =>
    list.filter((poke) =>
      searchTerm !== ""
        ? poke.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true,
    )

  const onSortSwitch = (checked: boolean) => {
    setSortAlpha(checked)
  }

  const onTypeSearch = (term: string) => {
    setSearchTerm(term)
  }

  const renderPokemon = () =>
    filteredPokeList.map((pokemon: any) => (
      <Pressable
        style={[
          styles.poke,
          {
            borderColor: colors.backgroundElement,
            borderWidth: 2,
            borderTopWidth: 0,
          },
        ]}
        key={pokemon.name}
        /*onPress={() =>
          navigation.navigate('Pokemon', { id: pokemon.url.split("/").at(-2) })
        }*/
      >
        <ThemedText type="bold">{pokemon.name}</ThemedText>
      </Pressable>
    ))

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={StyleSheet.absoluteFill}
      />

      {loading ? (
        <ThemedText>Loading pokemon list...</ThemedText>
      ) : (
        <View style={GlobalStyles.column}>
          {/* Search bar */}
          <LinearGradient
            colors={[colors.input, "transparent"]}
            start={{ x: 0.8, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={styles.inputGradient}>
            <TextInput
              onChangeText={onTypeSearch}
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
          {/* Pokemon list */}
          <View style={styles.sort}>
            <Host matchContents>
              <Switch
                value={sortAlpha}
                onCheckedChange={onSortSwitch}
                colors={{
                  checkedThumbColor: colors.button,
                  checkedTrackColor: colors.buttonSecondary,
                  uncheckedThumbColor: colors.buttonSecondary,
                  uncheckedTrackColor: colors.backgroundElement,
                  uncheckedBorderColor: colors.buttonSecondary,
                }}></Switch>
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
  buttonRow: {
    flex: 0,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    gap: Spacing.one,
  },
  poke: {
    gap: Spacing.one,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.four,
  },
})
