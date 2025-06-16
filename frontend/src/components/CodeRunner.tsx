import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import OutputPanel from './OutputPanel';
import { executeCodeWithJudge0 } from '@/integrations/judge0/judge0Service';

const CodeRunner = () => {
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const runCode = async () => {
    setIsExecuting(true);
    const result = await executeCodeWithJudge0(code, 14); // 14 = C++
    setOutput(result);
    setIsExecuting(false);
  };

  return (
    <>
      <CodeEditor
        onCodeChange={setCode}
        onRunCode={runCode}
        defaultCode={code}
        isExecuting={isExecuting}
      />
      <OutputPanel outputLines={output} />
    </>
  );
};

export default CodeRunner;
