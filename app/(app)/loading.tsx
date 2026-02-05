import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { mockAnalyzePlant } from "../utils/mockAnalyzePlant";
import { saveScan } from "../utils/Storage";

export default function LoadingScreen() {
  const { imageUri } = useLocalSearchParams<{ imageUri: string }>();
  const [stage, setStage] = useState("Scanning leaf...");

  useEffect(() => {
    // ISSUE FIX: Added cleanup for all timers
    const timer1 = setTimeout(() => setStage("Matching plant database..."), 800);
    const timer2 = setTimeout(() => setStage("Finalizing results..."), 1600);

    // ISSUE FIX: Wrapped navigation logic in setTimeout with proper return
    const timer3 = setTimeout(() => {
      const result = mockAnalyzePlant(imageUri);

      if (!result.isPlant) {
        router.replace("/(app)/not-plant");
        return;
      }

      router.replace({
        pathname: "/(app)/result",
        params: {
          plantId: result.plantId!,
          confidence: result.confidence!.toString(),
          imageUri,
        },
      });
    }, 2500);

    // ISSUE FIX: Return cleanup function to clear all timers
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [imageUri]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>{stage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
  },
});