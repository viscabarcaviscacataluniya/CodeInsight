
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"

interface CompileRequest {
  code: string;
  language: string;
  input?: string;
}

interface CompileResponse {
  output: string;
  error?: string;
  executionTime?: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { code, language, input } = await req.json() as CompileRequest;

    // For now, we'll simulate code execution
    // In a production environment, you'd use a secure sandboxed execution environment
    const result = await simulateCodeExecution(code, language, input);

    return new Response(
      JSON.stringify(result),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        output: '', 
        error: `Compilation error: ${error.message}` 
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    )
  }
})

async function simulateCodeExecution(code: string, language: string, input?: string): Promise<CompileResponse> {
  const startTime = Date.now();
  
  try {
    // Basic C++ code simulation
    if (language === 'cpp') {
      const output = simulateCppExecution(code, input);
      return {
        output,
        executionTime: Date.now() - startTime
      };
    }
    
    // For other languages, return a placeholder
    return {
      output: "Language not supported yet. Currently only C++ simulation is available.",
      executionTime: Date.now() - startTime
    };
  } catch (error) {
    return {
      output: '',
      error: error.message,
      executionTime: Date.now() - startTime
    };
  }
}

function simulateCppExecution(code: string, input?: string): string {
  const output: string[] = [];
  
  // Parse cout statements
  const coutPattern = /cout\s*<<\s*([^;]+);/g;
  let match;
  
  while ((match = coutPattern.exec(code)) !== null) {
    let expression = match[1].trim();
    
    // Handle string literals
    if (expression.includes('"')) {
      const stringMatch = expression.match(/"([^"]*)"/);
      if (stringMatch) {
        let text = stringMatch[1];
        text = text.replace(/\\n/g, '\n');
        output.push(text);
      }
    }
    // Handle variables and expressions
    else {
      const value = evaluateExpression(expression, code);
      if (value !== null) {
        output.push(value.toString());
      }
    }
  }
  
  // Parse printf statements
  const printfPattern = /printf\s*\(\s*"([^"]*)"([^)]*)\)/g;
  while ((match = printfPattern.exec(code)) !== null) {
    let text = match[1];
    text = text.replace(/\\n/g, '\n');
    output.push(text);
  }
  
  // If no output statements found, analyze the code structure
  if (output.length === 0) {
    output.push("Program compiled successfully");
    
    // Check for variable declarations
    const varPattern = /int\s+(\w+)\s*=\s*([^;]+);/g;
    while ((match = varPattern.exec(code)) !== null) {
      const varName = match[1];
      const value = evaluateExpression(match[2].trim(), code);
      if (value !== null) {
        output.push(`${varName} = ${value}`);
      }
    }
    
    output.push("Program terminated normally");
  }
  
  return output.join('\n');
}

function evaluateExpression(expr: string, code: string): number | string | null {
  expr = expr.trim();
  
  // Handle string literals
  if (expr.startsWith('"') && expr.endsWith('"')) {
    return expr.slice(1, -1);
  }
  
  // Handle numbers
  if (/^\d+$/.test(expr)) {
    return parseInt(expr);
  }
  
  // Handle simple arithmetic
  const mathMatch = expr.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);
  if (mathMatch) {
    const a = parseInt(mathMatch[1]);
    const op = mathMatch[2];
    const b = parseInt(mathMatch[3]);
    
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? Math.floor(a / b) : 0;
      default: return null;
    }
  }
  
  return null;
}
