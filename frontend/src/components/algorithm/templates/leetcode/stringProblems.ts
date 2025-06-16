
// String-related LeetCode problems

export const validParenthesesTemplate = `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            
            if (c == ')' && st.top() != '(') return false;
            if (c == '}' && st.top() != '{') return false;
            if (c == ']' && st.top() != '[') return false;
            
            st.pop();
        }
    }
    
    return st.empty();
}

int main() {
    string s = "()[]{}";
    
    if (isValid(s)) {
        cout << "'" << s << "' has valid parentheses.\\n";
    } else {
        cout << "'" << s << "' has invalid parentheses.\\n";
    }
    
    return 0;
}`;

export const wordSearchTemplate = `#include <iostream>
#include <vector>
#include <string>
using namespace std;

bool exist(vector<vector<char>>& board, string word) {
    int m = board.size();
    int n = board[0].size();
    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (dfs(board, word, i, j, 0)) {
                return true;
            }
        }
    }
    
    return false;
}

bool dfs(vector<vector<char>>& board, string& word, int i, int j, int index) {
    // Found the complete word
    if (index == word.size()) {
        return true;
    }
    
    // Out of bounds or character doesn't match
    int m = board.size();
    int n = board[0].size();
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] != word[index]) {
        return false;
    }
    
    // Mark as visited
    char original = board[i][j];
    board[i][j] = '#';
    
    // Try all four directions
    bool found = dfs(board, word, i + 1, j, index + 1) ||
                 dfs(board, word, i - 1, j, index + 1) ||
                 dfs(board, word, i, j + 1, index + 1) ||
                 dfs(board, word, i, j - 1, index + 1);
    
    // Restore the character
    board[i][j] = original;
    
    return found;
}

int main() {
    vector<vector<char>> board = {
        {'A', 'B', 'C', 'E'},
        {'S', 'F', 'C', 'S'},
        {'A', 'D', 'E', 'E'}
    };
    
    string word = "ABCCED";
    
    if (exist(board, word)) {
        cout << "Word '" << word << "' found in board\\n";
    } else {
        cout << "Word '" << word << "' not found in board\\n";
    }
    
    return 0;
}`;

export const longestPalindromicSubstringTemplate = `#include <iostream>
#include <string>
using namespace std;

string longestPalindrome(string s) {
    if (s.empty()) return "";
    
    int start = 0;
    int maxLength = 1;
    
    // Helper function to expand around center
    auto expandAroundCenter = [&](int left, int right) {
        while (left >= 0 && right < s.length() && s[left] == s[right]) {
            if (right - left + 1 > maxLength) {
                start = left;
                maxLength = right - left + 1;
            }
            left--;
            right++;
        }
    };
    
    for (int i = 0; i < s.length(); i++) {
        // Odd length palindrome
        expandAroundCenter(i, i);
        
        // Even length palindrome
        expandAroundCenter(i, i + 1);
    }
    
    return s.substr(start, maxLength);
}

int main() {
    string s = "babad";
    
    string result = longestPalindrome(s);
    cout << "Longest palindromic substring: " << result << "\\n";
    
    return 0;
}`;

export const wordBreakTemplate = `#include <iostream>
#include <vector>
#include <string>
#include <unordered_set>
using namespace std;

bool wordBreak(string s, vector<string>& wordDict) {
    unordered_set<string> dict(wordDict.begin(), wordDict.end());
    vector<bool> dp(s.length() + 1, false);
    dp[0] = true; // Empty string is valid
    
    for (int i = 1; i <= s.length(); i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && dict.find(s.substr(j, i - j)) != dict.end()) {
                dp[i] = true;
                break;
            }
        }
    }
    
    return dp[s.length()];
}

int main() {
    string s = "leetcode";
    vector<string> wordDict = {"leet", "code"};
    
    if (wordBreak(s, wordDict)) {
        cout << "String can be segmented into dictionary words\\n";
    } else {
        cout << "String cannot be segmented into dictionary words\\n";
    }
    
    return 0;
}`;
