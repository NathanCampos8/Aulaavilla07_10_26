import { Pressable, StyleSheet, Text, View } from "react-native";
import { Quest } from "../types/domain";
import { colors, fonts } from "../theme";
import { Icon } from "./Icon";
import { RewardBadge } from "./RewardBadge";

type MissionCardProps = {
  quest: Quest;
  onPress: () => void;
};

export function MissionCard({ quest, onPress }: MissionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${quest.title}. Dificuldade ${quest.difficulty}. Ver detalhes da missão.`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.header}>
        <View style={styles.monster}>
          <Icon name="mission" />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{quest.title}</Text>
          <View style={styles.metadata}>
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficulty}>{quest.difficulty}</Text>
            </View>
            {quest.dueDate && (
              <Text style={styles.dueDate}>Entrega: {quest.dueDate}</Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.rewards}>
        <Text style={styles.label}>RECOMPENSAS:</Text>
        <View style={styles.badges}>
          <RewardBadge amount={quest.reward.xp} kind="xp" />
          <RewardBadge amount={quest.reward.coins} kind="coins" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 17,
    gap: 13,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",
  },
  pressed: { opacity: 0.75 },
  header: { flexDirection: "row", alignItems: "center", gap: 12 },
  monster: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  details: { flex: 1, gap: 4 },
  title: {
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 20,
    color: colors.text,
  },
  metadata: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  difficulty: {
    fontFamily: fonts.bold,
    fontSize: 11,
    lineHeight: 13,
    color: colors.orange,
  },
  dueDate: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 15,
    color: colors.muted,
  },
  divider: { height: 1, backgroundColor: colors.border },
  rewards: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 15,
    color: colors.muted,
  },
  badges: { flexDirection: "row", gap: 8 },
});
