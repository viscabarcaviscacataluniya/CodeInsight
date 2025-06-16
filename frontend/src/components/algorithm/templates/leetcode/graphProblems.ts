
// Graph-related LeetCode problems

export const nQueensTemplate = `#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> result;
        vector<string> board(n, string(n, '.'));
        
        backtrack(result, board, 0, n);
        
        return result;
    }
    
private:
    void backtrack(vector<vector<string>>& result, vector<string>& board, 
                  int row, int n) {
        if (row == n) {
            result.push_back(board);
            return;
        }
        
        for (int col = 0; col < n; col++) {
            if (isValid(board, row, col, n)) {
                board[row][col] = 'Q';
                backtrack(result, board, row + 1, n);
                board[row][col] = '.';
            }
        }
    }
    
    bool isValid(vector<string>& board, int row, int col, int n) {
        // Check column
        for (int i = 0; i < row; i++) {
            if (board[i][col] == 'Q')
                return false;
        }
        
        // Check upper left diagonal
        for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] == 'Q')
                return false;
        }
        
        // Check upper right diagonal
        for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] == 'Q')
                return false;
        }
        
        return true;
    }
};

int main() {
    int n = 4; // Solve for 4-Queens
    Solution solution;
    
    vector<vector<string>> result = solution.solveNQueens(n);
    
    cout << result.size() << " solutions found\\n\\n";
    
    for (int i = 0; i < result.size(); i++) {
        cout << "Solution " << (i + 1) << ":\\n";
        for (const string& row : result[i]) {
            cout << row << "\\n";
        }
        cout << "\\n";
    }
    
    return 0;
}`;

export const courseScheduleTemplate = `#include <iostream>
#include <vector>
using namespace std;

bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> graph(numCourses);
    
    // Build adjacency list
    for (const auto& pre : prerequisites) {
        graph[pre[1]].push_back(pre[0]);
    }
    
    // 0 = not visited, 1 = visiting, 2 = visited
    vector<int> visited(numCourses, 0);
    
    // Check for cycle using DFS
    for (int i = 0; i < numCourses; i++) {
        if (visited[i] == 0 && hasCycle(graph, visited, i)) {
            return false;
        }
    }
    
    return true;
}

bool hasCycle(vector<vector<int>>& graph, vector<int>& visited, int course) {
    if (visited[course] == 1) {
        return true;  // Cycle detected
    }
    if (visited[course] == 2) {
        return false; // Already visited, no cycle
    }
    
    visited[course] = 1; // Mark as being visited
    
    for (int nextCourse : graph[course]) {
        if (hasCycle(graph, visited, nextCourse)) {
            return true;
        }
    }
    
    visited[course] = 2; // Mark as visited
    return false;
}

int main() {
    int numCourses = 4;
    vector<vector<int>> prerequisites = {{1, 0}, {2, 1}, {3, 2}};
    
    if (canFinish(numCourses, prerequisites)) {
        cout << "All courses can be finished!\\n";
    } else {
        cout << "Cannot finish all courses due to cycle.\\n";
    }
    
    return 0;
}`;
