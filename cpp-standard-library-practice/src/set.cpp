#include <bits/stdc++.h>
using namespace std;	

// Insert:  O(log(n))
// Remove:  O(log(n))
// Find:    O(log(n))

int main() {
	ios::sync_with_stdio(0);
  cin.tie(0);
  
  std::set<int> s;
  //---------------------------------
  // General Operations
  //---------------------------------

  // Insert
  s.insert(20);

  // Size
  unsigned int size = s.size();
  cout << "s.size()" << size << endl;

  // Iterate
  for(std::set<int>::iterator it = s.begin(); it != s.end(); it++) {
      std::cout << *it << std::endl;
  }

  // Remove
  s.erase(20);

  // Clear
  s.clear();

  //---------------------------------
  // Container-Specific Operations
  //---------------------------------

  // Find if an element exists
  if(s.find(20) != s.end()){
    cout << "Found the element" << endl;
  }
  else{
    cout << "Not found" << endl;
  }

  int arr[] = {14, 12, 15, 11, 11, 11, 13};
  
  // initializes the set from an array
  set<int> s1(arr, arr + 7);

  // Count the number of elements with a certain value
  // count can only be 0 or 1 since set container contains unique elements only
  cout << "s1.count(11): " << s1.count(11) << endl;
  cout << "s1.count(20)" << s1.count(20) << endl;
}