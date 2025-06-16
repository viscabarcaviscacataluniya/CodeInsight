
export const bubbleSortTemplate = `#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
  for (int i = 0; i < n-1; i++) {
    for (int j = 0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        int temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
}

int main() {
  int arr[] = {64, 34, 25, 12, 22, 11, 90};
  int n = sizeof(arr)/sizeof(arr[0]);
  
  bubbleSort(arr, n);
  
  cout << "Sorted array: \\n";
  for (int i = 0; i < n; i++)
    cout << arr[i] << " ";
  
  return 0;
}`;

export const insertionSortTemplate = `#include <iostream>
using namespace std;

void insertionSort(int arr[], int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}

int main() {
  int arr[] = {12, 11, 13, 5, 6, 7};
  int n = sizeof(arr)/sizeof(arr[0]);
  
  insertionSort(arr, n);
  
  cout << "Sorted array: \\n";
  for (int i = 0; i < n; i++)
    cout << arr[i] << " ";
  
  return 0;
}`;

export const selectionSortTemplate = `#include <iostream>
using namespace std;

void selectionSort(int arr[], int n) {
  for (int i = 0; i < n-1; i++) {
    int min_idx = i;
    for (int j = i+1; j < n; j++)
      if (arr[j] < arr[min_idx])
        min_idx = j;
        
    int temp = arr[min_idx];
    arr[min_idx] = arr[i];
    arr[i] = temp;
  }
}

int main() {
  int arr[] = {64, 25, 12, 22, 11};
  int n = sizeof(arr)/sizeof(arr[0]);
  
  selectionSort(arr, n);
  
  cout << "Sorted array: \\n";
  for (int i = 0; i < n; i++)
    cout << arr[i] << " ";
  
  return 0;
}`;

export const mergeSortTemplate = `#include <iostream>
using namespace std;

void merge(int arr[], int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  
  int L[n1], R[n2];
  
  for (int i = 0; i < n1; i++)
    L[i] = arr[l + i];
  for (int j = 0; j < n2; j++)
    R[j] = arr[m + 1 + j];
    
  int i = 0, j = 0, k = l;
  
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }
  
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }
  
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}

void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    
    merge(arr, l, m, r);
  }
}

int main() {
  int arr[] = {12, 11, 13, 5, 6, 7};
  int n = sizeof(arr)/sizeof(arr[0]);
  
  mergeSort(arr, 0, n - 1);
  
  cout << "Sorted array: \\n";
  for (int i = 0; i < n; i++)
    cout << arr[i] << " ";
  
  return 0;
}`;

export const quickSortTemplate = `#include <iostream>
using namespace std;

int partition(int arr[], int low, int high) {
  int pivot = arr[high];
  int i = (low - 1);
  
  for (int j = low; j <= high - 1; j++) {
    if (arr[j] <= pivot) {
      i++;
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  
  int temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  
  return (i + 1);
}

void quickSort(int arr[], int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

int main() {
  int arr[] = {10, 7, 8, 9, 1, 5};
  int n = sizeof(arr)/sizeof(arr[0]);
  
  quickSort(arr, 0, n - 1);
  
  cout << "Sorted array: \\n";
  for (int i = 0; i < n; i++)
    cout << arr[i] << " ";
  
  return 0;
}`;

export const heapSortTemplate = `#include <iostream>
using namespace std;

void heapify(int arr[], int n, int i) {
  int largest = i;
  int l = 2 * i + 1;
  int r = 2 * i + 2;
  
  if (l < n && arr[l] > arr[largest])
    largest = l;
    
  if (r < n && arr[r] > arr[largest])
    largest = r;
    
  if (largest != i) {
    int temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;
    
    heapify(arr, n, largest);
  }
}

void heapSort(int arr[], int n) {
  for (int i = n / 2 - 1; i >= 0; i--)
    heapify(arr, n, i);
    
  for (int i = n - 1; i > 0; i--) {
    int temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    
    heapify(arr, i, 0);
  }
}

int main() {
  int arr[] = {12, 11, 13, 5, 6, 7};
  int n = sizeof(arr)/sizeof(arr[0]);
  
  heapSort(arr, n);
  
  cout << "Sorted array: \\n";
  for (int i = 0; i < n; i++)
    cout << arr[i] << " ";
  
  return 0;
}`;
