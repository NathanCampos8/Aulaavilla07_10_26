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
