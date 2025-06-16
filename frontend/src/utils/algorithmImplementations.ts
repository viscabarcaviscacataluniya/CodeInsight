
import { bubbleSort } from './sorts/bubbleSort';
import { insertionSort } from './sorts/insertionSort';
import { selectionSort } from './sorts/selectionSort';
import { mergeSort } from './sorts/mergeSort';
import { quickSort } from './sorts/quickSort';
import { heapSort } from './sorts/heapSort';
import { linearSearch } from './sorts/linearSearch';
import { binarySearch } from './sorts/binarySearch';
import { primsAlgorithm } from './sorts/primsAlgorithm';
import { kruskalAlgorithm } from './sorts/kruskalAlgorithm';
import { twoSum } from './leetcode/twoSum';
import { validParentheses } from './leetcode/validParentheses';
import { maxSubarray } from './leetcode/maxSubarray';
import { reverseLinkedList } from './leetcode/reverseLinkedList';
import { mergeSortedLists } from './leetcode/mergeSortedLists';
import { nQueens } from './leetcode/nQueens';
import { fibonacciSequence } from './leetcode/fibonacciSequence';
import { factorialVisualization } from './leetcode/factorialVisualization';
import { palindromeCheck } from './leetcode/palindromeCheck';
import { wordSearch } from './leetcode/wordSearch';
import { rotateImage } from './leetcode/rotateImage';
import { containerWithMostWater } from './leetcode/containerWithMostWater';
import { climbingStairs } from './leetcode/climbingStairs';
import { longestPalindromicSubstring } from './leetcode/longestPalindromicSubstring';
import { trappingRainWater } from './leetcode/trappingRainWater';
import { wordBreak } from './leetcode/wordBreak';

// Export all algorithms as a map
export const algorithmMap = {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  quickSort,
  heapSort,
  linearSearch,
  binarySearch,
  primsAlgorithm,
  kruskalAlgorithm,
  // LeetCode problems
  twoSum,
  validParentheses,
  maxSubarray,
  reverseLinkedList,
  mergeSortedLists,
  nQueens,
  fibonacciSequence,
  factorialVisualization,
  palindromeCheck,
  wordSearch,
  rotateImage,
  containerWithMostWater,
  climbingStairs,
  longestPalindromicSubstring,
  trappingRainWater,
  wordBreak
};

// Re-export individual algorithms
export {
  bubbleSort,
  insertionSort,
  selectionSort,
  mergeSort,
  quickSort,
  heapSort,
  linearSearch,
  binarySearch,
  primsAlgorithm,
  kruskalAlgorithm,
  // LeetCode problems
  twoSum,
  validParentheses,
  maxSubarray,
  reverseLinkedList,
  mergeSortedLists,
  nQueens,
  fibonacciSequence,
  factorialVisualization,
  palindromeCheck,
  wordSearch,
  rotateImage,
  containerWithMostWater,
  climbingStairs,
  longestPalindromicSubstring,
  trappingRainWater,
  wordBreak
};
