
import { AlgorithmType } from '../types/visualizationTypes';

/**
 * Detects the algorithm type by looking for specific function/class names in the code
 */
export function detectAlgorithmByName(code: string): AlgorithmType | null {
  const lowerCode = code.toLowerCase();
  
  // Match function names like "bubbleSort" or "bubble_sort"
  if (/(^|\W)(bubble\s*sort|bubblesort)(\W|$)/i.test(code)) {
    return "bubbleSort";
  }
  
  if (/(^|\W)(insertion\s*sort|insertionsort)(\W|$)/i.test(code)) {
    return "insertionSort";
  }
  
  if (/(^|\W)(selection\s*sort|selectionsort)(\W|$)/i.test(code)) {
    return "selectionSort";
  }
  
  if (/(^|\W)(merge\s*sort|mergesort)(\W|$)/i.test(code)) {
    return "mergeSort";
  }
  
  if (/(^|\W)(quick\s*sort|quicksort)(\W|$)/i.test(code)) {
    return "quickSort";
  }
  
  if (/(^|\W)(heap\s*sort|heapsort)(\W|$)/i.test(code)) {
    return "heapSort";
  }

  if (/(^|\W)(linear\s*search|linearsearch)(\W|$)/i.test(code)) {
    return "linearSearch";
  }

  if (/(^|\W)(binary\s*search|binarysearch)(\W|$)/i.test(code)) {
    return "binarySearch";
  }
  
  if (/(^|\W)(prim['']?s|prim['']?s\s*algorithm|mst|minimum\s*spanning\s*tree)(\W|$)/i.test(code)) {
    return "primsAlgorithm";
  }
  
  if (/(^|\W)(kruskal['']?s|kruskal['']?s\s*algorithm)(\W|$)/i.test(code)) {
    return "kruskalAlgorithm";
  }
  
  // LeetCode problems
  if (/(^|\W)(two\s*sum|twosum)(\W|$)/i.test(code)) {
    return "twoSum";
  }
  
  if (/(^|\W)(valid\s*parentheses|validparentheses|balanced\s*parentheses)(\W|$)/i.test(code)) {
    return "validParentheses";
  }
  
  if (/(^|\W)(max(imum)?\s*subarray|kadane['']?s\s*algorithm)(\W|$)/i.test(code)) {
    return "maxSubarray";
  }
  
  if (/(^|\W)(reverse\s*linked\s*list|reverselinkedlist)(\W|$)/i.test(code)) {
    return "reverseLinkedList";
  }
  
  if (/(^|\W)(merge\s*(two)?\s*sorted\s*(linked)?\s*lists|mergesortedlists)(\W|$)/i.test(code)) {
    return "mergeSortedLists";
  }
  
  return null;
}

/**
 * Detects the algorithm type by looking for patterns in the code structure
 */
export function detectAlgorithmByPattern(code: string): AlgorithmType | null {
  const lowerCode = code.toLowerCase();
  
  // Bubble Sort pattern: nested loop with adjacent comparison and swap
  if (/for.*for.*if.*>.*temp.*=/.test(lowerCode) || /for.*for.*if.*>.*swap/.test(lowerCode)) {
    return "bubbleSort";
  }
  
  // Insertion Sort pattern: outer loop, inner loop with shifting elements
  if (/for.*\{.*key.*=.*arr\[i\].*for.*\>.*key.*\{.*arr\[j.*\+.*1\].*=.*arr\[j\]/.test(lowerCode)) {
    return "insertionSort";
  }
  
  // Selection Sort pattern: finding min/max and swapping
  if (/for.*\{.*min.*=.*i.*for.*if.*<.*min.*\}.*swap/.test(lowerCode) ||
      /for.*\{.*for.*if.*<.*min_idx.*\}.*swap/.test(lowerCode)) {
    return "selectionSort";
  }
  
  // Merge Sort pattern: recursive calls plus merge function
  if (/merge.*sort.*\(.*mid.*\).*merge.*sort.*\(.*mid.*\+.*1.*\).*merge/.test(lowerCode)) {
    return "mergeSort";
  }
  
  // Quick Sort pattern: partition and recursive calls
  if (/partition.*pivot.*quicksort.*pivot.*quicksort/.test(lowerCode) ||
      /partition.*\(.*pivot.*\).*quick.*sort.*\(.*pivot.*quick.*sort/.test(lowerCode)) {
    return "quickSort";
  }

  // Heap Sort pattern: heapify function and building heap
  if (/heapify.*for.*\{.*heapify.*\}/.test(lowerCode)) {
    return "heapSort";
  }
  
  // Linear Search pattern: simple loop with comparison
  if (/for.*\{.*if.*==.*return/.test(lowerCode) && !/(binary|mid|middle|pivot)/.test(lowerCode)) {
    return "linearSearch";
  }
  
  // Binary Search pattern: calculating mid and comparing
  if (/(start|left|low|l).*<=.*(end|right|high|r).*mid.*=.*(start|left|low|l).*\+.*\(.*(end|right|high|r).*(start|left|low|l).*\)/.test(lowerCode)) {
    return "binarySearch";
  }
  
  // Prim's algorithm pattern
  if (/mst.*key.*parent.*boolean.*extract.*min.*adjacent/.test(lowerCode)) {
    return "primsAlgorithm";
  }
  
  // Kruskal's algorithm pattern
  if (/disjoint.*find.*union.*sort.*edge/.test(lowerCode)) {
    return "kruskalAlgorithm";
  }
  
  // Two Sum pattern
  if (/map.*target.*complement.*return.*\[.*\]/.test(lowerCode)) {
    return "twoSum";
  }
  
  // Valid Parentheses pattern
  if (/stack.*push.*pop.*\(.*\).*\{.*\}.*\[.*\]/.test(lowerCode)) {
    return "validParentheses";
  }
  
  // Maximum Subarray (Kadane's algorithm) pattern
  if (/max_so_far.*max_ending_here.*max.*\(.*\+/.test(lowerCode)) {
    return "maxSubarray";
  }
  
  // Reverse Linked List pattern
  if (/prev.*curr.*next.*curr.*->.*next.*prev/.test(lowerCode)) {
    return "reverseLinkedList";
  }
  
  // Merge Two Sorted Lists pattern
  if (/merge.*list.*->.*next.*dummy/.test(lowerCode)) {
    return "mergeSortedLists";
  }
  
  return null;
}
