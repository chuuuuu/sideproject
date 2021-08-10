#include <bits/stdc++.h>
using namespace std;	

int main() {
	ios::sync_with_stdio(0);
  cin.tie(0);
  
  queue<int> q;

  // Insert
  q.push(5);
  q.push(1);
  q.push(2);
  q.push(6);

  // Access head, tail
  int head = q.front();       // head
  int tail = q.back();        // tail
  cout << "head: " << head << " tail: " << tail << endl;

  // Size
  unsigned int size = q.size();
  cout << "size: " << size << endl;

  // Remove
  q.pop();
  cout << "after pop" << endl;
  cout << "q.front(): " << q.front() << endl;
}