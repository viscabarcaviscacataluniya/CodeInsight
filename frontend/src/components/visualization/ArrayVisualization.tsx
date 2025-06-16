
import { ArrayElement } from "@/utils/types/visualizationTypes";
import { getBarAnimation, getBarColor, getCharForValue } from "@/utils/visualization/barStyles";

interface ArrayVisualizationProps {
  array: ArrayElement[];
}

const ArrayVisualization = ({ array }: ArrayVisualizationProps) => {
  // Check if we should use special visualization
  const useSpecialViz = array.length > 0 && array[0].visualType;

  // Find max and min values for scaling
  const maxValue = array.length > 0 ? Math.max(...array.map(e => e.value)) : 0;
  const minValue = array.length > 0 ? Math.min(...array.map(e => e.value)) : 0;

  return (
    <div className="flex-1 flex items-end justify-center space-x-2 p-6 min-h-[400px]">
      {array.length === 0 ? (
        <div className="flex items-center justify-center h-full w-full">
          <p className="text-muted-foreground">Run your algorithm to visualize it</p>
        </div>
      ) : useSpecialViz && array[0].visualType === 'parentheses' ? (
        // Special visualization for parentheses problems
        <div className="flex flex-wrap gap-3 items-center justify-center w-full">
          {array.map((element, index) => (
            <div 
              key={index}
              className={`${getBarColor(element.state)} p-3 rounded-md text-xl font-bold text-white 
                flex items-center justify-center ${getBarAnimation(element.state)}
                min-w-[50px] min-h-[50px]`}
            >
              {getCharForValue(element.value)}
            </div>
          ))}
        </div>
      ) : useSpecialViz && array[0].visualType === 'linkedList' ? (
        // Special visualization for linked list problems
        <div className="flex flex-row items-center justify-center w-full overflow-auto py-4">
          {array.map((element, index) => (
            <div key={index} className="flex items-center">
              <div 
                className={`${getBarColor(element.state)} p-3 rounded-md text-white 
                  flex items-center justify-center ${getBarAnimation(element.state)}
                  w-12 h-12 text-lg font-bold`}
              >
                {element.value}
              </div>
              {index < array.length - 1 && (
                <div className="flex flex-col items-center mx-1">
                  <div className={`w-8 h-2 ${element.state === 'swapping' ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                  {element.state === 'comparing' && (
                    <div className="text-xs text-blue-500 mt-1">next</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : useSpecialViz && array[0].visualType === 'stairs' ? (
        // Special visualization for climbing stairs problems
        <div className="flex flex-col-reverse w-full">
          {array.map((element, index) => (
            <div 
              key={index}
              className="flex items-center mb-1"
            >
              <div className="w-12 text-center">{index}.</div>
              <div 
                className={`${getBarColor(element.state)} h-12 flex items-center justify-start pl-4 rounded-l-md
                  ${getBarAnimation(element.state)}`}
                style={{ width: `${Math.max(10, element.value * 5)}%` }}
              >
                <span className="text-white font-bold">{element.value}</span>
              </div>
            </div>
          ))}
        </div>
      ) : useSpecialViz && array[0].visualType === 'wordBreak' ? (
        // Special visualization for word break problems
        <div className="flex flex-wrap gap-2 items-center justify-center w-full">
          {array.map((element, index) => (
            <div 
              key={index}
              className={`${getBarColor(element.state)} py-2 px-3 rounded-md
                flex items-center justify-center ${getBarAnimation(element.state)}`}
            >
              <span className="text-white font-mono text-lg">
                {String.fromCharCode((element.value % 26) + 97)}
              </span>
            </div>
          ))}
        </div>
      ) : useSpecialViz && (
        array[0].visualType === 'containerWithMostWater' || 
        array[0].visualType === 'trappingRainWater'
      ) ? (
        // Water container visualization
        <div className="flex w-full h-full items-end justify-center gap-1">
          {array.map((element, index) => {
            const height = `${Math.max(10, (element.value / maxValue) * 90)}%`;
            return (
              <div key={index} className="flex flex-col items-center justify-end h-full flex-1 min-w-[20px]">
                <div
                  className={`w-full ${getBarColor(element.state)} ${getBarAnimation(element.state)} 
                    rounded-t-md flex items-end justify-center relative`}
                  style={{ height }}
                >
                  <span className="absolute bottom-2 text-xs font-semibold text-white">
                    {element.value}
                  </span>
                </div>
                <div className="text-xs text-center mt-1">{index}</div>
              </div>
            );
          })}
        </div>
      ) : (
        // Improved default bar visualization for sorting algorithms and other array-based problems
        <div className="flex w-full items-end justify-center gap-2 h-80">
          {array.map((element, index) => {
            // Improved height calculation with better scaling
            const range = maxValue - minValue;
            let heightPercent;
            
            if (range === 0) {
              // If all values are the same, show them at 50% height
              heightPercent = 50;
            } else {
              // Scale values between 20% and 95% for better visual distinction
              const normalizedValue = (element.value - minValue) / range;
              heightPercent = 20 + (normalizedValue * 75);
            }
            
            // Calculate responsive width based on array length
            const maxWidth = Math.min(80, Math.max(30, 600 / array.length));
            
            return (
              <div
                key={index}
                className={`${getBarColor(element.state)} ${getBarAnimation(element.state)} 
                  transition-all duration-300 flex flex-col items-center justify-end relative
                  rounded-t-lg shadow-lg border-2 border-white/20`}
                style={{ 
                  height: `${heightPercent}%`,
                  width: `${maxWidth}px`,
                  minHeight: '60px'
                }}
              >
                {/* Value label at the top of the bar */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <span className="text-sm font-bold text-foreground bg-background/80 
                    px-2 py-1 rounded border shadow-sm">
                    {element.value}
                  </span>
                </div>
                
                {/* Index label at the bottom */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <span className="text-xs text-muted-foreground">{index}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ArrayVisualization;
