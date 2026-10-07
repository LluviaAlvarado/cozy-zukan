import { StyleSheet, Text, type TextProps } from "react-native"

import { ThemeColor } from "@/constants/theme"
import { useTheme } from "@/hooks/use-theme"

export type ThemedTextProps = TextProps & {
  type?:
    | "default"
    | "bold"
    | "title"
    | "small"
    | "smallBold"
    | "subtitle"
    | "link"
    | "linkPrimary"
    | "info"
  themeColor?: ThemeColor
}

export function ThemedText({
  style,
  type = "default",
  themeColor,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme()

  return (
    <Text
      style={[
        { color: theme[themeColor ?? "text"] },
        type === "default" && styles.default,
        type === "bold" && styles.bold,
        type === "title" && styles.title,
        type === "small" && styles.small,
        type === "smallBold" && styles.smallBold,
        type === "subtitle" && styles.subtitle,
        type === "link" && styles.link,
        type === "linkPrimary" && styles.linkPrimary,
        type === "info" && styles.info,
        style,
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
  },
  bold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 700,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 40,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 600,
    textAlign: "center",
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    lineHeight: 30,
    fontSize: 14,
    color: "#a912ac",
  },
  info: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 700,
    textAlign: "center",
  },
})
