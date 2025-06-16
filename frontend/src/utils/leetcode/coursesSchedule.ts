
import { AlgorithmResult } from '../types/visualizationTypes';
import { createElementArray, addStep, updateElementStates } from '../visualization/stateManager';

export function courseSchedule(array: number[]): AlgorithmResult {
  const output: string[] = [];
  const visualElements = createElementArray(array);
  const steps = [];
  
  if (array.length < 2) {
    output.push("Insufficient data for course schedule problem");
    return {
      steps,
      output,
      sortedArray: array,
      algorithmName: "Course Schedule"
    };
  }
  
  // First element represents number of courses
  const numCourses = Math.min(array[0], 8); // Limit to 8 for visualization
  
  // Remaining elements represent prerequisites [course, prerequisite]
  // We'll parse them in pairs
  const prerequisites = [];
  for (let i = 1; i < array.length - 1; i += 2) {
    if (i + 1 < array.length) {
      const course = array[i] % numCourses;
      const prereq = array[i + 1] % numCourses;
      prerequisites.push([course, prereq]);
    }
  }
  
  output.push(`Courses: ${numCourses}, Prerequisites: ${JSON.stringify(prerequisites)}`);
  addStep(steps, visualElements, `Checking if ${numCourses} courses can be finished with given prerequisites`);
  
  // Build adjacency list
  const graph: number[][] = Array(numCourses).fill(0).map(() => []);
  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
  }
  
  output.push(`Built course dependency graph`);
  
  // For DFS, we need visited and path arrays
  const visited = Array(numCourses).fill(0); // 0: not visited, 1: visiting, 2: visited
  
  // DFS to detect cycles
  const hasCycle = (course: number): boolean => {
    // If currently visiting - cycle detected
    if (visited[course] === 1) {
      return true;
    }
    
    // If already visited and no cycle detected
    if (visited[course] === 2) {
      return false;
    }
    
    // Mark as currently visiting
    visited[course] = 1;
    updateElementStates(visualElements, [course], 'comparing');
    addStep(steps, visualElements, `Checking course ${course} for cycles`);
    
    // Check all neighbors
    for (const nextCourse of graph[course]) {
      if (hasCycle(nextCourse)) {
        updateElementStates(visualElements, [nextCourse], 'swapping');
        addStep(steps, visualElements, `Cycle detected! Course ${nextCourse} depends on itself`);
        return true;
      }
    }
    
    // Mark as visited
    visited[course] = 2;
    updateElementStates(visualElements, [course], 'sorted');
    addStep(steps, visualElements, `Course ${course} and its dependencies are valid`);
    return false;
  };
  
  // Check for cycles for each course
  let possible = true;
  for (let course = 0; course < numCourses; course++) {
    if (visited[course] === 0) {
      if (hasCycle(course)) {
        possible = false;
        output.push(`Cycle detected! Cannot finish all courses.`);
        break;
      }
    }
  }
  
  if (possible) {
    output.push(`All courses can be finished!`);
    
    // Show topological sort with a simple implementation
    const topOrder: number[] = [];
    const visited2 = Array(numCourses).fill(false);
    const visit = (course: number) => {
      if (visited2[course]) return;
      visited2[course] = true;
      
      for (const next of graph[course]) {
        visit(next);
      }
      
      topOrder.unshift(course);
    };
    
    for (let i = 0; i < numCourses; i++) {
      if (!visited2[i]) {
        visit(i);
      }
    }
    
    output.push(`One possible course order: ${topOrder.join(' -> ')}`);
    
    // Visualize final order
    topOrder.forEach((course, index) => {
      visualElements[course].value = index;
      visualElements[course].state = 'sorted';
    });
    addStep(steps, visualElements, `All courses can be completed in this order: ${topOrder.join(' -> ')}`);
  }
  
  return {
    steps,
    output,
    sortedArray: array,
    algorithmName: "Course Schedule"
  };
}
