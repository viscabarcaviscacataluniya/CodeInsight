
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function wordSearch(array: number[]): AlgorithmResult {
  const output: string[] = [];
  const visualElements = createElementArray(array);
  const steps = [];
  
  // Generate a board from the array
  const rows = Math.min(Math.floor(Math.sqrt(array.length)), 5);
  const cols = Math.min(Math.floor(array.length / rows), 5);
  
  // Create the board with letters (using ASCII values)
  const board: string[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: string[] = [];
    for (let j = 0; j < cols; j++) {
      const index = i * cols + j;
      if (index < array.length) {
        // Convert numbers to lowercase letters (ascii 97-122)
        const charCode = (array[index] % 26) + 97;
        row.push(String.fromCharCode(charCode));
      } else {
        row.push('a');
      }
    }
    board.push(row);
  }
  
  // Generate a target word from the board (guaranteed to exist for visualization)
  const word = board[0].slice(0, Math.min(cols, 5)).join('');
  
  output.push(`Board:`);
  for (const row of board) {
    output.push(row.join(' '));
  }
  output.push(`Word to search: "${word}"`);
  
  // Set up the visualization
  const boardSize = rows * cols;
  const boardArray = Array(boardSize).fill(0);
  const boardVisualElements = createElementArray(boardArray);
  
  // Initialize visualization with the board
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const index = i * cols + j;
      if (index < boardVisualElements.length) {
        boardVisualElements[index].value = board[i][j].charCodeAt(0) - 97;
      }
    }
  }
  addStep(steps, boardVisualElements, `Searching for word "${word}" in the board`);
  
  // Directions: up, right, down, left
  const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  
  // DFS function to search for the word
  const dfs = (row: number, col: number, index: number, path: number[]): boolean => {
    // Success - word found
    if (index === word.length) {
      return true;
    }
    
    // Out of bounds or wrong character
    if (row < 0 || row >= rows || col < 0 || col >= cols || 
        board[row][col] !== word[index]) {
      return false;
    }
    
    // Mark cell as visited
    const originalChar = board[row][col];
    board[row][col] = '#'; // Mark as visited
    
    // Visualize current position
    const visIndex = row * cols + col;
    path.push(visIndex);
    
    updateElementStates(boardVisualElements, [visIndex], 'comparing');
    addStep(steps, boardVisualElements, `Checking position (${row},${col}) for letter "${word[index]}" (match found)`);
    
    // Try all four directions
    let found = false;
    for (const [dr, dc] of dirs) {
      const newRow = row + dr;
      const newCol = col + dc;
      
      if (dfs(newRow, newCol, index + 1, path)) {
        found = true;
        break;
      }
    }
    
    // Restore original character for backtracking
    board[row][col] = originalChar;
    
    if (found) {
      updateElementStates(boardVisualElements, [visIndex], 'selected');
      addStep(steps, boardVisualElements, `Letter "${word[index]}" at (${row},${col}) is part of the word`);
      return true;
    } else {
      updateElementStates(boardVisualElements, [visIndex], 'default');
      addStep(steps, boardVisualElements, `Backtracking from (${row},${col})`);
      path.pop();
      return false;
    }
  };
  
  // Start searching from each cell
  let found = false;
  for (let i = 0; i < rows && !found; i++) {
    for (let j = 0; j < cols && !found; j++) {
      const path: number[] = [];
      if (board[i][j] === word[0] && dfs(i, j, 0, path)) {
        found = true;
        output.push(`Word "${word}" found starting at position (${i},${j})`);
        
        // Highlight the full path
        updateElementStates(boardVisualElements, path, 'sorted');
        addStep(steps, boardVisualElements, `Word "${word}" found!`);
      }
    }
  }
  
  if (!found) {
    output.push(`Word "${word}" not found in the board`);
    addStep(steps, boardVisualElements, `Word "${word}" not found in the board`);
  }
  
  return {
    steps,
    output,
    sortedArray: array,
    algorithmName: "Word Search"
  };
}
