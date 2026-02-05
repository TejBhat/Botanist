import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
// ISSUE FIX: Changed import path from 'storage' to 'Storage' to match actual filename
import { getScans } from "../app/utils/Storage";

export default function HistoryScreen() {
  const [scans, setScans] = useState<any[]>([]);

  useEffect(() => {
    getScans().then(setScans);
  }, []);

  return (
    <FlatList
      data={scans}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.imageUri }} style={styles.image} />
          <Text style={styles.text}>
            Confidence: {item.confidence}%
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
  text: {
    fontWeight: "bold",
    color: "#006400",
  },
});