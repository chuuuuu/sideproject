#include <bits/stdc++.h>
using namespace std;

// vector is implemented by dynamic array

// deque
// Similar purpose of std::vector
// Basically std::vector with efficient push_front and pop_front

int main() {
  ios::sync_with_stdio(0);
  cin.tie(0);

  vector <int> numbers;

	if (numbers.empty()){ //check if the vector is empty?
		cout << "The vector is empty :(" << endl;
	}

	for(int i=0; i<100; i+=10){ //Add some values to the vector
		numbers.push_back(i);
	}

	cout << "Size of the vector is " << numbers.size() << endl;

	// iterating over the vector, declaring the iterator
	vector <int>::iterator it;

	cout << "The vector contains: ";
	for (it=numbers.begin(); it!=numbers.end(); it++) {
		cout << "  " << *it;
	}

	// getting value at particular position
	int position = 5;
	cout<<"\nVector at position "<<position<<" contains "<<numbers[position]<<endl;

	// deleting an element at position
	numbers.erase(numbers.begin() + position);
	cout<<"Vector at position "<<position<<" contains "<<numbers[position]<<endl;

	// deleting a range of elements, first two elements
	// NOTE: You may expect elements at 0, 1 and 2 to be deleted
	// but index 2 is not inclusive.
	numbers.erase(numbers.begin(), numbers.begin()+2);
	cout << "The vector contains: ";
	for (it=numbers.begin(); it!=numbers.end(); it++) {
		cout << "  " << *it;
	}

	// Clearing the vector
	numbers.clear();
	if (numbers.empty()){
		cout << "\nThe vector is now empty again :(\n";
	}

  vector<int> xs = {1, 2, 3};
  cout << xs.size() << '\n';
}