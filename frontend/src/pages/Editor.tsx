
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AlgorithmVisualizer from "@/components/AlgorithmVisualizer";
import { codeTemplates } from "@/components/algorithm/templates";

const Editor = () => {
  const [searchParams] = useSearchParams();
  const algorithmParam = searchParams.get('algorithm');
  const emptyParam = searchParams.get('empty');
  
  // Check if we should start with empty editor
  const startEmpty = emptyParam === 'true';
  
  useEffect(() => {
    // Update page title based on algorithm or empty state
    if (startEmpty) {
      document.title = "Code Editor - CodeInsight";
    } else if (algorithmParam && algorithmParam in codeTemplates) {
      const formattedName = algorithmParam
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());
      document.title = `${formattedName} - CodeInsight`;
    } else {
      document.title = "CodeInsight - Interactive Code Execution Platform";
    }
  }, [algorithmParam, startEmpty]);

  return (
    <div className="min-h-screen bg-background">
      <AlgorithmVisualizer 
        initialAlgorithm={algorithmParam} 
        startEmpty={startEmpty}
      />
    </div>
  );
};

export default Editor;
