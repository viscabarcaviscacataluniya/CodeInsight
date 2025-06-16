
// Array-related LeetCode problems

export const twoSumTemplate = `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        if (map.find(complement) != map.end()) {
            return {map[complement], i};
        }
        
        map[nums[i]] = i;
    }
    
    return {}; // No solution found
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    
    vector<int> result = twoSum(nums, target);
    
    if (result.size() == 2) {
        cout << "Indices: " << result[0] << ", " << result[1] << "\\n";
        cout << "Values: " << nums[result[0]] << " + " << nums[result[1]] << " = " << target << "\\n";
    } else {
        cout << "No solution found.\\n";
    }
    
    return 0;
}`;

export const maxSubarrayTemplate = `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int maxSubArray(vector<int>& nums) {
    int maxSoFar = nums[0];
    int maxEndingHere = nums[0];
    
    for (int i = 1; i < nums.size(); i++) {
        maxEndingHere = max(nums[i], maxEndingHere + nums[i]);
        maxSoFar = max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}

int main() {
    vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    
    int result = maxSubArray(nums);
    cout << "Maximum subarray sum: " << result << "\\n";
    
    return 0;
}`;

export const containerWithMostWaterTemplate = `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxArea(vector<int>& height) {
    int left = 0;
    int right = height.size() - 1;
    int maxWater = 0;
    
    while (left < right) {
        // Calculate area
        int h = min(height[left], height[right]);
        int w = right - left;
        maxWater = max(maxWater, h * w);
        
        // Move pointers
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}

int main() {
    vector<int> height = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    
    int result = maxArea(height);
    cout << "Maximum water container area: " << result << "\\n";
    
    return 0;
}`;

export const rotateImageTemplate = `#include <iostream>
#include <vector>
using namespace std;

void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    
    // Transpose the matrix
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            swap(matrix[i][j], matrix[j][i]);
        }
    }
    
    // Reverse each row
    for (int i = 0; i < n; i++) {
        reverse(matrix[i].begin(), matrix[i].end());
    }
}

void printMatrix(const vector<vector<int>>& matrix) {
    for (const auto& row : matrix) {
        for (int val : row) {
            cout << val << " ";
        }
        cout << "\\n";
    }
}

int main() {
    vector<vector<int>> matrix = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    
    cout << "Original matrix:\\n";
    printMatrix(matrix);
    
    rotate(matrix);
    
    cout << "\\nRotated matrix (90° clockwise):\\n";
    printMatrix(matrix);
    
    return 0;
}`;

export const trappingRainWaterTemplate = `#include <iostream>
#include <vector>
using namespace std;

int trap(vector<int>& height) {
    int n = height.size();
    if (n <= 2) return 0;
    
    vector<int> leftMax(n), rightMax(n);
    
    // Compute left max heights
    leftMax[0] = height[0];
    for (int i = 1; i < n; i++) {
        leftMax[i] = max(leftMax[i - 1], height[i]);
    }
    
    // Compute right max heights
    rightMax[n - 1] = height[n - 1];
    for (int i = n - 2; i >= 0; i--) {
        rightMax[i] = max(rightMax[i + 1], height[i]);
    }
    
    // Calculate trapped water
    int water = 0;
    for (int i = 0; i < n; i++) {
        water += min(leftMax[i], rightMax[i]) - height[i];
    }
    
    return water;
}

int main() {
    vector<int> height = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    
    int result = trap(height);
    cout << "Total trapped rainwater: " << result << " units\\n";
    
    return 0;
}`;
