// src/integrations/judge0/judge0Service.ts
import axios from 'axios';

const judge0 = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

export interface ExecutionResult {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  status: {
    id: number;
    description: string;
  };
}

export async function executeCodeWithJudge0(
  code: string,
  languageId: number = 14 // default is C++
): Promise<string[]> {
  try {
    const response = await judge0.post('/run', {
      source_code: code,
      language_id: languageId,
    });

    const result: ExecutionResult = response.data;
    console.log("Judge0 Raw Output:", result);


    switch (result.status.id) {
      case 3:
        return result.stdout
  ? result.stdout.split('\n').map(line => String(line).trim())
  : ["✅ Executed, but no output."];

      case 6:
        return [`⚠️ Compile Error:`, ...(result.compile_output ? [result.compile_output] : [])];
      case 5:
        return ["⏱️ Execution timed out"];
      case 1:
      case 2:
        return ["⏳ Still processing..."];
      default:
        return [
          `❌ Error: ${result.status.description}`,
          ...(result.stderr ? [result.stderr] : []),
          ...(result.message ? [result.message] : [])
        ];
    }
  } catch (error: any) {
    console.error('Judge0 API error:', error);
    return [
      `🚫 API call failed.`,
      `Status: ${error.response?.status}`,
      `Message: ${error.message}`,
      `URL: ${error.config?.url}`
    ];
  }
  
}

export const JUDGE0_LANGUAGES = {
  cpp: 14,
  python: 71,
  java: 62,
  javascript: 63
};
