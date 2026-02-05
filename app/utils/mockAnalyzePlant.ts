// ISSUE FIX: Added missing import
import { PLANTS } from "../../data/plants";

// ISSUE FIX: Added proper type definition for return value
export type AnalysisResult = 
  | { isPlant: false }
  | { isPlant: true; plantId: string; confidence: number };

export function mockAnalyzePlant(imageUri: string): AnalysisResult {
  const isPlant = Math.random() > 0.25; // 75% chance it's a plant

  if (!isPlant) {
    return {
      isPlant: false,
    };
  }

  // ISSUE FIX: Changed 'plants' to 'Object.keys(PLANTS)' since PLANTS is an object
  const plantKeys = Object.keys(PLANTS);
  const randomPlant = plantKeys[Math.floor(Math.random() * plantKeys.length)];

  return {
    isPlant: true,
    plantId: randomPlant,
    confidence: Math.floor(85 + Math.random() * 10),
  };
}