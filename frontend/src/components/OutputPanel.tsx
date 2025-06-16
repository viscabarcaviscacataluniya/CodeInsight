// src/components/OutputPanel.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OutputPanelProps {
  outputLines: (string | number | object)[];
}

const OutputPanel = ({ outputLines }: OutputPanelProps) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Program Output</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="whitespace-pre-wrap text-sm font-mono bg-black p-4 rounded text-white">
          {outputLines.map((line, index) =>
            typeof line === 'string' || typeof line === 'number'
              ? line + '\n'
              : JSON.stringify(line, null, 2) + '\n'
          )}
        </pre>
      </CardContent>
    </Card>
  );
};

export default OutputPanel;
