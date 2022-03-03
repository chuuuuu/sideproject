#include <ext/pb_ds/assoc_container.hpp>
#include <bits/stdc++.h>

using namespace std;
using namespace __gnu_pbds;

template<class T> using ordered_set = tree<T, null_type, less<T>, rb_tree_tag, tree_order_statistics_node_update>;

int main()
{
  ordered_set<int> os;
  os.insert(0);
  for(int i=0; i<5; i++){
    // os = {0, 1, 2, 3, 4}
    os.insert(i);
  }

  // the third element (counting from zero), which is 3 in this case
  // time complexity: O(log(n))
  cout << "*os.find_by_order(3): " << *os.find_by_order(3) << endl;
  
  // show the number of element strictly smaller than k
  // {0, 1, 2} are strictly smaller than k, hence it will return 3
  // time complexity: O(log(n))
  cout << "os.order_of_key(3): " << os.order_of_key(3) << endl;

}