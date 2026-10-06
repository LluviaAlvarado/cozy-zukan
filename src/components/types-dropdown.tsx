import { ThemedText } from "@/components/ui/themed-text"
import { ThemedView } from "@/components/ui/themed-view"
import { Spacing } from "@/constants/theme"
import { useTheme } from "@/hooks/use-theme"
import { useState } from "react"
import { FlatList, StyleSheet, TouchableOpacity } from "react-native"

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
  const theme = useTheme()

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
            backgroundColor: theme.button,
          },
        ]}
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
                <ThemedText type="smallBold" style={styles.buttonText}>
                  {item}
                </ThemedText>
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
    margin: Spacing.one,
    width: 48,
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
  },
})
