import { ThemedText } from "@/components/ui/themed-text"
import { ThemedView } from "@/components/ui/themed-view"
import { useTheme } from "@/hooks/use-theme"
import { useState } from "react"
import { FlatList, StyleSheet, TouchableOpacity } from "react-native"

export default function InlineDropdown({
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
  const theme = useTheme()

  const handleSelect = (value: any) => {
    setSelectedValue(value)
    onSelect(value)
    setIsOpen(false)
  }

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsOpen((value) => !value)}>
        <ThemedText style={styles.buttonText}>
          {selectedValue || "Select an option"}{" "}
        </ThemedText>
      </TouchableOpacity>
      {isOpen && (
        <ThemedView style={styles.dropdown}>
          <FlatList
            data={values}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item)}>
                <ThemedText style={styles.optionText}>{item}</ThemedText>{" "}
              </TouchableOpacity>
            )}
          />
        </ThemedView>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  button: {
    padding: 15,
    backgroundColor: "#5fb7b9",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  dropdown: {
    marginTop: 5,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
  },
})
