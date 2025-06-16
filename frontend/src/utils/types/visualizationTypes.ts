
export type ElementState = 'default' | 'comparing' | 'swapping' | 'sorted' | 'selected' | 'pivot';
export type VisualizationType = 'bar' | 'linkedList' | 'parentheses' | 'stairs' | 'wordBreak' | 'containerWithMostWater' | 'trappingRainWater';
// Add these to your existing visualization types
export type ExecutionMode = 'visualization' | 'normal' | 'error';

export interface ExtendedAlgorithmResult extends AlgorithmResult {
  mode: ExecutionMode;
  rawOutput?: string;
}

export interface ArrayElement {
  value: number;
  state: ElementState;
  visualType?: VisualizationType;
}

export interface VisualizationStep {
  array: ArrayElement[];
  description: string;
}

export interface AlgorithmResult {
  steps: VisualizationStep[];
  output: string[];
  sortedArray: number[];
  algorithmName: string;
}

export type AlgorithmType = 
  | "bubbleSort" 
  | "insertionSort" 
  | "selectionSort" 
  | "mergeSort" 
  | "quickSort" 
  | "heapSort"
  | "linearSearch"
  | "binarySearch"
  | "primsAlgorithm"
  | "kruskalAlgorithm"
  | "twoSum"
  | "validParentheses"
  | "maxSubarray"
  | "reverseLinkedList"
  | "mergeSortedLists"
  | "nQueens"
  | "jumpGame"
  | "coinChange"
  | "courseSchedule"
  | "wordSearch"
  | "rotateImage"
  | "containerWithMostWater"
  | "climbingStairs"
  | "longestPalindromicSubstring"
  | "trappingRainWater"
  | "wordBreak"
  | "none";  // Adding "none" as a valid algorithm type
