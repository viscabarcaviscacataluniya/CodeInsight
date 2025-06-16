
import { Progress } from "@/components/ui/progress";

interface StepDescriptionProps {
  description: string;
  currentStep: number;
  totalSteps: number;
}

const StepDescription = ({
  description,
  currentStep,
  totalSteps
}: StepDescriptionProps) => {
  const progress = totalSteps ? currentStep / totalSteps * 100 : 0;
  
  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden">
        {/* Translucent background with glass effect */}
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        
        <div className="relative min-h-[60px] sm:min-h-[70px] p-3 sm:p-4 rounded-xl border border-white/10 shadow-2xl">
          <div className="flex items-center justify-center h-full">
            <p className="text-center text-slate-50 text-sm sm:text-base font-semibold drop-shadow-lg leading-relaxed">
              {description || "No description available"}
            </p>
          </div>
        </div>
      </div>
      
      <div className="backdrop-blur-sm bg-background/60 rounded-lg p-3 border border-border/50 shadow-lg">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Progress value={progress} className="flex-1 h-2" />
          <span className="font-medium whitespace-nowrap">
            Step {currentStep + 1} of {totalSteps + 1}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StepDescription;
