import { PLANTS } from "../../data/plants";

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

  const plantKeys = Object.keys(PLANTS);
  const randomPlant = plantKeys[Math.floor(Math.random() * plantKeys.length)];

  return {
    isPlant: true,
    plantId: randomPlant,
    confidence: Math.floor(85 + Math.random() * 10),
  };
}