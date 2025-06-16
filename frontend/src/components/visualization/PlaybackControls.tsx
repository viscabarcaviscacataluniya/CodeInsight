
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RefreshCw
} from "lucide-react";

interface PlaybackControlsProps {
  currentStep: number;
  maxStep: number;
  isPlaying: boolean;
  playbackSpeed: number;
  onPlayPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onSpeedChange: (value: number[]) => void;
  disabled: boolean;
}

const PlaybackControls = ({
  currentStep,
  maxStep,
  isPlaying,
  playbackSpeed,
  onPlayPause,
  onStepForward,
  onStepBackward,
  onReset,
  onSpeedChange,
  disabled
}: PlaybackControlsProps) => {
  return (
    <div className="space-y-3 p-3 bg-muted/30 rounded-lg border">
      {/* Control buttons - responsive layout */}
      <div className="flex justify-center items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          disabled={disabled}
          className="flex-shrink-0"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onStepBackward}
          disabled={currentStep === 0 || disabled}
          className="flex-shrink-0"
        >
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onPlayPause}
          disabled={disabled}
          className="flex-shrink-0"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onStepForward}
          disabled={currentStep === maxStep || disabled}
          className="flex-shrink-0"
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Step info and speed control - responsive stack */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <span className="flex-shrink-0 font-medium">
          Step: {currentStep + 1}/{maxStep + 1}
        </span>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <span>Speed:</span>
          <Slider
            className="w-20 sm:w-24"
            value={[playbackSpeed]}
            min={0.5}
            max={3}
            step={0.5}
            onValueChange={onSpeedChange}
            disabled={disabled}
          />
          <span className="w-8 text-center">{playbackSpeed}x</span>
        </div>
      </div>
    </div>
  );
};

export default PlaybackControls;
