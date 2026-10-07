import storage from "@react-native-async-storage/async-storage"
import axios from "axios"

const pokeApiUrl: string = "https://pokeapi.co/api/v2/"
const pokemonStorageKey = "pokemon-species-v1"

const mapWithConcurrency = async <T, R>(
  items: T[],
  concurrency: number,
  mapper: (item: T) => Promise<R>,
): Promise<R[]> => {
  const results: R[] = new Array(items.length)
  let nextIndex = 0

  const worker = async () => {
    while (nextIndex < items.length) {
      const index = nextIndex++
      results[index] = await mapper(items[index])
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, worker),
  )

  return results
}

const blobToDataUri = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === "string") resolve(reader.result)
      else reject(new Error("Could not encode the Pokemon sprite."))
    }
    reader.onerror = () =>
      reject(new Error("Could not read the Pokemon sprite."))
    reader.readAsDataURL(blob)
  })

export const getAllPoke = async () => {
  try {
    // first try to get from local storage, if not found then fetch from API
    const storedPokemon = await storage.getItem(pokemonStorageKey)
    if (storedPokemon) {
      return JSON.parse(storedPokemon)
    } else {
      await storage.removeItem("pokemon")
      const list = await axios.get(
        `${pokeApiUrl}pokemon-species/?offset=0&limit=2000`,
      )
      const pokemon = await mapWithConcurrency(
        list.data.results,
        8,
        async (data: any) => {
          const id = Number(data.url.split("/").filter(Boolean).at(-1))
          let species = null

          try {
            const response = await axios.get(data.url)
            species = response.data
          } catch (error) {
            console.warn(`Could not load species data for ${data.name}`, error)
          }

          const japaneseName =
            species?.names?.find((entry: any) => entry.language.name === "ja")
              ?.name ?? ""

          return {
            id: species?.id ?? id,
            name: japaneseName ? `${data.name} (${japaneseName})` : data.name,
            types: [],
            gender_rate: species?.gender_rate ?? null,
            sprite: "",
          }
        },
      )
      // save to local storage
      await storage.setItem(pokemonStorageKey, JSON.stringify(pokemon))
      return pokemon
    }
  } catch (e) {
    console.error("getAllPoke error:", e)
    throw e
  }
}

export const getAllTypes = async () => {
  let types = []
  try {
    const storedTypes = await storage.getItem("types")
    if (storedTypes) {
      types = JSON.parse(storedTypes)
    } else {
      for (let i = 1; i < 19; i++) {
        const type = await axios.get(`${pokeApiUrl}type/${i}`)
        types.push({
          id: type.data.id,
          name: type.data.name,
          damage_relations: type.data.damage_relations,
        })
      }
      // save to local storage
      await storage.setItem("types", JSON.stringify(types))
    }
    return types
  } catch (e: any) {
    console.error(e)
    throw e
  }
}

export const getPokeInfo = async (id: string) => {
  try {
    const detailKey = `pokemon-info-${id}`
    const cachedDetails = await storage.getItem(detailKey)
    if (cachedDetails) return JSON.parse(cachedDetails)

    const stored = await storage.getItem(pokemonStorageKey)
    if (!stored) throw new Error("Pokemon data is not in storage.")

    const pokemon = JSON.parse(stored)
    const index = pokemon.findIndex(
      (entry: any) => String(entry.id) === String(id),
    )
    if (index === -1) throw new Error(`Pokemon ${id} was not found.`)

    const cachedPokemon = pokemon[index]

    const response = await axios.get(`${pokeApiUrl}pokemon/${id}`)
    const apiPokemon = response.data
    let sprite = ""

    if (apiPokemon.sprites.front_default) {
      const imageResponse = await fetch(apiPokemon.sprites.front_default)
      if (!imageResponse.ok) {
        throw new Error(`Could not download Pokemon ${id}'s sprite.`)
      }
      sprite = await blobToDataUri(await imageResponse.blob())
    }

    const updatedPokemon = {
      ...cachedPokemon,
      types: apiPokemon.types.map((entry: any) => entry.type.name),
      sprite,
    }

    await storage.setItem(detailKey, JSON.stringify(updatedPokemon))

    return updatedPokemon
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const updatePokemonData = async () => {
  await storage.multiRemove([pokemonStorageKey, "pokemon"])
  return getAllPoke()
}
