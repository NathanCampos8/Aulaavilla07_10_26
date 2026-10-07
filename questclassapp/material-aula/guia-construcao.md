# QuestClass: Expo do zero à tela Jornada

Apresentação: https://www.figma.com/slides/trp6qEEjm48JxoqhuIXjw4

## Como usar este material

A aula contém 40 slides com trechos guiados. Este guia reúne os arquivos completos do projeto para conferir imports, JSX e estilos. Os códigos nos slides que aparecem como "trecho" ou "esqueleto" precisam ser combinados com o restante do arquivo.

O professor pode distribuir primeiro assets-para-alunos.zip. O arquivo questclass-codigo-completo.zip contém a solução de referência, sem node_modules. A interface usa dados locais e os botões mostram mensagens. Apenas a tela Jornada está implementada.

## Criação do zero

Instale Node.js compatível com o SDK 57 (mínimo 22.13), VS Code e Git. Para testar no celular, use Expo Go compatível com o SDK; a prévia web também pode ser usada durante a aula.

Execute um comando por vez:

```sh
npx create-expo-app@latest questclass --template blank-typescript
cd questclass
npx expo install expo-image expo-font react-native-safe-area-context
npx expo install @expo-google-fonts/inter
npx expo install react-dom react-native-web
npx expo start
```

O template latest pode mudar com novas versões. Para reproduzir exatamente a base entregue, extraia questclass-codigo-completo.zip, abra a pasta que contém package.json e execute:

```sh
npm ci
npx expo start
```

Copie a pasta assets antes de usar require. O avatar está em assets/images/lyra.png. Os SVGs ficam em assets/icons. Os arquivos de configuração do pacote completo já incluem as dependências e os plugins usados.

## Sequência de montagem

1. Rode o App temporário dos slides 9 e 10 para explorar View, Text e StyleSheet.
2. Crie theme.ts, types/domain.ts e os mocks.
3. Monte ProgressBar, RewardBadge e Icon. Confira cada componente antes de compor os cartões.
4. Construa PlayerHeader, MissionCard e BossCard.
5. Construa BottomMenu e showMessage.
6. Monte JourneyScreen e substitua o App temporário pelo App completo deste guia.
7. Confira a tela em 390 e 320 pixels de largura na web e depois no celular.

Imports devem apontar para arquivos que já existem. Durante a etapa inicial, use a fonte padrão; depois que App carregar a Inter, os estilos com fonts.* terão a aparência final.

## Verificação e atividade

```sh
npx tsc --noEmit
npx expo-doctor
```

O projeto de referência também oferece npm run lint e npm run typecheck.

Para o desafio, altere os mocks, usando XP 300/600, vida do chefe 40% e uma missão sem dueDate. Confira preenchimentos de 50% e 40% e a ausência do prazo. Entregue o código e capturas da versão original e da personalizada.

## Mapa da apresentação

01. QuestClass
02. A tela Jornada
03. O percurso da aula
04. Ambiente de desenvolvimento
05. Um projeto Expo com TypeScript
06. Dependências e arquivos visuais
07. Primeira execução
08. A estrutura do projeto
09. O primeiro componente
10. Layout com Flexbox
11. Cores e fontes compartilhadas
12. Dados, tipos e componentes
13. O tipo do jogador
14. A missão tem um contrato
15. Mocks para desenvolver a tela
16. A missão em uma lista
17. A área segura da tela
18. Ordem de construção
19. A barra recebe valores
20. A largura vira porcentagem
21. Uma recompensa, duas variações
22. Estilo e uso da recompensa
23. Ícones locais em um componente
24. O perfil do jogador
25. Experiência e moedas
26. O cartão de missão responde ao toque
27. Detalhes e recompensas da missão
28. O cartão ganha forma
29. O chefe coletivo
30. O visual do chefe
31. Os itens do menu
32. Um botão para cada item
33. A tela reúne os componentes
34. Fontes e entrada do app
35. Ações simples na tela
36. Acabamento em telas pequenas
37. A tela pronta para conferir
38. Desafio da turma
39. Erros comuns no caminho
40. Sua Jornada está pronta

## Referências

- Expo SDK 57: https://docs.expo.dev/versions/v57.0.0/
- Criação de projeto: https://docs.expo.dev/more/create-expo/
- Execução: https://docs.expo.dev/get-started/start-developing/
- React Native: https://reactnative.dev/docs/components-and-apis
- TypeScript: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
- Design: https://www.figma.com/design/fSPXUz9aFnkXcr5VLGrKE7
- Aula de referência: https://www.figma.com/slides/MJ24mIMgvHnC0uNoavksXD

## Arquivos completos

Os próximos blocos reproduzem os arquivos do projeto de referência.

## src/theme.ts
```tsx
// As mesmas cores e famílias de fonte são compartilhadas por toda a tela.
export const colors = {
  background: "#282A36",
  surface: "#343746",
  border: "#44475A",
  text: "#F8F8F2",
  muted: "#6272A4",
  purple: "#BD93F9",
  green: "#50FA7B",
  orange: "#FFB86C",
  red: "#FF5555",
  bossBackground: "#4C283C",
};

export const fonts = {
  regular: "Inter_400Regular",
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
  extrabold: "Inter_800ExtraBold",
};

```

## src/types/domain.ts
```tsx
export type Role = "player" | "master";

export type Reward = {
  xp: number;
  coins: number;
};

export type Quest = {
  id: string;
  title: string;
  description: string;
  difficulty: "Fácil" | "Média" | "Difícil";
  dueDate?: string;
  reward: Reward;
};

export type Player = {
  name: string;
  characterClass: string;
  role: Role;
  level: number;
  xp: number;
  nextLevelXp: number;
  coins: number;
  streak: number;
};

export type Boss = {
  name: string;
  remainingHealth: number;
  classContribution: number;
};

```

