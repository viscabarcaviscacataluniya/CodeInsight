
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VisualizationStep } from "@/utils/types/visualizationTypes";
import ArrayVisualization from "./visualization/ArrayVisualization";
import PlaybackControls from "./visualization/PlaybackControls";
import StepDescription from "./visualization/StepDescription";

interface VisualizationAreaProps {
  steps: VisualizationStep[];
  algorithmName: string;
}

const VisualizationArea = ({ steps, algorithmName }: VisualizationAreaProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  
  const maxStep = steps.length - 1;
  const currentStepData = steps[currentStep] || { array: [], description: "No visualization available" };
  const initialArray = steps.length > 0 ? steps[0].array : [];
  
  // Reset current step when new algorithm is selected
  useEffect(() => {
    console.log("Reset step counter, total steps:", steps.length);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [steps]);
  
  // Playback controls
  useEffect(() => {
    if (animationRef.current) {
      clearInterval(animationRef.current);
      animationRef.current = null;
    }
    
    if (isPlaying && currentStep < maxStep) {
      animationRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          const nextStep = prev + 1;
          if (nextStep > maxStep) {
            setIsPlaying(false);
            return maxStep;
          }
          return nextStep;
        });
      }, 1000 / playbackSpeed);
    }
    
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [isPlaying, currentStep, maxStep, playbackSpeed]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleStepForward = () => {
    if (currentStep < maxStep) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  
  const handleSpeedChange = (value: number[]) => {
    setPlaybackSpeed(value[0]);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="py-3 space-y-0 border-b flex-shrink-0">
        <CardTitle className="text-lg font-semibold">
          {algorithmName ? `Algorithm Visualization: ${algorithmName}` : 'Visualization'}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4 flex flex-col overflow-hidden p-4">
        <div className="flex-1 flex flex-col space-y-4 min-h-0">
          {/* Main visualization area - flexible height */}
          <div className="flex-1 min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
            <ArrayVisualization array={currentStepData.array} />
          </div>
          
          {/* Initial array display - always visible and compact */}
          {initialArray.length > 0 && (
            <div className="flex-shrink-0 p-3 bg-muted/50 rounded-lg border">
              <div className="text-sm font-semibold text-foreground mb-2">Initial Array:</div>
              <div className="flex gap-1 flex-wrap max-h-20 overflow-y-auto">
                {initialArray.map((element, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 bg-background rounded border text-sm font-mono font-medium flex-shrink-0"
                  >
                    {element.value}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Step description - flexible but constrained */}
          <div className="flex-shrink-0">
            <StepDescription 
              description={currentStepData.description}
              currentStep={currentStep}
              totalSteps={maxStep}
            />
          </div>
          
          {/* Playback controls - always visible at bottom */}
          <div className="flex-shrink-0 mt-auto">
            <PlaybackControls
              currentStep={currentStep}
              maxStep={maxStep}
              isPlaying={isPlaying}
              playbackSpeed={playbackSpeed}
              onPlayPause={handlePlayPause}
              onStepForward={handleStepForward}
              onStepBackward={handleStepBackward}
              onReset={handleReset}
              onSpeedChange={handleSpeedChange}
              disabled={steps.length === 0}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisualizationArea;
