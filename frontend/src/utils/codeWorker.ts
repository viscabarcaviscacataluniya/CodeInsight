import { executeCode } from './codeExecutor';

self.onmessage = async (event) => {
  const { code, visualize, detectedAlgorithm } = event.data;
  
  // Set timeout for execution
  const timeoutId = setTimeout(() => {
    self.postMessage({ 
      status: 'error',
      error: "Execution timed out (10 seconds)",
      rawOutput: [
        "⏱️ Execution timed out",
        "Your code took too long to execute",
        "Please optimize your code or reduce complexity"
      ]
    });
  }, 10000);

  try {
    let result;
    
    if (detectedAlgorithm) {
      try {
        const visualizationResult = await executeCode(code, true);
        result = {
          ...visualizationResult,
          mode: 'visualization',
          algorithmName: detectedAlgorithm
        };
      } catch (visualizationError) {
        // Fallback to normal execution if visualization fails
        const output = await executeCode(code, false);
        result = {
          steps: [],
          output: [output],
          sortedArray: [],
          algorithmName: detectedAlgorithm,
          mode: 'normal',
          rawOutput: output
        };
      }
    } else {
      // Normal execution path
      const output = await executeCode(code, false);
      result = {
        steps: [],
        output: [output],
        sortedArray: [],
        algorithmName: "Normal Execution",
        mode: 'normal',
        rawOutput: output
      };
    }

    clearTimeout(timeoutId);
    self.postMessage({ status: 'success', result });
  } catch (error) {
    clearTimeout(timeoutId);
    self.postMessage({ 
      status: 'error',
      error: (error as Error).message,
      rawOutput: [
        'Critical execution error:',
        (error as Error).message,
        'Please check your code and try again'
      ]
    });
  }
};