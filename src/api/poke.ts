import storage from "@react-native-async-storage/async-storage"
import axios from "axios"

const pokeApiUrl: string = "https://pokeapi.co/api/v2/"

export const getAllPoke = async () => {
  try {
    // first try to get from local storage, if not found then fetch from API
    if (await storage.getItem("pokemon")) {
      const pokemon = await storage.getItem("pokemon")
      return JSON.parse(pokemon ?? "")
    } else {
      const list = await axios.get(`${pokeApiUrl}pokemon/?offset=0&limit=2000`)
      list.data.results = await Promise.all(
        list.data.results.map(async (poke: any) => {
          let pokeSpecie: any = null
          pokeSpecie = await axios
            .get(`${pokeApiUrl}pokemon-species/${poke.url.split("/").at(-2)}`)
            .catch((e) => {})
          let jpName = ""

          if (pokeSpecie && pokeSpecie.data.names) {
            const spName = pokeSpecie.data.names.find(
              (spName: any) => spName.language.name === "ja",
            )
            if (spName) {
              jpName = spName.name
            }
          }

          poke.name += ` (${jpName})`

          return poke
        }),
      )
      // save to local storage
      await storage.setItem("pokemon", JSON.stringify(list.data))
      return list.data
    }
  } catch (e) {
    console.log("getAllPoke error:", e)
    throw e
  }
}

export const getAllTypes = async () => {
  let types = []
  try {
    if (await storage.getItem("types")) {
      types = JSON.parse((await storage.getItem("types")) ?? "")
    } else {
      for (let i = 0; i < 19; i++) {
        const type = await axios.get(`${pokeApiUrl}type/${i}`)
        types.push(type.data)
      }
      // save to local storage
      await storage.setItem("types", JSON.stringify(types))
    }
    return types
  } catch (e: any) {
    console.log(e)
  }
}

export const getPokeInfo = async (id: string) => {
  const poke: any = await axios.get(`${pokeApiUrl}pokemon/${id}`).catch((e) => {
    //redirect("/not-found")
  })
  const specie: any = await axios.get(poke.data.species.url).catch((e) => {
    //redirect("/not-found")
  })
  poke.data.species = specie.data
  return poke.data
}

export const updateLocalData = async () => {
  const pokeList = await getAllPoke()
  await storage.setItem("pokemon", JSON.stringify(pokeList))
  const typeList = await getAllTypes()
  await storage.setItem("types", JSON.stringify(typeList))
}
