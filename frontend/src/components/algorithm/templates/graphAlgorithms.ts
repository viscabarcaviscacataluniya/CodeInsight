
export const primsAlgorithmTemplate = `#include <iostream>
#include <vector>
#include <queue>
#include <functional>
using namespace std;

#define INF 0x3f3f3f3f

// Graph is represented as adjacency list using pair<int, int> = (vertex, weight)
typedef pair<int, int> iPair;

void primMST(vector<vector<iPair>>& graph) {
  int V = graph.size();
  
  // Create a priority queue to store vertices
  priority_queue<iPair, vector<iPair>, greater<iPair>> pq;
  
  int src = 0; // Starting vertex
  
  // Distance values to pick minimum weight edge
  vector<int> key(V, INF);
  
  // To store MST
  vector<int> parent(V, -1);
  
  // Track vertices included in MST
  vector<bool> inMST(V, false);
  
  // Insert source with distance 0
  pq.push(make_pair(0, src));
  key[src] = 0;
  
  while (!pq.empty()) {
    // Extract minimum key vertex
    int u = pq.top().second;
    pq.pop();
    
    inMST[u] = true;
    
    // Traverse adjacent vertices
    for (auto& neighbor : graph[u]) {
      int v = neighbor.first;
      int weight = neighbor.second;
      
      // Update v only if not in MST and weight is smaller
      if (inMST[v] == false && key[v] > weight) {
        key[v] = weight;
        pq.push(make_pair(key[v], v));
        parent[v] = u;
      }
    }
  }
  
  // Print the MST
  cout << "Edge   Weight\\n";
  for (int i = 1; i < V; i++) {
    cout << parent[i] << " - " << i << "    " << key[i] << "\\n";
  }
}

int main() {
  int V = 5;
  vector<vector<iPair>> graph(V);
  
  // Add edges: (u, v, w)
  graph[0].push_back(make_pair(1, 2));
  graph[0].push_back(make_pair(3, 6));
  graph[1].push_back(make_pair(0, 2));
  graph[1].push_back(make_pair(2, 3));
  graph[1].push_back(make_pair(3, 8));
  graph[1].push_back(make_pair(4, 5));
  graph[2].push_back(make_pair(1, 3));
  graph[2].push_back(make_pair(4, 7));
  graph[3].push_back(make_pair(0, 6));
  graph[3].push_back(make_pair(1, 8));
  graph[3].push_back(make_pair(4, 9));
  graph[4].push_back(make_pair(1, 5));
  graph[4].push_back(make_pair(2, 7));
  graph[4].push_back(make_pair(3, 9));
  
  primMST(graph);
  
  return 0;
}`;

export const kruskalAlgorithmTemplate = `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Structure to represent an edge
class Edge {
public:
  int src, dest, weight;
  
  // Constructor
  Edge(int s, int d, int w) {
    src = s;
    dest = d;
    weight = w;
  }
};

// Structure to represent a disjoint set
class DisjointSets {
  vector<int> parent, rank;
  int n;
  
public:
  DisjointSets(int n) {
    this->n = n;
    parent.resize(n);
    rank.resize(n, 0);
    
    // Each vertex is initially in its own set
    for (int i = 0; i < n; i++) {
      parent[i] = i;
    }
  }
  
  // Find the parent (with path compression)
  int find(int u) {
    if (u != parent[u]) {
      parent[u] = find(parent[u]);
    }
    return parent[u];
  }
  
  // Union by rank
  void merge(int x, int y) {
    x = find(x);
    y = find(y);
    
    if (x == y) return;
    
    if (rank[x] < rank[y]) {
      parent[x] = y;
    } else if (rank[x] > rank[y]) {
      parent[y] = x;
    } else {
      parent[y] = x;
      rank[x]++;
    }
  }
};

// Compare edges by weight
bool compareEdges(Edge a, Edge b) {
  return a.weight < b.weight;
}

void kruskalMST(vector<Edge>& edges, int V) {
  // Sort edges in increasing order of weight
  sort(edges.begin(), edges.end(), compareEdges);
  
  // Create V disjoint sets
  DisjointSets ds(V);
  
  vector<Edge> result; // Store the MST
  
  // Process all edges
  for (Edge& edge : edges) {
    int u = edge.src;
    int v = edge.dest;
    
    int set_u = ds.find(u);
    int set_v = ds.find(v);
    
    // Include edge if it doesn't create a cycle
    if (set_u != set_v) {
      result.push_back(edge);
      ds.merge(set_u, set_v);
    }
  }
  
  // Print the MST
  cout << "Edge   Weight\\n";
  for (Edge& edge : result) {
    cout << edge.src << " - " << edge.dest << "    " << edge.weight << "\\n";
  }
}

int main() {
  int V = 5; // Number of vertices
  vector<Edge> edges;
  
  // Add edges (src, dest, weight)
  edges.push_back(Edge(0, 1, 10));
  edges.push_back(Edge(0, 2, 6));
  edges.push_back(Edge(0, 3, 5));
  edges.push_back(Edge(1, 3, 15));
  edges.push_back(Edge(2, 3, 4));
  
  kruskalMST(edges, V);
  
  return 0;
}`;
