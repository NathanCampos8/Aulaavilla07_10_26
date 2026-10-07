import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../theme";
import { Icon } from "./Icon";

export type MenuSection = "Jornada" | "Missões" | "Taverna" | "Personagem";

type BottomMenuProps = {
  onSelect: (section: MenuSection) => void;
};

const items = [
  { label: "Jornada", icon: "journey" },
  { label: "Missões", icon: "quests" },
  { label: "Taverna", icon: "tavern" },
  { label: "Personagem", icon: "character" },
] as const;

export function BottomMenu({ onSelect }: BottomMenuProps) {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <Pressable
          key={item.label}
          onPress={() => onSelect(item.label)}
          accessibilityRole="button"
          accessibilityLabel={item.label}
          accessibilityState={{ selected: item.label === "Jornada" }}
          style={({ pressed }) => [styles.item, pressed && styles.pressed]}
        >
          <Icon name={item.icon} />
          <Text
            style={[styles.label, item.label === "Jornada" && styles.active]}
          >
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  item: {
    width: 72,
    flexShrink: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  pressed: { opacity: 0.65 },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    lineHeight: 14,
    color: colors.muted,
  },
  active: { color: colors.purple },
});
