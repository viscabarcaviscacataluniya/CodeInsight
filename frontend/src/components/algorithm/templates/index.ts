
// Import all templates
import {
  bubbleSortTemplate,
  insertionSortTemplate,
  selectionSortTemplate,
  mergeSortTemplate,
  quickSortTemplate,
  heapSortTemplate
} from './sortingAlgorithms';
import {
  linearSearchTemplate,
  binarySearchTemplate
} from './searchingAlgorithms';
import {
  primsAlgorithmTemplate,
  kruskalAlgorithmTemplate
} from './graphAlgorithms';
import {
  twoSumTemplate,
  validParenthesesTemplate,
  maxSubarrayTemplate,
  reverseLinkedListTemplate,
  mergeSortedListsTemplate,
  nQueensTemplate,
  fibonacciSequenceTemplate,
  factorialVisualizationTemplate,
  palindromeCheckTemplate,
  wordSearchTemplate,
  rotateImageTemplate,
  containerWithMostWaterTemplate,
  climbingStairsTemplate,
  longestPalindromicSubstringTemplate,
  trappingRainWaterTemplate,
  wordBreakTemplate
} from './leetcode';

// Export as a single object for easier access across the application
export const codeTemplates = {
  // Sorting algorithms - all visualizable
  bubbleSort: bubbleSortTemplate,
  insertionSort: insertionSortTemplate,
  selectionSort: selectionSortTemplate,
  mergeSort: mergeSortTemplate,
  quickSort: quickSortTemplate,
  heapSort: heapSortTemplate,
  
  // Search algorithms - all visualizable
  linearSearch: linearSearchTemplate,
  binarySearch: binarySearchTemplate,
  
  // Graph algorithms - all visualizable
  primsAlgorithm: primsAlgorithmTemplate,
  kruskalAlgorithm: kruskalAlgorithmTemplate,
  
  // LeetCode problems - all visualizable
  twoSum: twoSumTemplate,
  validParentheses: validParenthesesTemplate,
  maxSubarray: maxSubarrayTemplate,
  reverseLinkedList: reverseLinkedListTemplate,
  mergeSortedLists: mergeSortedListsTemplate,
  nQueens: nQueensTemplate,
  wordSearch: wordSearchTemplate,
  rotateImage: rotateImageTemplate,
  containerWithMostWater: containerWithMostWaterTemplate,
  climbingStairs: climbingStairsTemplate,
  longestPalindromicSubstring: longestPalindromicSubstringTemplate,
  trappingRainWater: trappingRainWaterTemplate,
  wordBreak: wordBreakTemplate,
  
  // Math problems - all visualizable
  fibonacciSequence: fibonacciSequenceTemplate,
  factorialVisualization: factorialVisualizationTemplate,
  palindromeCheck: palindromeCheckTemplate
};
