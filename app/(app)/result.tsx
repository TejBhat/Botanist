import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { PLANTS } from "../../data/plants";

export default function ResultScreen() {
  // ISSUE FIX: Removed duplicate destructuring, kept only one with proper typing
  const { plantId, confidence, imageUri } = useLocalSearchParams<{
    imageUri?: string;
    plantId?: keyof typeof PLANTS;
    confidence?: string;
  }>();

  // ISSUE FIX: Changed typo 'cconst' to 'const' and changed 'plants.find' to 'PLANTS[plantId]' to access object
  const plant = plantId ? PLANTS[plantId] : undefined;

  if (!plant) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Plant not recognized 🌱</Text>
        <Text>Try taking a clearer photo of the leaf.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}

      <Text style={styles.title}>{plant.name}</Text>
      <Text style={styles.scientific}>{plant.scientific}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Origin</Text>
        <Text style={styles.value}>{plant.origin}</Text>

        <Text style={styles.label}>Discovered</Text>
        <Text style={styles.value}>{plant.discovered}</Text>

        <Text style={styles.label}>Benefits</Text>
        <Text style={styles.value}>{plant.benefits}</Text>

        <Text style={styles.accuracy}>
          Identification Confidence: {confidence}%
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#F9FFF4",
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#006400",
  },
  scientific: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 24,
    color: "#4F7942",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 16,
    color: "#006400",
  },
  value: {
    fontSize: 16,
    marginTop: 4,
    color: "#333",
  },
  accuracy: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
  },
});