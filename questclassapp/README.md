# QuestClass — Jornada

Uma tela de React Native com Expo e TypeScript para demonstrar composição de interfaces e componentes com props tipadas. Reproduz a tela `player-home-jornada` do projeto QuestClass.

## Executar

Requisitos: Node.js 22.13 ou superior e npm.

```bash
npm install
npm start
```

Escaneie o QR Code com o Expo Go compatível com o SDK 57. O celular e o computador devem estar na mesma rede. Também é possível usar um emulador Android já configurado.

Para visualizar no navegador:

```bash
npm run web
```

O navegador exibe a tela com largura máxima de 390 px. No celular, a interface se adapta à largura disponível, respeita as áreas seguras e usa as barras de status e gestos do sistema. Em telas menores, o conteúdo pode rolar e o menu permanece no rodapé.

## Organização

```text
App.tsx                         Carregamento das fontes e entrada do aplicativo
src/
  screens/JourneyScreen.tsx     Composição da tela Jornada
  components/
    PlayerHeader.tsx            Avatar, nível, experiência, moedas e sequência
    MissionCard.tsx             Missão recebida por props
    RewardBadge.tsx             Recompensa de XP ou moedas
    BossCard.tsx                Chefe coletivo e contribuição da turma
    ProgressBar.tsx             Barra reutilizada para XP e vida
    BottomMenu.tsx              Menu inferior
    Icon.tsx                   Exibição dos ícones locais
  types/domain.ts              Contratos dos dados
  mocks/                       Dados de exemplo do jogador, missão e chefe
  theme.ts                     Cores e fontes compartilhadas
  utils/showMessage.ts         Mensagens no celular e no navegador
assets/
  images/lyra.png               Avatar original do Figma
  icons/                       Ícones originais do Figma
```

## Conceitos aplicados

- `View`, `Text`, `Image`, `ScrollView`, `Pressable` e `StyleSheet`.
- Flexbox, espaçamentos, bordas e composição de componentes.
- Props tipadas; tipos primitivos, objetos, arrays, union types e propriedade opcional.
- Tipos `Role`, `Quest` e `Reward`, lista mockada e `MissionCard`, conforme a Aula 08.
- Renderização condicional da data de entrega e `.map()` no menu.
- Funções recebidas por props e eventos de toque.
- Reutilização de `ProgressBar` e `RewardBadge`.

Para acompanhar o fluxo dos dados, comece por `src/types/domain.ts`, depois leia `src/mocks/quests.ts`, `src/components/MissionCard.tsx` e `src/screens/JourneyScreen.tsx`.

Os valores podem ser alterados diretamente em `src/mocks/`. A barra de XP calcula `430 / 600`; a vida do chefe calcula `65 / 100`. A largura da barra do chefe foi ajustada para representar os 65% informados no layout.

## Escopo desta etapa

Somente a tela Jornada está implementada. Tocar na missão abre uma mensagem com descrição e recompensas. O menu mostra avisos informativos para as áreas ainda não desenvolvidas; não há navegação entre telas nesta etapa.

Os dados são locais, sem API, autenticação ou persistência. O avatar, os ícones e a fonte Inter são incluídos no aplicativo. `expo-image` permite exibir os SVGs locais; `expo-font` carrega a fonte; `react-native-safe-area-context` cuida das áreas seguras.

## Verificação

```bash
npm run typecheck
npm run lint
npx expo-doctor
npx expo export --platform all
```

Validações realizadas: TypeScript, ESLint, 21 verificações do Expo Doctor e exportação dos bundles Android, iOS e web. A prévia foi conferida no navegador em 390 × 844 e 320 × 568. Ainda não foi executado em dispositivo físico ou emulador nativo; a exportação não gera um APK ou IPA.

## Referências

- [Cronograma das aulas no Notion](https://app.notion.com/p/c2ae87590fd847f699a95a979a1b1810?v=3a0a2bff98578101a3ee000cd79e2524).
- [Tela Jornada no Figma](https://www.figma.com/design/fSPXUz9aFnkXcr5VLGrKE7/QuestClass?node-id=4-753).
- [Documentação do Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/).

Os arquivos de `assets/images/` e `assets/icons/` vieram do Figma fornecido como referência. Os ícones de instalação em `assets/` são os padrões do template Expo.
