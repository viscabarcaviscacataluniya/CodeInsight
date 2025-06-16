
import { ArrayElement, VisualizationStep } from '../types/visualizationTypes';

export function deepCopyArrayElements(array: ArrayElement[]): ArrayElement[] {
  return array.map(element => ({ ...element }));
}

export function createElementArray(array: number[]): ArrayElement[] {
  return array.map(value => ({
    value,
    state: 'default'
  }));
}

export function addStep(
  steps: VisualizationStep[],
  array: ArrayElement[],
  description: string
): void {
  steps.push({
    array: deepCopyArrayElements(array),
    description
  });
}

export function updateElementStates(
  array: ArrayElement[],
  indices: number[],
  state: ArrayElement['state']
): void {
  indices.forEach(index => {
    if (index >= 0 && index < array.length) {
      array[index].state = state;
    }
  });
}
