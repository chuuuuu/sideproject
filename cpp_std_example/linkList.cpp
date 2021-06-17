#include <bits/stdc++.h>
using namespace std;

int main() {
	ios::sync_with_stdio(0);
  cin.tie(0);
  
  list<int> mylist;
  list<int>::iterator it1,it2,itx;

  // set some values:
  for (int i=1; i<10; ++i) mylist.push_back(10*i);


  it1 = mylist.begin();
  it2 = mylist.begin();
  ++it1;
  advance (it2,6);
  cout << "value of it1: " << *it1 << endl;
  cout << "value of it2: " << *it2 << endl;

  it1 = mylist.erase(it1);
  it2 = mylist.erase(it2);
  cout << "value of it1: " << *it1 << endl;
  cout << "value of it2: " << *it2 << endl;

  it1++;
  it2--;
  cout << "value of it1: " << *it1 << endl;
  cout << "value of it2: " << *it2 << endl;
  mylist.erase (it1,it2);

  cout << "\nmylist contains:";
  for (itx=mylist.begin(); itx!=mylist.end(); ++itx)
    cout << ' ' << *itx;
  cout << '\n';

  // NOTE: value of it1 is erased, hence, it gives unexpected value
  cout << "value of it1: " << *it1 << endl;
  cout << "value of it2: " << *it2 << endl;

  // This will print an unexpected value
  // it1++;
  // cout << *it1;
}