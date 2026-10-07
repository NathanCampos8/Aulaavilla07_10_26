import { Inter_400Regular } from "@expo-google-fonts/inter/400Regular";
import { Inter_600SemiBold } from "@expo-google-fonts/inter/600SemiBold";
import { Inter_700Bold } from "@expo-google-fonts/inter/700Bold";
import { Inter_800ExtraBold } from "@expo-google-fonts/inter/800ExtraBold";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../../src/theme";
import { Stack } from "expo-router";

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
                <Stack
                    screenOptions={{
                        headerStyle: { backgroundColor: colors.surface },
                        headerTintColor: colors.text,
                        contentStyle: { backgroundColor: colors.background },
                    }}
                >
                    <Stack.Screen
                        name="index"
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="missao/[id].tsx"
                        options={{ title: "Missão" }}
                    />
                </Stack>
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
