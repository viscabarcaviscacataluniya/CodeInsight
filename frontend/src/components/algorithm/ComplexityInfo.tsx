
import { Card } from "@/components/ui/card";
import { InfoIcon } from "lucide-react";

interface ComplexityInfoProps {
  algorithmName: string;
}

const ComplexityInfo = ({
  algorithmName
}: ComplexityInfoProps) => {
  const getComplexity = (name: string) => {
    const complexities: {
      [key: string]: {
        time: {
          avg: string;
          best: string;
          worst: string;
        };
        space: string;
        description: string;
      };
    } = {
      "Bubble Sort": {
        time: {
          avg: "O(n²)",
          best: "O(n)",
          worst: "O(n²)"
        },
        space: "O(1)",
        description: "Simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
      },
      "Insertion Sort": {
        time: {
          avg: "O(n²)",
          best: "O(n)",
          worst: "O(n²)"
        },
        space: "O(1)",
        description: "Builds the sorted array one item at a time by comparing each with the items before it."
      },
      "Selection Sort": {
        time: {
          avg: "O(n²)",
          best: "O(n²)",
          worst: "O(n²)"
        },
        space: "O(1)",
        description: "Repeatedly finds the minimum element from the unsorted part and puts it at the beginning."
      },
      "Merge Sort": {
        time: {
          avg: "O(n log n)",
          best: "O(n log n)",
          worst: "O(n log n)"
        },
        space: "O(n)",
        description: "Divide and conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges."
      },
      "Quick Sort": {
        time: {
          avg: "O(n log n)",
          best: "O(n log n)",
          worst: "O(n²)"
        },
        space: "O(log n)",
        description: "Divide and conquer algorithm that picks a pivot element and partitions the array around it."
      },
      "Heap Sort": {
        time: {
          avg: "O(n log n)",
          best: "O(n log n)",
          worst: "O(n log n)"
        },
        space: "O(1)",
        description: "Comparison-based sorting that uses a binary heap data structure."
      },
      "Linear Search": {
        time: {
          avg: "O(n)",
          best: "O(1)",
          worst: "O(n)"
        },
        space: "O(1)",
        description: "Sequentially checks each element until it finds the target value."
      },
      "Binary Search": {
        time: {
          avg: "O(log n)",
          best: "O(1)",
          worst: "O(log n)"
        },
        space: "O(1)",
        description: "Finds the position of a target value in a sorted array by repeatedly dividing the search range in half."
      },
      "Prim's Algorithm": {
        time: {
          avg: "O(E log V)",
          best: "O(E log V)",
          worst: "O(E log V)"
        },
        space: "O(V)",
        description: "Finds a minimum spanning tree for a weighted undirected graph by always taking the minimum weight edge."
      },
      "Kruskal's Algorithm": {
        time: {
          avg: "O(E log E)",
          best: "O(E log E)",
          worst: "O(E log E)"
        },
        space: "O(V + E)",
        description: "Finds a minimum spanning tree using a greedy approach by always choosing the smallest edge that doesn't form a cycle."
      },
      "Fibonacci Sequence": {
        time: {
          avg: "O(n)",
          best: "O(n)",
          worst: "O(n)"
        },
        space: "O(1)",
        description: "Generates the Fibonacci sequence where each number is the sum of the two preceding ones."
      },
      "Factorial": {
        time: {
          avg: "O(n)",
          best: "O(n)",
          worst: "O(n)"
        },
        space: "O(1)",
        description: "Computes the factorial of a number, which is the product of all positive integers less than or equal to that number."
      },
      "Palindrome Check": {
        time: {
          avg: "O(n)",
          best: "O(1)",
          worst: "O(n)"
        },
        space: "O(1)",
        description: "Checks if an array reads the same forwards and backwards using two pointers from both ends."
      },
      "Normal Execution": {
        time: {
          avg: "O(1)",
          best: "O(1)",
          worst: "O(1)"
        },
        space: "O(1)",
        description: "Basic program execution without algorithmic complexity."
      },
      "Error": {
        time: {
          avg: "N/A",
          best: "N/A",
          worst: "N/A"
        },
        space: "N/A",
        description: "Error in execution."
      }
    };
    return complexities[name] || {
      time: {
        avg: "O(n^2)",
        best: "O(n)",
        worst: "O(n^2)"
      },
      space: "Unknown",
      description: "Unknown algorithm."
    };
  };

  const complexity = getComplexity(algorithmName);

  return (
    <Card className="p-4 bg-card/80 backdrop-blur-sm border-border/50">
      <div className="flex items-start gap-3">
        <InfoIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div className="space-y-3 flex-1">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Algorithm Complexity</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {complexity.description}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Time Complexity</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Best:</span>
                  <span className="font-mono text-foreground">{complexity.time.best}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average:</span>
                  <span className="font-mono text-foreground">{complexity.time.avg}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Worst:</span>
                  <span className="font-mono text-foreground">{complexity.time.worst}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Space Complexity</h4>
              <div className="text-xs">
                <span className="font-mono text-foreground">{complexity.space}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ComplexityInfo;
