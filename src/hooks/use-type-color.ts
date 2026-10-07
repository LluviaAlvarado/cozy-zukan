import { Colors, type PokemonType } from "@/constants/theme"
import { useColorScheme } from "@/hooks/use-color-scheme"

export function useTypeColor() {
  const scheme = useColorScheme()
  const colors = Colors[scheme === "light" ? "light" : "dark"]

  return (type: PokemonType) => colors[type]
}
