import { ThemedText } from "@/components/ui/themed-text"
import { ThemedView } from "@/components/ui/themed-view"
import { Spacing } from "@/constants/theme"
import { useTypeColor } from "@/hooks/use-type-color"
import { useState } from "react"
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native"

export default function TypesDropdown({
  values,
  onSelect,
  value = null,
}: {
  values: any[]
  onSelect: (value: any) => void
  value: any
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || values[0])
  const getTypeColor = useTypeColor()
  const handleSelect = (value: any) => {
    setSelectedValue(value)
    onSelect(value)
    setIsOpen(false)
  }

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: getTypeColor(selectedValue),
          },
        ]}
        onPress={() => setIsOpen((value) => !value)}>
        <ThemedText style={styles.buttonText}>
          {selectedValue || "Select an option"}{" "}
        </ThemedText>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          <FlatList
            data={values}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.option, { backgroundColor: getTypeColor(item) }]}
                onPress={() => handleSelect(item)}>
                <ThemedText type="smallBold" style={styles.buttonText}>
                  {item}
                </ThemedText>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: Spacing.one,
    borderRadius: Spacing.two,
  },
  button: {
    padding: Spacing.one,
    borderRadius: Spacing.two,
  },
  buttonText: {
    textAlign: "center",
  },
  dropdown: {
    marginTop: Spacing.one,
    borderRadius: Spacing.two,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: Spacing.two,
    shadowOffset: { width: 0, height: 2 },
  },
  option: {
    padding: Spacing.two,
    borderRadius: Spacing.two,
  },
})
