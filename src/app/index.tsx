import { getAllPoke } from "@/api/poke"
import InlineDropdown from "@/components/ui/inline-dropdown"
import { ThemedText } from "@/components/ui/themed-text"
import { Colors, MaxContentWidth, Spacing } from "@/constants/theme"
import SearchIcon from "@expo/material-symbols/search.xml"
import { Host, Icon } from "@expo/ui"
import { AxiosError } from "axios"
import { LinearGradient } from "expo-linear-gradient"
import { useEffect, useState } from "react"
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function ZukanScreen() {
  const [totalPages, setTotalPages] = useState(0)
  const [pokeList, setPokeList] = useState<any>(null)
  const [filteredPokeList, setFilteredPokeList] = useState<any>([])
  const [paginatedPokeList, setPaginatedPokeList] = useState<any>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [pageLimit, setPageLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const scheme = useColorScheme()
  const colors = Colors[scheme === "unspecified" ? "dark" : scheme]

  useEffect(() => {
    setLoading(true)
    getAllPoke()
      .then((list) => {
        setPokeList(list)
        setFilteredPokeList(list.results)
        setTotalPages(Math.ceil(list.count / pageLimit))
        setPaginatedPokeList(paginateList(filterList(list.results)))
      })
      .then(() => setLoading(false))
      .catch((e: Error | AxiosError) => (console.log(e), setLoading(false)))
  }, [])

  useEffect(() => {
    if (pokeList) {
      setPaginatedPokeList(paginateList(filterList(pokeList.results)))
      setTotalPages(Math.ceil(filteredPokeList.length / pageLimit))
    }
  }, [page, pageLimit])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (pokeList) {
        const filteredList = filterList(pokeList.results)
        setFilteredPokeList(filteredList)
        setPaginatedPokeList(paginateList(filteredList))
        setTotalPages(Math.ceil(filteredList.length / pageLimit))
      }
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [searchTerm, 500])

  const filterList = (list: any[]) =>
    list.filter((poke) =>
      searchTerm !== ""
        ? poke.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true,
    )

  const paginateList = (list: any[]) => {
    const offset = (page - 1) * pageLimit
    return list.slice(offset, offset + pageLimit)
  }

  const onSelectPageLimit = (limit: number) => {
    const newPageCount = Math.ceil(filterList.length / limit)
    if (page > newPageCount) setPage(newPageCount)
    setPageLimit(limit)
  }

  const onSelectPage = (page: number) => {
    setPage(page)
  }

  const onNavigatePages = (e: any) => {
    if (e.target.id === "prev-page-btn") {
      if (page > 1) {
        setPage(page - 1)
      }
    } else if (e.target.id === "next-page-btn") {
      if (page < totalPages) {
        setPage(page + 1)
      }
    }
  }

  const onTypeSearch = (term: string) => {
    setSearchTerm(term)
  }

  const renderPokemon = () =>
    paginatedPokeList.map((pokemon: any) => (
      <Pressable
        style={styles.stepContainer}
        key={pokemon.name}
        /*onPress={() =>
          navigation.navigate('Pokemon', { id: pokemon.url.split("/").at(-2) })
        }*/
      >
        <ThemedText>{pokemon.name}</ThemedText>
      </Pressable>
    ))

  const getPageNumbers = () =>
    [...Array(totalPages)].map((_, num) => {
      num++
      return num
    })

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={StyleSheet.absoluteFill}
      />

      {loading ? (
        <ThemedText>Loading pokemon list...</ThemedText>
      ) : (
        <View style={styles.flexC}>
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
                color={scheme === "dark" ? "pink" : "purple"}
              />
            </Host>
          </LinearGradient>
          <ScrollView style={styles.pokeList}>{renderPokemon()}</ScrollView>
          <View style={styles.buttonRow}>
            <View style={styles.flexR}>
              <View style={styles.flexC}>
                <Text>Page Length:</Text>
                <InlineDropdown
                  values={[10, 20, 50, 100]}
                  onSelect={onSelectPageLimit}
                  value={pageLimit}></InlineDropdown>
              </View>

              <View style={styles.flexC}>
                <ThemedText>Page:</ThemedText>
                <View style={styles.flexR}>
                  <InlineDropdown
                    values={getPageNumbers()}
                    onSelect={onSelectPage}
                    value={page}></InlineDropdown>
                  <Text>/{totalPages}</Text>
                </View>
              </View>
            </View>
            <View style={styles.flexR}>
              <Pressable
                className="rounded bg-primary p-2 flex-1 w-16"
                id="prev-page-btn"
                //onClick={onNavigatePages}
                disabled={page === 1}>
                <Text>Prev</Text>
              </Pressable>
              <Pressable
                className="rounded bg-primary p-2 flex-1"
                id="next-page-btn"
                //onClick={onNavigatePages}
                disabled={page === totalPages}>
                <Text>Next</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  flexR: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    gap: Spacing.one,
  },
  flexC: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
    flexDirection: "column",
    gap: Spacing.one,
  },
  safeArea: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: Spacing.one,
    alignItems: "stretch",
    justifyContent: "space-between",
    gap: Spacing.three,
    paddingTop: Spacing.three,
    maxWidth: MaxContentWidth,
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
    flexDirection: "row",
    gap: Spacing.one,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
})
