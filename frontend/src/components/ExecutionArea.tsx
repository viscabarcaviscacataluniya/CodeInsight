import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

interface ExecutionAreaProps {
  output: any; // changed from string[] to any
  isExecuting: boolean;
}

const ExecutionArea = ({ output, isExecuting }: ExecutionAreaProps) => {
  const [executionOutput, setExecutionOutput] = useState<string[]>([]);
  const outputEndRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const flatLines: string[] = [];

  output.forEach((item) => {
    if (typeof item === "string") {
      flatLines.push(item);
    } else if (typeof item === "object" && Array.isArray(item.output)) {
      flatLines.push(...item.output); // flatten the inner output array
    } else {
      console.warn("Non-string value in output:", item);
    }
  });

  setExecutionOutput(flatLines);

  setTimeout(() => {
    if (outputEndRef.current) {
      outputEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, 100);
}, [output]);



  const formatOutputLine = (line: any, index: number) => {
    const strLine = typeof line === "string" ? line : JSON.stringify(line, null, 2);

    if (strLine.includes("⚠️")) {
      return (
        <div key={index} className="text-yellow-400 flex items-start">
          <span className="mr-2">⚠️</span>
          <span>{strLine.replace("⚠️ ", "")}</span>
        </div>
      );
    }
    if (strLine.includes("❌") || strLine.includes("🔌") || strLine.includes("⏱️")) {
      return (
        <div key={index} className="text-red-400 flex items-start">
          <span className="mr-2">
            {strLine.includes("❌") ? "❌" : strLine.includes("⏱️") ? "⏱️" : "🔌"}
          </span>
          <span>
            {strLine.replace("❌ ", "").replace("🔌 ", "").replace("⏱️ ", "")}
          </span>
        </div>
      );
    }
    if (strLine.includes("⏳")) {
      return (
        <div key={index} className="text-blue-400 flex items-start">
          <span className="mr-2">⏳</span>
          <span>{strLine.replace("⏳ ", "")}</span>
        </div>
      );
    }

    if (strLine.toLowerCase().includes("error") || strLine.includes("failed")) {
      return <div key={index} className="text-red-400">{strLine}</div>;
    } else if (
      strLine.includes("=") &&
      (strLine.includes(" + ") || strLine.includes(" - ") || strLine.includes(" * ") || strLine.includes(" / "))
    ) {
      return <div key={index} className="text-cyan-400">{strLine}</div>;
    } else if (strLine.includes(" = ") && !strLine.toLowerCase().includes("error")) {
      const parts = strLine.split(" = ");
      return (
        <div key={index}>
          <span className="text-purple-400">{parts[0]}</span>
          <span className="text-white"> = </span>
          <span className="text-green-400">{parts[1]}</span>
        </div>
      );
    } else if (
      strLine.startsWith("Loop executed") ||
      strLine.toLowerCase().includes("compiled successfully") ||
      strLine.toLowerCase().includes("terminated normally")
    ) {
      return <div key={index} className="text-green-300">{strLine}</div>;
    } else if (strLine.includes("Division by zero")) {
      return <div key={index} className="text-red-400">{strLine}</div>;
    } else if (strLine.includes("[]") && strLine.includes("{")) {
      return <div key={index} className="text-yellow-300">{strLine}</div>;
    } else if (
      strLine.toLowerCase().includes("executed successfully") ||
      strLine.includes("completed")
    ) {
      return <div key={index} className="text-green-300">{strLine}</div>;
    } else if (strLine.includes("Warning") || strLine.includes("warning")) {
      return <div key={index} className="text-yellow-300">{strLine}</div>;
    } else {
      return <div key={index} className="text-white">{strLine}</div>;
    }
  };

  return (
    <Card className="h-full flex flex-col bg-gradient-to-b from-gray-900 to-black border border-gray-700 shadow-lg">
      <CardHeader className="py-3 space-y-0 bg-gray-800 border-b border-gray-700">
        <CardTitle className="text-md font-medium text-white flex items-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-cyan-400">
            Code Output
          </span>
          {isExecuting && (
            <span className="ml-2 flex items-center text-sm text-cyan-300">
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              Executing...
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 relative">
        <ScrollArea className="h-full w-full p-4 font-mono bg-gray-950 text-sm">
          {isExecuting && executionOutput.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader2 className="h-8 w-8 mx-auto text-cyan-500 animate-spin mb-2" />
                <p className="text-cyan-300">Compiling and executing code...</p>
                <p className="text-gray-500 text-xs mt-2">
                  This might take a few seconds
                </p>
              </div>
            </div>
          ) : executionOutput.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="mb-4 opacity-75">
                <div className="bg-gray-800 border border-gray-700 rounded-lg w-16 h-16 mx-auto flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-400 mb-1">No output yet</p>
              <p className="text-gray-600 text-sm">Run your code to see the output here</p>
            </div>
          ) : (
            <div className="space-y-2 pb-4">
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                PROGRAM OUTPUT
              </div>
              {executionOutput.map((line, index) => formatOutputLine(line, index))}
              <div ref={outputEndRef} />
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ExecutionArea;
