
/**
 * Extracts an array from C++ code
 */
export function extractArrayFromCode(code: string): number[] {
  console.log("Extracting array from code...");
  
  // Look for array initialization patterns
  const arrayInitPattern = /int\s+a(?:rr|rray)\s*\[\s*\]\s*=\s*\{\s*([0-9,\s]+)\s*\}/;
  const arrayInit = code.match(arrayInitPattern);
  
  if (arrayInit && arrayInit[1]) {
    const array = arrayInit[1].split(',')
      .map(s => s.trim())
      .map(s => parseInt(s))
      .filter(n => !isNaN(n));
    console.log("Extracted array using pattern 1:", array);
    return array;
  }
  
  // Try alternative pattern for array initialization
  const altArrayInitPattern = /\{\s*([0-9,\s]+)\s*\}/;
  const altArrayInit = code.match(altArrayInitPattern);
  
  if (altArrayInit && altArrayInit[1]) {
    const array = altArrayInit[1].split(',')
      .map(s => s.trim())
      .map(s => parseInt(s))
      .filter(n => !isNaN(n));
    console.log("Extracted array using pattern 2:", array);
    return array;
  }
  
  // Look for individual array element assignments like arr[0] = 10;
  const elementAssignments: { [key: number]: number } = {};
  const assignmentPattern = /\[\s*(\d+)\s*\]\s*=\s*(\d+)/g;
  let match;
  
  while ((match = assignmentPattern.exec(code)) !== null) {
    const index = parseInt(match[1]);
    const value = parseInt(match[2]);
    elementAssignments[index] = value;
  }
  
  if (Object.keys(elementAssignments).length > 0) {
    const maxIndex = Math.max(...Object.keys(elementAssignments).map(k => parseInt(k)));
    const array = Array(maxIndex + 1).fill(0);
    
    for (const [index, value] of Object.entries(elementAssignments)) {
      array[parseInt(index)] = value;
    }
    console.log("Extracted array using assignment pattern:", array);
    return array;
  }
  
  // Look for arrays defined with variable assignments
  const varArrayPattern = /int\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\[\s*\]\s*=\s*\{([^}]+)\}/;
  const varArrayMatch = code.match(varArrayPattern);
  
  if (varArrayMatch && varArrayMatch[1]) {
    const array = varArrayMatch[1].split(',')
      .map(s => s.trim())
      .map(s => parseInt(s))
      .filter(n => !isNaN(n));
    console.log("Extracted array using variable pattern:", array);
    return array;
  }
  
  // Generate a random array if we couldn't extract one
  console.log("Couldn't extract array from code. Using default array.");
  return [64, 34, 25, 12, 22, 11, 90]; // Default array
}
