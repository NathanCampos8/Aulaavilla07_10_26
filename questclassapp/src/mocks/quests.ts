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