## src/mocks/player.ts
```tsx
import { Player } from "../types/domain";

export const player: Player = {
  name: "Lyra",
  characterClass: "Maga dos Estados",
  role: "player",
  level: 4,
  xp: 430,
  nextLevelXp: 600,
  coins: 120,
  streak: 5,
};

```

## src/mocks/quests.ts
```tsx
import { Quest } from "../types/domain";

// Dados locais: os componentes não precisam conhecer uma API para funcionar.
export const quests: Quest[] = [
  {
    id: "goblin-das-props",
    title: "Derrote o Goblin das Props",
    description:
      "Crie um componente React Native que receba dados por props tipadas com TypeScript.",
    difficulty: "Média",
    dueDate: "15 ago",
    reward: { xp: 100, coins: 20 },
  },
];

```

## src/mocks/boss.ts
```tsx
import { Boss } from "../types/domain";

export const boss: Boss = {
  name: "Dragão da API",
  remainingHealth: 65,
  classContribution: 35,
};

```

## src/components/ProgressBar.tsx
```tsx
import { StyleSheet, View } from "react-native";
import { colors } from "../theme";

type ProgressBarProps = {
  value: number;
  max: number;
  color: string;
  label: string;
};

export function ProgressBar({ value, max, color, label }: ProgressBarProps) {
  // A largura acompanha os dados e permanece entre 0 e 100%.
  const percentage =
    max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <View
      style={styles.track}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(percentage) }}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percentage)}
    >
      <View
        style={[
          styles.fill,
          { width: `${percentage}%`, backgroundColor: color },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: colors.background,
  },
  fill: {
    height: "100%",
  },
});

```

## src/components/RewardBadge.tsx
```tsx
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

```

## src/components/Icon.tsx
```tsx
import { Image } from "expo-image";

// SVGs originais do Figma, empacotados com o app. Não dependem de URLs externas.
const icons = {
  coins: { source: require("../../assets/icons/coins.svg"), size: 18 },
  mission: { source: require("../../assets/icons/mission.svg"), size: 36 },
  boss: { source: require("../../assets/icons/boss.svg"), size: 24 },
  swords: { source: require("../../assets/icons/swords.svg"), size: 14 },
  journey: { source: require("../../assets/icons/journey.svg"), size: 22 },
  quests: { source: require("../../assets/icons/quests.svg"), size: 22 },
  tavern: { source: require("../../assets/icons/tavern.svg"), size: 22 },
  character: { source: require("../../assets/icons/character.svg"), size: 22 },
};

type IconProps = {
  name: keyof typeof icons;
};

export function Icon({ name }: IconProps) {
  const icon = icons[name];

  return (
    <Image
      source={icon.source}
      style={{ width: icon.size, height: icon.size }}
      contentFit="contain"
      accessible={false}
    />
  );
}

```

## src/components/PlayerHeader.tsx
```tsx
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

```

## src/components/MissionCard.tsx
```tsx
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

```

## src/components/BossCard.tsx
```tsx
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

```

## src/components/BottomMenu.tsx
```tsx
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

```

## src/utils/showMessage.ts
```tsx
import { Alert, Platform } from "react-native";

// O Alert nativo não é implementado pelo React Native Web.
export function showMessage(title: string, message: string): void {
  if (Platform.OS === "web") {
    window.alert(`${title}\n\n${message}`);
    return;
  }

  Alert.alert(title, message, [{ text: "Entendi" }]);
}

```

## src/screens/JourneyScreen.tsx
```tsx
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

```

## App.tsx
```tsx
import { Inter_400Regular } from "@expo-google-fonts/inter/400Regular";
import { Inter_600SemiBold } from "@expo-google-fonts/inter/600SemiBold";
import { Inter_700Bold } from "@expo-google-fonts/inter/700Bold";
import { Inter_800ExtraBold } from "@expo-google-fonts/inter/800ExtraBold";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { JourneyScreen } from "./src/screens/JourneyScreen";
import { colors } from "./src/theme";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {fontsLoaded || fontError ? (
        <JourneyScreen />
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator
            color={colors.purple}
            accessibilityLabel="Carregando a jornada"
          />
        </View>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});

```

## index.ts
```tsx
import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

```

## app.json
```json
{
  "expo": {
    "name": "QuestClass",
    "slug": "questclass",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "dark",
    "backgroundColor": "#282A36",
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/android-icon-foreground.png",
        "backgroundImage": "./assets/android-icon-background.png",
        "monochromeImage": "./assets/android-icon-monochrome.png"
      },
      "predictiveBackGestureEnabled": false
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-image",
      "expo-font"
    ]
  }
}

```

## tsconfig.json
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  }
}

```

## package.json
```json
{
  "name": "questclass",
  "version": "1.0.0",
  "main": "index.ts",
  "dependencies": {
    "@expo-google-fonts/inter": "^0.4.2",
    "expo": "~57.0.24",
    "expo-font": "~57.0.4",
    "expo-image": "~57.0.5",
    "expo-status-bar": "~57.0.1",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-native": "0.86.3",
    "react-native-safe-area-context": "~5.7.0",
    "react-native-web": "^0.21.2"
  },
  "devDependencies": {
    "@types/react": "~19.2.2",
    "eslint": "^9.39.5",
    "eslint-config-expo": "~57.0.2",
    "typescript": "~6.0.3"
  },
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "typecheck": "tsc --noEmit",
    "lint": "expo lint",
    "export": "expo export --platform all"
  },
  "private": true
}

```

