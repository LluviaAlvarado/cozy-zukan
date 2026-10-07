import { Platform, StyleSheet } from "react-native"

export const Colors = {
  light: {
    text: "#530253",
    textSecondary: "#c0b1fb",
    background: "#fbc1f7",
    gradientStart: "#bef8ca",
    gradientEnd: "#fbc1f7",
    input: "#ceb1faaf",
    backgroundElement: "#e4eceaa0",
    backgroundSelected: "#f0b1fb",
    button: "#be9df0af",
    buttonSecondary: "#b9f4e1",
    // type colors
    normal: "#f4e3fb",
    fire: "#f57973",
    water: "#91aff5",
    grass: "#a8ea86",
    electric: "#f7da65",
    ice: "#c2e2e2",
    fighting: "#f8a469",
    poison: "#ca73ca",
    ground: "#eed899",
    flying: "#bccfe9",
    psychic: "#f87da2",
    bug: "#e5f177",
    rock: "#b4a563",
    ghost: "#a891c9",
    dragon: "#a686f1",
    dark: "#676462",
    steel: "#b6b6c9",
    fairy: "#ffaeef",
  },
  dark: {
    text: "#f4d9f4",
    textSecondary: "#c0b1fb",
    background: "#2d0a33",
    gradientStart: "#036f52",
    gradientEnd: "#2d0a33",
    input: "#2e115b",
    backgroundElement: "#95268253",
    backgroundSelected: "#c0b1fb",
    button: "#6f3eb8af",
    buttonSecondary: "#009688",
    // type colors
    normal: "#a19ea2",
    fire: "#d73d35",
    water: "#658ae1",
    grass: "#75cc4a",
    electric: "#e4bb17",
    ice: "#78c8c8",
    fighting: "#ef7a27",
    poison: "#ae1eae",
    ground: "#d2af4f",
    flying: "#7a9fd3",
    psychic: "#dd4472",
    bug: "#aab826",
    rock: "#94711a",
    ghost: "#523c76",
    dragon: "#5a2cc4",
    dark: "#36271d",
    steel: "#71717d",
    fairy: "#e979d2",
  },
} as const

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark

export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy"

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
})

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0
export const MaxContentWidth = 800

export const GlobalStyles = StyleSheet.create({
  row: {
    marginTop: Spacing.half,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.one,
  },
  column: {
    marginVertical: Spacing.half,
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-evenly",
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
})
