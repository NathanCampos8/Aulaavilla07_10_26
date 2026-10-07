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
