import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import ExecutionArea from "../ExecutionArea";
import VisualizationArea from "../VisualizationArea";
import { ExtendedAlgorithmResult, ExecutionMode } from "@/utils/types/visualizationTypes";

interface ResultVisualizationProps {
  result: ExtendedAlgorithmResult;
  isExecuting: boolean;
  currentTab: string;
  onTabChange: (value: string) => void;
}

export const ResultVisualization = ({
  result,
  isExecuting,
  currentTab,
  onTabChange,
}: ResultVisualizationProps) => {
  // Determine if visualization is available
  const isVisualizable = result.mode === 'visualization' && 
                         result.steps && 
                         result.steps.length > 0;

  // Get status message based on execution mode
  const getStatusMessage = () => {
    switch (result.mode) {
      case 'visualization':
        return "Visualization available";
      case 'normal':
        return "Running as normal code - no visualization";
      case 'error':
        return "Execution error - check output";
      default:
        return "Ready to execute";
    }
  };

  // Get tab label based on execution mode
  const getTabLabel = () => {
    if (result.mode === 'visualization') {
      return "Visualization";
    } else if (result.mode === 'normal') {
      return "Normal Execution";
    }
    return "Execution";
  };

  return (
    <div className="h-full flex flex-col">
      <Tabs 
        value={currentTab} 
        onValueChange={onTabChange} 
        className="flex-1 flex flex-col"
      >
        <Card className="flex-1 flex flex-col border border-border/50 shadow-lg">
          <div className="flex justify-between items-center px-4 py-2 border-b bg-muted/30">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger 
                value="execution" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                {getTabLabel()}
              </TabsTrigger>
              <TabsTrigger 
                value="visualization" 
                disabled={!isVisualizable}
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                {isVisualizable ? "Visualization" : "Not Visualizable"}
              </TabsTrigger>
            </TabsList>
            
            <div className="ml-4 text-xs px-2 py-1 rounded-full bg-background border">
              <span className={`${
                result.mode === 'visualization' ? 'text-green-500' :
                result.mode === 'normal' ? 'text-blue-500' :
                'text-red-500'
              }`}>
                {getStatusMessage()}
              </span>
            </div>
          </div>
          
          <CardContent className="flex-1 p-0 overflow-hidden">
            <TabsContent value="execution" className="h-full m-0">
              <ExecutionArea 
                output={result.output} 
                isExecuting={isExecuting} 
              />
            </TabsContent>
            
            <TabsContent value="visualization" className="h-full m-0">
              {isVisualizable ? (
                <VisualizationArea 
                  steps={result.steps} 
                  algorithmName={result.algorithmName} 
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className="text-muted-foreground mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="text-lg font-medium mt-2">
                      Visualization Not Available
                    </h3>
                  </div>
                  <p className="text-muted-foreground max-w-md">
                    {result.mode === 'normal'
                      ? "This code was executed normally. Visualization is only available for supported algorithms."
                      : "Visualization is not available for this algorithm or execution encountered an error."}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Check the execution tab for program output.
                  </p>
                </div>
              )}
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};