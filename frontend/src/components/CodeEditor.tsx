// src/components/CodeEditor.tsx
import { Loader2 } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CodeEditorProps {
  onCodeChange: (code: string) => void;
  onRunCode: () => void;
  defaultCode: string;
  isExecuting?: boolean;
}

const CodeEditor = ({ onCodeChange, onRunCode, defaultCode, isExecuting }: CodeEditorProps) => {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current) {
      const currentValue = editorRef.current.getValue();
      if (currentValue !== defaultCode) {
        editorRef.current.setValue(defaultCode);
      }
    }
  }, [defaultCode]);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      onCodeChange(value);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="py-3 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-md font-medium">Code Editor</CardTitle>
        <Button
          onClick={onRunCode}
          className="bg-primary hover:bg-primary/90"
          disabled={isExecuting}
        >
          {isExecuting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          {isExecuting ? "Executing..." : "Run Code"}
        </Button>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="cpp"
          defaultValue={defaultCode}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            fixedOverflowWidgets: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            autoIndent: "full"
          }}
          onMount={handleEditorDidMount}
          onChange={handleCodeChange}
        />
      </CardContent>
    </Card>
  );
};

export default CodeEditor;
