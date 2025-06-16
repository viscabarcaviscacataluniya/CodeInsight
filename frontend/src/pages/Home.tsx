
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CodeIcon, Share2Icon, LayoutDashboardIcon } from "lucide-react";

const Home = () => {
  const algorithmCategories = [
    {
      title: "Sorting Algorithms",
      description: "Algorithms to sort data in different ways",
      algorithms: [{
        name: "Bubble Sort",
        id: "bubbleSort"
      }, {
        name: "Insertion Sort",
        id: "insertionSort"
      }, {
        name: "Selection Sort",
        id: "selectionSort"
      }, {
        name: "Merge Sort",
        id: "mergeSort"
      }, {
        name: "Quick Sort",
        id: "quickSort"
      }, {
        name: "Heap Sort",
        id: "heapSort"
      }]
    }, {
      title: "Search Algorithms",
      description: "Algorithms to search for elements in data structures",
      algorithms: [{
        name: "Linear Search",
        id: "linearSearch"
      }, {
        name: "Binary Search",
        id: "binarySearch"
      }]
    }, {
      title: "Graph Algorithms",
      description: "Algorithms to work with graph data structures",
      algorithms: [{
        name: "Prim's Algorithm",
        id: "primsAlgorithm"
      }, {
        name: "Kruskal's Algorithm",
        id: "kruskalAlgorithm"
      }]
    }, {
      title: "LeetCode - Array & String Problems",
      description: "Common array and string problems from LeetCode",
      algorithms: [{
        name: "Two Sum",
        id: "twoSum"
      }, {
        name: "Maximum Subarray",
        id: "maxSubarray"
      }, {
        name: "Container With Most Water",
        id: "containerWithMostWater"
      }, {
        name: "Rotate Image",
        id: "rotateImage"
      }, {
        name: "Trapping Rain Water",
        id: "trappingRainWater"
      }, {
        name: "Longest Palindromic Substring",
        id: "longestPalindromicSubstring"
      }]
    }, {
      title: "LeetCode - Dynamic Programming",
      description: "Dynamic programming problems from LeetCode",
      algorithms: [{
        name: "Climbing Stairs",
        id: "climbingStairs"
      }, {
        name: "Word Break",
        id: "wordBreak"
      }]
    }, {
      title: "LeetCode - Data Structures",
      description: "Problems involving various data structures",
      algorithms: [{
        name: "Valid Parentheses",
        id: "validParentheses"
      }, {
        name: "Reverse Linked List",
        id: "reverseLinkedList"
      }, {
        name: "Merge Two Sorted Lists",
        id: "mergeSortedLists"
      }]
    }, {
      title: "LeetCode - Backtracking & Search",
      description: "Backtracking and search algorithms from LeetCode",
      algorithms: [{
        name: "N-Queens",
        id: "nQueens"
      }, {
        name: "Word Search",
        id: "wordSearch"
      }]
    }, {
      title: "Math Problems",
      description: "Mathematical algorithms and computations",
      algorithms: [{
        name: "Fibonacci Sequence",
        id: "fibonacciSequence"
      }, {
        name: "Factorial Visualization",
        id: "factorialVisualization"
      }, {
        name: "Palindrome Check",
        id: "palindromeCheck"
      }]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Enhanced hero section with translucency */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-secondary/90"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        
        <div className="relative container mx-auto py-20 px-4">
          <div className="text-center mb-8">
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl inline-block">
              <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-2xl">CODEINSIGHT</h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-lg">
                Visualize, learn and understand algorithms through interactive animations
              </p>
            </div>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-white/90 text-primary hover:bg-white backdrop-blur-sm border border-white/20 shadow-2xl hover:scale-105 transition-all duration-200">
                <Link to="/editor?empty=true">
                  <CodeIcon className="mr-2 h-5 w-5" /> Go to Code Editor
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore Algorithms</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {algorithmCategories.map(category => (
            <Card key={category.title} className="backdrop-blur-sm bg-card/80 border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <CardHeader className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-t-lg"></div>
                <div className="relative">
                  <CardTitle className="drop-shadow-sm">{category.title}</CardTitle>
                  <CardDescription className="text-muted-foreground/90">{category.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {category.algorithms.map(algo => (
                    <Button key={algo.id} variant="outline" asChild className="justify-start backdrop-blur-sm bg-background/50 border-border/50 hover:bg-accent/80 hover:scale-102 transition-all duration-200 shadow-lg">
                      <Link to={`/editor?algorithm=${algo.id}`}>
                        <Share2Icon className="mr-2 h-4 w-4" />
                        {algo.name}
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="backdrop-blur-sm bg-card/60 rounded-2xl p-8 border border-border/50 shadow-2xl inline-block">
            <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Select an algorithm from the categories above or go directly to the editor to start visualizing algorithms.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild className="backdrop-blur-sm shadow-xl hover:scale-105 transition-all duration-200">
                <Link to="/editor?empty=true">
                  <CodeIcon className="mr-2 h-5 w-5" /> Open Editor
                </Link>
              </Button>
              <Button variant="outline" asChild className="backdrop-blur-sm bg-background/50 border-border/50 shadow-xl hover:scale-105 transition-all duration-200">
                <Link to="/dashboard">
                  <LayoutDashboardIcon className="mr-2 h-5 w-5" /> Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
