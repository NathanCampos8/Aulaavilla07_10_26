import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BossCard } from "../components/BossCard";
import { BottomMenu, MenuSection } from "../components/BottomMenu";
import { MissionCard } from "../components/MissionCard";
import { PlayerHeader } from "../components/PlayerHeader";
import { boss } from "../mocks/boss";
import { player } from "../mocks/player";
import { quests } from "../mocks/quests";
import { colors, fonts } from "../theme";
import { showMessage } from "../utils/showMessage";

export function JourneyScreen() {
  const featuredQuest = quests[0];

  function handleMenuSelect(section: MenuSection) {
    if (section === "Jornada") {
      showMessage(
        "Jornada",
        "Você está na sua jornada! Confira a missão em destaque e o progresso da turma.",
      );
      return;
    }

    showMessage(
      section,
      "Esta versão apresenta apenas a tela Jornada. Esta área ainda não foi desenvolvida.",
    );
  }

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.screen}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
        >
          <PlayerHeader player={player} />
          <View style={styles.main}>
            <Text style={styles.sectionTitle} accessibilityRole="header">
              MISSÃO EM DESTAQUE
            </Text>
            {featuredQuest && (
              <MissionCard
                quest={featuredQuest}
                onPress={() =>
                  showMessage(
                    featuredQuest.title,
                    `${featuredQuest.description}\n\nRecompensas: ${featuredQuest.reward.xp} XP e ${featuredQuest.reward.coins} moedas.`,
                  )
                }
              />
            )}
            <BossCard boss={boss} />
          </View>
        </ScrollView>
        <BottomMenu onSelect={handleMenuSelect} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background,
  },
  screen: {
    flex: 1,
    width: "100%",
    maxWidth: Platform.OS === "web" ? 390 : 600,
    backgroundColor: colors.background,
  },
  scroll: { flex: 1 },
  content: { flexGrow: 1 },
  main: { padding: 20, gap: 20 },
  sectionTitle: {
    fontFamily: fonts.extrabold,
    fontSize: 14,
    lineHeight: 17,
    color: colors.muted,
  },
});
