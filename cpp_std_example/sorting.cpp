#include <bits/stdc++.h>
using namespace std;

struct Person {
	string name;
	int age;
};

bool is_older(struct Person p1, struct Person p2){
  return p1.age > p2.age;
}

bool cmp(int a, int b){
  return a > b;
}

int main() {
	ios::sync_with_stdio(0);
  cin.tie(0);
  
  // The following list type initialization is only supported after C++11
  vector<int> int_vec = {56, 32, -43, 23, 12, 93, 132, -154};

  cout << "Original vector:" << endl;
  for(vector <int>::iterator it=int_vec.begin(); it!=int_vec.end(); it++){
    cout << *it << " "; 
  }
  cout << endl << endl;

  // Default: sort ascending
  sort(int_vec.begin(), int_vec.end());

  cout << "Sorting vector:" << endl;
  for(vector <int>::iterator it=int_vec.begin(); it!=int_vec.end(); it++){
    cout << *it << " "; 
  }
  cout << endl << endl;

  // To sort in descending order:
	sort(int_vec.begin(), int_vec.end(), cmp);

  cout << "Sorting vector in descending order:" << endl;
  for (vector <int>::iterator it = int_vec.begin(); it!=int_vec.end(); it++)
    cout << *it << " ";
  cout << endl << endl;

  // // sorting the array
  #define ARR_LEN 8
  int arr[] = {56, 32, -43, 23, 12, 93, 132, -154};

  sort(arr, arr + ARR_LEN);

  cout << "Sorting array:" << endl;
  for (int i=0; i < ARR_LEN; i++) {
    cout << arr[i] << " ";
  }
  cout << endl << endl;

  // Sorting user-defined objects
  struct Person persons[] = {
    {
      .name = "Linus Torvalds",
      .age = 47,
    },
    {
      .name = "Elon Musk",
      .age = 46,
    },
    {
      .name = "Me!",
      .age = 19,
    },
  };

  cout << "persons before sorting" << endl;
  for (int i=0; i < 3; i++) {
    cout << persons[i].name << " ";
  }
  cout << endl << endl;

  sort(persons, persons+3, is_older);

  cout << "persons after sorting" << endl;
  for (int i=0; i < 3; i++) {
    cout << persons[i].name << " ";
  }
  cout << endl << endl;

	return 0;

}