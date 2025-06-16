import { parseAlgorithm, extractArrayFromCode } from './algorithmParser';
import { algorithmMap } from './algorithmImplementations';
import { AlgorithmResult } from './types/visualizationTypes';
import { executeCodeWithJudge0, JUDGE0_LANGUAGES } from '@/integrations/judge0/judge0Service';

// Simulated execution for fallback
function executeActualCode(code: string): string[] {
  const output: string[] = [];
  
  try {
    // ... (your existing executeActualCode implementation) ...
    // Keep your existing implementation here
    // This is the fallback when Judge0 fails
    
    return output;
  } catch (error) {
    return ["Error executing code:", (error as Error).message];
  }
}

// Helper functions
function evaluateExpression(expr: string, code: string): number | string | null {
  // ... (your existing evaluateExpression implementation) ...
  return null;
}

function executeExpressions(code: string): string[] {
  // ... (your existing executeExpressions implementation) ...
  return [];
}

// Normal code execution using Judge0
async function executeNormalCode(code: string): Promise<string[]> {
  try {
    // First try Judge0 execution
    return await executeCodeWithJudge0(code, JUDGE0_LANGUAGES.cpp);
  } catch (error) {
    console.error("Judge0 execution failed, falling back to simulation:", error);
    return executeActualCode(code);
  }
}

// Estimate memory usage to prevent crashes
function estimateMemoryUsage(testArray: number[]): void {
  const arraySize = testArray.length * 64 / 8; // 64-bit numbers
  const estimatedSteps = testArray.length * Math.log2(testArray.length || 1);
  const estimatedMemory = arraySize * estimatedSteps;
  
  if (estimatedMemory > 100000000) { // 100MB
    throw new Error(
      `Memory limit exceeded. Estimated ${Math.round(estimatedMemory/1000000)}MB needed.`
    );
  }
}

// Main execution function
export async function executeCode(
  code: string, 
  visualize: boolean
): Promise<AlgorithmResult> {
  try {
    console.log("Executing code...", visualize ? "with visualization" : "normally");
    
    // If not in visualization mode, just execute normally
    if (!visualize) {
      const output = await executeNormalCode(code);
      return {
        steps: [],
        output,
        sortedArray: [],
        algorithmName: "Normal Execution"
      };
    }
    
    // Try to identify if it's an algorithm
    const algorithmType = parseAlgorithm(code);
    console.log("Detected algorithm type:", algorithmType);
    
    // If no algorithm detected, execute normally
    if (algorithmType === "none") {
      const output = await executeNormalCode(code);
      return {
        steps: [],
        output,
        sortedArray: [],
        algorithmName: "Normal Execution"
      };
    }
    
    // For algorithms, extract array and run visualization
    let array = extractArrayFromCode(code);
    console.log("Extracted array:", array);
    
    // Use test arrays for specific algorithms
    let testArray: number[] = [];
    
    if (algorithmType === "validParentheses") {
      testArray = [1, 2, 3, -3, -2, -1];
    } else if (algorithmType === "reverseLinkedList") {
      testArray = [1, 2, 3, 4, 5];
    } else if (algorithmType === "wordBreak") {
      testArray = [0, 1, 2, 3, 4, 5];
    } else if (algorithmType === "climbingStairs") {
      testArray = [6];
    } else if (algorithmType === "mergeSortedLists") {
      testArray = [1, 3, 5, 2, 4, 6];
    } else if (algorithmType === "containerWithMostWater") {
      testArray = [1, 8, 6, 2, 5, 4, 8, 3, 7];
    } else if (algorithmType === "longestPalindromicSubstring") {
      testArray = [1, 0, 1, 0, 1];
    } else if (algorithmType === "trappingRainWater") {
      testArray = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
    } else if (algorithmType === "twoSum") {
      testArray = [2, 7, 11, 15];
    } else if (algorithmType === "linearSearch" || algorithmType === "binarySearch") {
      testArray = [1, 5, 7, 11, 12, 15, 20];
    } else if (array.length === 0) {
      testArray = [5, 3, 8, 4, 2, 1, 7, 6];
    } else {
      testArray = array;
    }
    
    // Add memory safety check
    estimateMemoryUsage(testArray);
    
    // Execute the algorithm
    const algorithmFunction = algorithmMap[algorithmType];
    
    if (!algorithmFunction) {
      console.warn("No algorithm function found, executing normally");
      const output = await executeNormalCode(code);
      return {
        steps: [],
        output,
        sortedArray: [],
        algorithmName: algorithmType
      };
    }
    
    const result = algorithmFunction(testArray);
    console.log("Algorithm execution completed");
    console.log("Algorithm name:", result.algorithmName);
    
    // Ensure output is populated with meaningful information
    if (!result.output || result.output.length === 0) {
      result.output = [`${result.algorithmName} executed successfully`];
    }
    
    return result;
  } catch (error) {
    console.error("Error executing code:", error);
    // Execute as normal code even if algorithm parsing fails
    const output = await executeNormalCode(code);
    return {
      steps: [],
      output: output.length > 0 ? output : ["Error executing code:", (error as Error).message],
      sortedArray: [],
      algorithmName: "Normal Execution"
    };
  }
}