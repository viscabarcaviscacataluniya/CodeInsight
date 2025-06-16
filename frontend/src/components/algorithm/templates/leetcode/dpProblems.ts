
// Dynamic programming related LeetCode problems

export const climbingStairsTemplate = `#include <iostream>
#include <vector>
using namespace std;

int climbStairs(int n) {
    if (n <= 2) {
        return n;
    }
    
    vector<int> dp(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

int main() {
    int n = 5;
    
    cout << "Number of ways to climb " << n << " stairs: " << climbStairs(n) << "\\n";
    
    return 0;
}`;

export const coinChangeTemplate = `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    
    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            dp[i] = min(dp[i], dp[i - coin] + 1);
        }
    }
    
    return dp[amount] > amount ? -1 : dp[amount];
}

int main() {
    vector<int> coins = {1, 2, 5};
    int amount = 11;
    
    int result = coinChange(coins, amount);
    
    if (result == -1) {
        cout << "Cannot make amount " << amount << " with given coins\\n";
    } else {
        cout << "Minimum coins needed: " << result << "\\n";
    }
    
    return 0;
}`;

export const jumpGameTemplate = `#include <iostream>
#include <vector>
using namespace std;

bool canJump(vector<int>& nums) {
    int maxReach = 0;
    
    for (int i = 0; i < nums.size(); i++) {
        // If we can't reach current position
        if (i > maxReach) {
            return false;
        }
        
        // Update max reach
        maxReach = max(maxReach, i + nums[i]);
        
        // If we can already reach the end
        if (maxReach >= nums.size() - 1) {
            return true;
        }
    }
    
    return true;
}

int main() {
    vector<int> nums = {2, 3, 1, 1, 4};
    
    if (canJump(nums)) {
        cout << "Can reach the end!\\n";
    } else {
        cout << "Cannot reach the end.\\n";
    }
    
    return 0;
}`;
