interface HeaderProps {
  onAlgorithmSelect: (algorithm: string) => void;
  detectedAlgorithm: string; // Add this prop
}

export const Header = ({
  onAlgorithmSelect,
  detectedAlgorithm // Receive the detected algorithm
}: HeaderProps) => {
  return (
    <div className="flex flex-col p-4 gap-4 bg-gradient-to-r from-primary/80 to-secondary">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">CODEINSIGHT</h1>
          <p className="text-white/80 text-sm">
            Write C++ algorithms and see them in action
          </p>
        </div>
        
        {/* Detection status indicator */}
        <div className="px-3 py-1.5 rounded-md bg-white/10 backdrop-blur-sm border border-white/20">
          <p className="text-white text-xs font-medium">
            {detectedAlgorithm 
              ? `Detected: ${detectedAlgorithm.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`
              : "No algorithm detected"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {/* Sorting Algorithms */}
        <div className="col-span-2 md:col-span-5">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-white/90 text-xs uppercase font-semibold py-0">
              Sorting Algorithms
            </h2>
            <span className="text-xs text-white/60">
              {detectedAlgorithm.startsWith('sort') ? 'Active' : ''}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["bubbleSort", "insertionSort", "selectionSort", "mergeSort", "quickSort", "heapSort"].map(algorithm => (
              <button 
                key={algorithm}
                onClick={() => onAlgorithmSelect(algorithm)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  detectedAlgorithm === algorithm
                    ? "bg-white text-primary font-bold shadow-lg"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {algorithm.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
        
        {/* Search Algorithms */}
        <div className="col-span-2 md:col-span-2">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-white/90 text-xs uppercase font-semibold">
              Search Algorithms
            </h2>
            <span className="text-xs text-white/60">
              {detectedAlgorithm.includes('Search') ? 'Active' : ''}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["linearSearch", "binarySearch"].map(algorithm => (
              <button 
                key={algorithm}
                onClick={() => onAlgorithmSelect(algorithm)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  detectedAlgorithm === algorithm
                    ? "bg-white text-primary font-bold shadow-lg"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {algorithm.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
        
        {/* Graph Algorithms */}
        <div className="col-span-2 md:col-span-3">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-white/90 text-xs uppercase font-semibold">
              Graph Algorithms
            </h2>
            <span className="text-xs text-white/60">
              {detectedAlgorithm.includes('Algorithm') ? 'Active' : ''}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["primsAlgorithm", "kruskalAlgorithm"].map(algorithm => (
              <button 
                key={algorithm}
                onClick={() => onAlgorithmSelect(algorithm)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  detectedAlgorithm === algorithm
                    ? "bg-white text-primary font-bold shadow-lg"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {algorithm.replace(/Algorithm/g, '').replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) + "'s Algorithm"}
              </button>
            ))}
          </div>
        </div>
        
        {/* LeetCode Problems */}
        <div className="col-span-2 md:col-span-5">
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-white/90 text-xs uppercase font-semibold">
              LeetCode Problems
            </h2>
            <span className="text-xs text-white/60">
              {detectedAlgorithm && !detectedAlgorithm.endsWith('Sort') && 
               !detectedAlgorithm.endsWith('Search') && 
               !detectedAlgorithm.includes('Algorithm') ? 'Active' : ''}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {["twoSum", "validParentheses", "maxSubarray", "reverseLinkedList", "mergeSortedLists", "nQueens", "fibonacciSequence", "factorialVisualization", "palindromeCheck", "wordSearch", "rotateImage", "containerWithMostWater", "climbingStairs", "longestPalindromicSubstring", "trappingRainWater", "wordBreak"].map(algorithm => (
              <button 
                key={algorithm}
                onClick={() => onAlgorithmSelect(algorithm)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  detectedAlgorithm === algorithm
                    ? "bg-white text-primary font-bold shadow-lg"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {algorithm.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};