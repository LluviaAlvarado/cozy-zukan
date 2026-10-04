/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "@/global.css"

import { Platform } from "react-native"

export const Colors = {
  light: {
    text: "#330033",
    background: " #f5fbcc",
    gradientStart: "#bef8ca",
    gradientEnd: "#f5fbcc",
    input: "#ceb1faaf",
    backgroundElement: "#bef8ca",
    backgroundSelected: "#c0b1fb",
    textSecondary: "#c0b1fb",
  },
  dark: {
    text: "#fffbdb",
    background: "#2d0a33",
    gradientStart: "#05654a",
    gradientEnd: "#2d0a33",
    input: "#2e115b",
    backgroundElement: "#fa9eeb",
    backgroundSelected: "#c0b1fb",
    textSecondary: "#c0b1fb",
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
