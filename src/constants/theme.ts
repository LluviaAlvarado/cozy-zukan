/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "@/global.css"

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
    button: "#b9f4e1",
    buttonSecondary: "#be9df0af",
  },
  dark: {
    text: "#f8dbf8",
    textSecondary: "#c0b1fb",
    background: "#2d0a33",
    gradientStart: "#036f52",
    gradientEnd: "#2d0a33",
    input: "#2e115b",
    backgroundElement: "#95268253",
    backgroundSelected: "#c0b1fb",
    button: "#009688",
    buttonSecondary: "#6f3eb8af",
  },
} as const

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark

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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.one,
  },
  column: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between",
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
