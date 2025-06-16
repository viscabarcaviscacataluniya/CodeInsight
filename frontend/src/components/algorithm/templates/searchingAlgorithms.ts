
export const linearSearchTemplate = `#include <iostream>
using namespace std;

int linearSearch(int arr[], int n, int x) {
  for (int i = 0; i < n; i++)
    if (arr[i] == x)
      return i;
  return -1;
}

int main() {
  int arr[] = {2, 3, 4, 10, 40};
  int n = sizeof(arr)/sizeof(arr[0]);
  int x = 10;
  
  int result = linearSearch(arr, n, x);
  
  if (result == -1)
    cout << "Element not present in array";
  else
    cout << "Element found at index " << result;
    
  return 0;
}`;

export const binarySearchTemplate = `#include <iostream>
using namespace std;

int binarySearch(int arr[], int l, int r, int x) {
  if (r >= l) {
    int mid = l + (r - l) / 2;
    
    if (arr[mid] == x)
      return mid;
      
    if (arr[mid] > x)
      return binarySearch(arr, l, mid - 1, x);
      
    return binarySearch(arr, mid + 1, r, x);
  }
  return -1;
}

int main() {
  int arr[] = {2, 3, 4, 10, 40};
  int n = sizeof(arr)/sizeof(arr[0]);
  int x = 10;
  
  int result = binarySearch(arr, 0, n - 1, x);
  
  if (result == -1)
    cout << "Element not present in array";
  else
    cout << "Element found at index " << result;
    
  return 0;
}`;
