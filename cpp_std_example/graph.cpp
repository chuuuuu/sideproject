#include <bits/stdc++.h>
using namespace std;	
const int N = 7;
vector<int> adj[N];
bool is_edge[N][N];
bool is_visited[N];
int d[N];

void append_edge(int n1, int n2){
  adj[n1].push_back(n2);
  adj[n2].push_back(n1);
  is_edge[n1][n2] = true;
  is_edge[n2][n1] = true;
}

int main(){
  ios::sync_with_stdio(0);
  cin.tie(0);

  memset(is_edge, false, sizeof(is_edge));
  append_edge(0, 6);
  append_edge(1, 4);
  append_edge(5, 2);
  append_edge(3, 6);
  append_edge(3, 5);
  append_edge(3, 4);
  append_edge(2, 6);
  append_edge(4, 2);

  // find shortest path
  memset(is_visited, false, sizeof(is_visited));
  deque<int> q;
  q.push_back(0);
  is_visited[0] = true;
  d[0] = 0;
  while(!q.empty()){
    int n = q.front();
    q.pop_front();
    cout << n << endl;

    for(int n_adj: adj[n]){
      if(!is_visited[n_adj]){
        q.push_back(n_adj);
        is_visited[n_adj] = true;
        d[n_adj] = d[n] + 1;
      }
    }
  }

  for(int i=0; i<N; i++){
    cout << i << ": " << d[i] << endl;
  }
}
