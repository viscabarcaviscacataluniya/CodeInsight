// Simple algorithm detection based on function names
export function detectAlgorithm(code: string): string | null {
  // Normalize code for easier matching
  const normalizedCode = code.toLowerCase().replace(/\s+/g, '');
  
  const algoPatterns: Record<string, RegExp> = {
    bubbleSort: /bubblesort|bubble_sort/,
    quickSort: /quicksort|quick_sort|partition/,
    mergeSort: /mergesort|merge_sort|merge\(/,
    insertionSort: /insertionsort|insertion_sort/,
    selectionSort: /selectionsort|selection_sort/,
    linearSearch: /linearsearch|linear_search/,
    binarySearch: /binarysearch|binary_search/,
    bfs: /bfs|breadthfirstsearch/,
    dfs: /dfs|depthfirstsearch/,
    dijkstra: /dijkstra/,
  };

  for (const [algoName, pattern] of Object.entries(algoPatterns)) {
    if (pattern.test(normalizedCode)) return algoName;
  }
  
  return null;
}