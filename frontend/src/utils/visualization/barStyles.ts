
import { ElementState } from '../types/visualizationTypes';

export function getBarColor(state: ElementState): string {
  switch (state) {
    case 'default':
      return 'bg-blue-500';
    case 'comparing':
      return 'bg-yellow-500';
    case 'swapping':
      return 'bg-red-500';
    case 'sorted':
      return 'bg-green-500';
    case 'selected':
      return 'bg-purple-500';
    case 'pivot':
      return 'bg-orange-500';
    default:
      return 'bg-blue-500';
  }
}

export function getBarAnimation(state: ElementState): string {
  switch (state) {
    case 'comparing':
      return 'animate-pulse';
    case 'swapping':
      return 'animate-bounce';
    case 'selected':
      return 'scale-110 shadow-lg';
    default:
      return '';
  }
}

// Helper functions for specialized visualizations
export function getHeightPercent(value: number, maxValue: number, minValue: number): string {
  const range = maxValue - minValue;
  if (range === 0) return '50%';
  const percent = Math.max(10, ((value - minValue) / range) * 90);
  return `${percent}%`;
}

export function getWidthPercent(value: number, max: number = 20): string {
  return `${Math.min(100, Math.max(5, (value / max) * 100))}%`;
}

export function getCharForValue(value: number): string {
  const charMap: { [key: number]: string } = {
    1: '(',
    2: '{',
    3: '[',
    '-1': ')',
    '-2': '}',
    '-3': ']'
  };
  
  return charMap[value] || String.fromCharCode((Math.abs(value) % 26) + 97);
}
