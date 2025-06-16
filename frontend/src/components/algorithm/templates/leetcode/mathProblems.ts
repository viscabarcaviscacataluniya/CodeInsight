
export const fibonacciSequenceTemplate = `#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

void printFibonacciSequence(int n) {
    cout << "Fibonacci sequence up to " << n << " terms:" << endl;
    for (int i = 0; i < n; i++) {
        cout << fibonacci(i) << " ";
    }
    cout << endl;
}

int main() {
    int n = 10;
    printFibonacciSequence(n);
    return 0;
}`;

export const factorialVisualizationTemplate = `#include <iostream>
using namespace std;

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    int n = 5;
    cout << "Computing factorial of " << n << endl;
    
    int result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
        cout << i << "! = " << result << endl;
    }
    
    cout << "Final result: " << n << "! = " << factorial(n) << endl;
    return 0;
}`;

export const palindromeCheckTemplate = `#include <iostream>
#include <vector>
using namespace std;

bool isPalindrome(vector<int>& arr) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left < right) {
        if (arr[left] != arr[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

int main() {
    vector<int> arr = {1, 2, 3, 2, 1};
    
    if (isPalindrome(arr)) {
        cout << "Array is a palindrome" << endl;
    } else {
        cout << "Array is not a palindrome" << endl;
    }
    
    return 0;
}`;
