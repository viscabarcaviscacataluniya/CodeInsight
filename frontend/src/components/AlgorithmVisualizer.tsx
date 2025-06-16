import { detectAlgorithm } from "@/utils/algorithmDetector";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CodeEditor from "./CodeEditor";
import { Header } from "./algorithm/Header";
import { ResultVisualization } from "./algorithm/ResultVisualization";
import ComplexityInfo from "./algorithm/ComplexityInfo";
import { codeTemplates } from "./algorithm/templates";
import { ExecutionMode } from "@/utils/types/visualizationTypes";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Loader2 } from "lucide-react";

interface AlgorithmVisualizerProps {
  initialAlgorithm?: string | null;
  startEmpty?: boolean;
}

interface ExtendedAlgorithmResult {
  steps: any[];
  output: string[];
  sortedArray: number[];
  algorithmName: string;
  mode: ExecutionMode;
  rawOutput?: string;
}

const AlgorithmVisualizer = ({ initialAlgorithm, startEmpty = false }: AlgorithmVisualizerProps = {}) => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string>(startEmpty ? "" : codeTemplates.bubbleSort);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [result, setResult] = useState<ExtendedAlgorithmResult>({
    steps: [],
    output: [],
    sortedArray: [],
    algorithmName: "",
    mode: 'visualization'
  });
  const [currentTab, setCurrentTab] = useState<string>("execution");
  const [detectedAlgo, setDetectedAlgo] = useState<string>("");
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Set code based on initialAlgorithm prop if provided and not starting empty
    if (!startEmpty && initialAlgorithm && initialAlgorithm in codeTemplates) {
      const templateKey = initialAlgorithm as keyof typeof codeTemplates;
      setCode(codeTemplates[templateKey]);
      setDetectedAlgo(initialAlgorithm);
      
      // Auto-run the algorithm when initializing from a direct link
      setTimeout(() => {
        handleRunCode();
      }, 300);
    }

    // Set up web worker
    workerRef.current = new Worker(new URL('@/utils/codeWorker', import.meta.url), {
      type: 'module'
    });

    workerRef.current.onmessage = (event) => {
      const { status, result, error, rawOutput } = event.data;
      
      if (status === 'success') {
        setResult(result);
        setCurrentTab(result.mode === 'visualization' ? 'visualization' : 'execution');
        
        toast({
          title: result.mode === 'visualization' 
            ? `Visualizing ${result.algorithmName}`
            : "Executed code normally",
        });
      } else {
        const errorResult: ExtendedAlgorithmResult = {
          steps: [],
          output: rawOutput || [`Execution error: ${error}`],
          sortedArray: [],
          algorithmName: "Error",
          mode: 'error'
        };
        setResult(errorResult);
        setCurrentTab('execution');
        
        toast({
          title: "Execution error",
          description: error,
          variant: "destructive",
        });
      }
      
      setIsExecuting(false);
    };

    workerRef.current.onerror = (error) => {
      console.error("Worker error:", error);
      setIsExecuting(false);
      
      toast({
        title: "Execution failed",
        description: "Worker thread crashed",
        variant: "destructive",
      });
    };

    // Clean up worker
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, [initialAlgorithm, startEmpty]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleRunCode = () => {
    if (!code.trim()) {
      toast({
        title: "No code to execute",
        description: "Please enter some code first",
        variant: "destructive",
      });
      return;
    }

    if (!workerRef.current) {
      toast({
        title: "Execution system not ready",
        description: "Please try again in a moment",
        variant: "destructive",
      });
      return;
    }

    setIsExecuting(true);
    
    // Clear previous result
    setResult({
      steps: [],
      output: [],
      sortedArray: [],
      algorithmName: "",
      mode: 'visualization'
    });

    // Detect algorithm first
    const detectedAlgorithm = detectAlgorithm(code);
    setDetectedAlgo(detectedAlgorithm || "");

    // Send code to worker for execution
    workerRef.current.postMessage({ 
      code, 
      visualize: !!detectedAlgorithm,
      detectedAlgorithm
    });
  };

  const handleAlgorithmSelect = (algorithm: keyof typeof codeTemplates) => {
    setCode(codeTemplates[algorithm]);
    setDetectedAlgo(algorithm);
    
    // Reset the result when changing algorithms
    setResult({
      steps: [],
      output: [],
      sortedArray: [],
      algorithmName: "",
      mode: 'visualization'
    });
    
    // Auto-run the algorithm when selected
    setTimeout(() => {
      handleRunCode();
    }, 300);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-background/95">
      {/* Enhanced navigation bar with glass effect */}
      <div className="relative backdrop-blur-md bg-gradient-to-r from-primary/90 to-secondary/90 border-b border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
        <div className="relative p-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          {/* Complexity info moved to header area */}
          {result.algorithmName && result.algorithmName !== "Error" && result.algorithmName !== "" && (
            <div className="flex-1 max-w-md mx-4">
              <ComplexityInfo algorithmName={result.algorithmName} />
            </div>
          )}
          
          {/* Execution status indicator */}
          {isExecuting && (
            <div className="flex items-center bg-white/10 px-3 py-1 rounded-full text-sm text-white">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Executing code...
            </div>
          )}
        </div>
      </div>
      
      <Header 
        onAlgorithmSelect={handleAlgorithmSelect} 
        detectedAlgorithm={detectedAlgo}
      />
      
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
          {/* Code Editor - smaller width */}
          <div className="lg:col-span-2 h-[calc(100vh-220px)] backdrop-blur-sm bg-card/60 rounded-xl border border-border/50 shadow-2xl overflow-hidden">
            <CodeEditor 
              onCodeChange={handleCodeChange} 
              onRunCode={handleRunCode} 
              defaultCode={code} 
              isExecuting={isExecuting}
            />
          </div>
          
          {/* Visualization - larger width for better viewing */}
          <div className="lg:col-span-3 max-h-full overflow-auto backdrop-blur-sm bg-card/60 rounded-xl border border-border/50 shadow-2xl">
            <ResultVisualization
              result={result}
              isExecuting={isExecuting}
              currentTab={currentTab}
              onTabChange={setCurrentTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;