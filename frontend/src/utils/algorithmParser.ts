
import { AlgorithmType } from "./types/visualizationTypes";
import { detectAlgorithmByName, detectAlgorithmByPattern } from "./parsing/algorithmTypeDetector";
import { extractArrayFromCode } from "./parsing/arrayExtractor";

/**
 * Parses C++ code and identifies the algorithm type
 */
export function parseAlgorithm(code: string): AlgorithmType {
  console.log("Parsing algorithm from code...");
  const lowerCode = code.toLowerCase();
  
  // First, check if the code is a basic arithmetic operation
  if (/\d+\s*[\+\-\*\/]\s*\d+/.test(code) && !code.includes("sort") && !code.includes("search") && !code.includes("algorithm")) {
    console.log("Detected basic arithmetic operation");
    return "none";
  }
  
  // Try to detect algorithm by name
  const algorithmByName = detectAlgorithmByName(code);
  if (algorithmByName) {
    return algorithmByName;
  }
  
  // Try to detect algorithm by pattern
  const algorithmByPattern = detectAlgorithmByPattern(code);
  if (algorithmByPattern) {
    return algorithmByPattern;
  }
  
  // If no pattern detected and code contains array operations
  if (lowerCode.includes("array") || lowerCode.includes("arr[") || lowerCode.includes("int arr")) {
    console.log("Unidentified algorithm with array operations, trying to execute as-is");
    return "none";
  }
  
  console.log("No algorithm detected, treating as normal code");
  return "none";
}

// Re-export the extractArrayFromCode function
export { extractArrayFromCode };
