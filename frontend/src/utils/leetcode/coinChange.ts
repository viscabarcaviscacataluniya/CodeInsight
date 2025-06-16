
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function coinChange(array: number[]): AlgorithmResult {
  const output: string[] = [];
  const visualElements = createElementArray(array);
  const steps = [];
  
  if (array.length < 2) {
    output.push("Need at least one coin and a target amount");
    return {
      steps,
      output,
      sortedArray: array,
      algorithmName: "Coin Change"
    };
  }
  
  // Last element is the target amount, rest are coin values
  const amount = array[array.length - 1];
  const coins = array.slice(0, array.length - 1);
  
  output.push(`Coins: [${coins.join(', ')}], Target amount: ${amount}`);
  
  // Highlight coins and target
  for (let i = 0; i < coins.length; i++) {
    updateElementStates(visualElements, [i], 'selected');
  }
  updateElementStates(visualElements, [array.length - 1], 'comparing');
  addStep(steps, visualElements, `Coins: [${coins.join(', ')}], Target amount: ${amount}`);
  
  // Initialize dp array for minimum coins needed for each amount
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  output.push(`Using dynamic programming to find minimum coins needed`);
  
  // Visualize the DP table initialization
  visualElements.forEach((el, i) => {
    el.value = i < dp.length ? (dp[i] === Infinity ? -1 : dp[i]) : el.value;
    el.state = 'default';
  });
  addStep(steps, visualElements, `Initialized DP table: dp[0] = 0, dp[1...${amount}] = Infinity`);
  
  // Fill the dp table
  for (const coin of coins) {
    output.push(`Processing coin with value: ${coin}`);
    
    for (let i = coin; i <= amount; i++) {
      // Check if using this coin gives a better result
      const withoutCoin = dp[i];
      const withCoin = dp[i - coin] + 1;
      
      // Visualize comparison
      updateElementStates(visualElements, [i], 'comparing');
      addStep(steps, visualElements, `For amount ${i}: comparing current ${withoutCoin === Infinity ? 'Infinity' : withoutCoin} with (dp[${i}-${coin}] + 1) = ${withCoin === Infinity ? 'Infinity' : withCoin}`);
      
      if (withCoin < withoutCoin) {
        dp[i] = withCoin;
        visualElements[i].value = withCoin;
        updateElementStates(visualElements, [i], 'swapping');
        addStep(steps, visualElements, `Updated dp[${i}] = ${withCoin}`);
        output.push(`For amount ${i}, using coin ${coin} gives minimum of ${withCoin} coins`);
      } else {
        updateElementStates(visualElements, [i], 'default');
      }
    }
  }
  
  // Final result
  const result = dp[amount];
  
  if (result === Infinity) {
    output.push(`Cannot make amount ${amount} with given coins`);
    addStep(steps, visualElements, `Cannot make amount ${amount} with given coins`);
  } else {
    output.push(`Minimum coins needed: ${result}`);
    // Highlight the final result
    updateElementStates(visualElements, [amount], 'sorted');
    addStep(steps, visualElements, `Minimum coins needed for amount ${amount}: ${result}`);
  }
  
  return {
    steps,
    output,
    sortedArray: array,
    algorithmName: "Coin Change"
  };
}
