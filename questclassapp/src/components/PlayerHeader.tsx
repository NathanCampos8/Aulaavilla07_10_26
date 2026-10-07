import { Image, StyleSheet, Text, View } from "react-native";
import { Player } from "../types/domain";
import { colors, fonts } from "../theme";
import { Icon } from "./Icon";
import { ProgressBar } from "./ProgressBar";

type PlayerHeaderProps = {
  player: Player;
};

export function PlayerHeader({ player }: PlayerHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.profile}>
          <View style={styles.avatarRing}>
            <Image
              source={require("../../assets/images/lyra.png")}
              style={styles.avatar}
              resizeMode="cover"
              accessibilityLabel={`Avatar de ${player.name}`}
            />
          </View>
          <View style={styles.titles}>
            <Text style={styles.name}>{player.name}</Text>
            <Text style={styles.characterClass}>{player.characterClass}</Text>
          </View>
        </View>
        <View style={styles.levelBadge}>
          <Text style={styles.level}>Lvl {player.level}</Text>
        </View>
      </View>

      <View style={styles.experience}>
        <View style={styles.row}>
          <Text style={styles.label}>EXPERIÊNCIA</Text>
          <Text style={styles.xp}>
            {player.xp} / {player.nextLevelXp} XP
          </Text>
        </View>
        <ProgressBar
          value={player.xp}
          max={player.nextLevelXp}
          color={colors.purple}
          label="Experiência para o próximo nível"
        />
      </View>

      <View style={[styles.row, styles.wallet]}>
        <View style={styles.coins}>
          <Icon name="coins" />
          <Text style={styles.coinText}>{player.coins} moedas</Text>
        </View>
        <View style={styles.streakBadge}>
          <Text style={styles.streak}>{player.streak} dias 🔥</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  profile: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  avatarRing: { padding: 2, borderRadius: 26, backgroundColor: colors.purple },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  titles: { gap: 2, flexShrink: 1 },
  name: {
    fontFamily: fonts.bold,
    fontSize: 18,
    lineHeight: 22,
    color: colors.text,
  },
  characterClass: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 16,
    color: colors.purple,
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.purple,
  },
  level: {
    fontFamily: fonts.extrabold,
    fontSize: 12,
    lineHeight: 15,
    color: colors.background,
  },
  experience: { gap: 4 },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    lineHeight: 15,
    color: colors.muted,
  },
  xp: {
    fontFamily: fonts.bold,
    fontSize: 12,
    lineHeight: 15,
    color: colors.green,
  },
  wallet: { paddingTop: 4 },
  coins: { flexDirection: "row", alignItems: "center", gap: 6 },
  coinText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    lineHeight: 18,
    color: colors.orange,
  },
  streakBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.border,
  },
  streak: {
    fontFamily: fonts.bold,
    fontSize: 13,
    lineHeight: 16,
    color: colors.orange,
  },
});
