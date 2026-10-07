import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../theme";

type RewardBadgeProps = {
  amount: number;
  kind: "xp" | "coins";
};

export function RewardBadge({ amount, kind }: RewardBadgeProps) {
  const isXp = kind === "xp";

  return (
    <View style={styles.badge}>
      <Text
        style={[styles.text, { color: isXp ? colors.green : colors.orange }]}
      >
        +{amount} {isXp ? "XP" : "moedas"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.background,
  },
  text: { fontFamily: fonts.bold, fontSize: 12, lineHeight: 15 },
});
