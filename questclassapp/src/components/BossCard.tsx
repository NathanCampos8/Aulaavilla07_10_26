import { StyleSheet, Text, View } from "react-native";
import { Boss } from "../types/domain";
import { colors, fonts } from "../theme";
import { Icon } from "./Icon";
import { ProgressBar } from "./ProgressBar";

type BossCardProps = {
  boss: Boss;
};

export function BossCard({ boss }: BossCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <Icon name="boss" />
          <Text style={styles.title}>{boss.name}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>CHEFE COLETIVO</Text>
        </View>
      </View>
      <View style={styles.health}>
        <View style={styles.labels}>
          <Text style={styles.label}>VIDA DO CHEFE</Text>
          <Text style={styles.percentage}>
            {boss.remainingHealth}% restantes
          </Text>
        </View>
        <ProgressBar
          value={boss.remainingHealth}
          max={100}
          color={colors.red}
          label="Vida restante do chefe"
        />
      </View>
      <View style={styles.contribution}>
        <Icon name="swords" />
        <Text style={styles.contributionText}>
          Contribuição da turma:{" "}
          <Text style={styles.highlight}>{boss.classContribution}%</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    gap: 10,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.red,
    backgroundColor: colors.bossBackground,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  titleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 15,
    lineHeight: 19,
    color: colors.text,
    flexShrink: 1,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: colors.red,
  },
  badgeText: {
    fontFamily: fonts.extrabold,
    fontSize: 10,
    lineHeight: 12,
    color: colors.text,
  },
  health: { gap: 4 },
  labels: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    lineHeight: 14,
    color: colors.text,
  },
  percentage: {
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 15,
    color: colors.red,
  },
  contribution: { flexDirection: "row", alignItems: "center", gap: 6 },
  contributionText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 15,
    color: colors.text,
    flexShrink: 1,
  },
  highlight: { fontFamily: fonts.bold, color: colors.orange },
});
