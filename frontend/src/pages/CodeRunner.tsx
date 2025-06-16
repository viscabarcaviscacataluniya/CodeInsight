// src/pages/CodeRunner.tsx
import React, { useState } from 'react';
import CodeEditor from '@/components/CodeEditor';
import OutputPanel from '@/components/OutputPanel';
import { executeCodeWithJudge0 } from '@/integrations/judge0/judge0Service';

const CodeRunner = () => {
  const [code, setCode] = useState(
    '// Write your C++ code here\n#include<iostream>\nusing namespace std;\nint main() {\n  cout << "Hello, World!";\n  return 0;\n}'
  );
  const [output, setOutput] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const runCode = async () => {
    setIsExecuting(true);
    const result = await executeCodeWithJudge0(code, 14); // 14 = C++
    
    // 👇 Safely extract output from result object
    if (typeof result === 'object' && Array.isArray(result.output)) {
      setOutput(result.output);
    } else if (Array.isArray(result)) {
      setOutput(result); // fallback if function still returns just array
    } else {
      setOutput(['⚠️ Unexpected output format.']);
    }

    setIsExecuting(false);
  };

  return (
    <div className="flex flex-col h-full">
      <CodeEditor
        onCodeChange={setCode}
        onRunCode={runCode}
        defaultCode={code}
        isExecuting={isExecuting}
      />
      <OutputPanel outputLines={output} />
    </div>
  );
};

export default CodeRunner;
