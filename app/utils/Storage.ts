import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "plant_scans";

// IMPROVEMENT: Added type definition for better type safety
export type ScanRecord = {
  id: number;
  plantId: string;
  confidence: number;
  imageUri: string;
  timestamp: number;
};

export async function saveScan(scan: ScanRecord) {
  // IMPROVEMENT: Added try-catch for error handling
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const scans: ScanRecord[] = existing ? JSON.parse(existing) : [];

    scans.unshift(scan); // newest first
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(scans));
  } catch (error) {
    console.error("Error saving scan:", error);
    throw error;
  }
}

export async function getScans(): Promise<ScanRecord[]> {
  // IMPROVEMENT: Added try-catch for error handling
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error getting scans:", error);
    return [];
  }
}