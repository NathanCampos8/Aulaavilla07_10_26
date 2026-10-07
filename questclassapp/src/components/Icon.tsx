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
