#include <ext/pb_ds/assoc_container.hpp>
#include <bits/stdc++.h>

using namespace std;
using namespace __gnu_pbds;

// in face, less_equal is undefined behavior, hence there're some function wont work.
// for example, find and erase
// both of them use `!comp(a, b) && !comp(b, a)` to make sure a == b
// it works for less, but not for less_equal

template <class T> using ordered_multiset = tree<T, null_type, less_equal<T>, rb_tree_tag, tree_order_statistics_node_update>;

int main()
{
  // om = {1, 1, 1, 2, 2, 3, 3, 3, 3}
  ordered_multiset<int> om;
  om.insert(3);
  om.insert(2);
  om.insert(1);
  om.insert(3);
  om.insert(1);
  om.insert(3);
  om.insert(1);
  om.insert(2);
  om.insert(3);

  assert(om.size() == 9);
  assert(!om.empty());
  assert((vector<int>(om.begin(), om.end()) == vector<int>{1, 1, 1, 2, 2, 3, 3, 3, 3}));

  // unsupported functions
  // om.count(1);
  // om.emplace(1);

  // find will always return end
  assert(om.find(1) == om.end());
  assert(om.find(2) == om.end());

  // lower_bound works like upper_bound in normal set
  // (to return the first element > it)
  assert(*om.lower_bound(1) == 2);
  assert(*om.lower_bound(2) == 3);

  // upper_bound works like lower_bound in normal set
  // (to return the first element >= it)
  assert(*om.upper_bound(1) == 1);
  assert(*om.upper_bound(2) == 2);

  // note that find_by_order and order_of_key works properly
	// and doesn't need subtraction by 1
	assert(om.order_of_key(1)==0);
	assert(om.order_of_key(2)==3);
	assert(om.order_of_key(3)==5);

	assert(*om.find_by_order(0)==1);
	assert(*om.find_by_order(1)==1);
	assert(*om.find_by_order(3)==2);
	assert(*om.find_by_order(6)==3);

  // to erase
  om.erase(om.find_by_order(om.order_of_key(3)));
}