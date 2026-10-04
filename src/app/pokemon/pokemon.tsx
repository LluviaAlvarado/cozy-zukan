import { ThemedView } from "@/components/ui/themed-view"

export default function PokemonScreen({ route }: any) {
  return (
    <ThemedView className="flex-1 items-center justify-center">
      {route.params}
    </ThemedView>
  )
}
