#include <bits/stdc++.h>
using namespace std;

struct Person {
	string name;
	int age;
} p1, p2, p3;

// struct is_older {
// 	bool operator()(struct Person p1, struct Person p2) {
//     	return p1.age > p2.age;
//     }
// };

bool is_older(struct Person p1, struct Person p2){
  return p1.age > p2.age;
}

int main() {
	ios::sync_with_stdio(0);
  cin.tie(0);
  
  // Creates a max heap
  priority_queue <int> pq;

  // To create a min heap instead, just uncomment the below line
  // priority_queue <int, vector<int>, greater<int> > pq;

  pq.push(5);
  pq.push(1);
  pq.push(10);
  pq.push(30);
  pq.push(20);

  // Extracting items from the heap
  while (!pq.empty())
  {
      cout << pq.top() << " ";
      pq.pop();
  }
  cout << endl;

  // creating heap from user defined objects
  // Let's initialize the properties of `Person` object first
  p1.name = "Linus Torvalds";
  p1.age = 47;

  p2.name = "Elon Musk";
  p2.age = 46;

  p3.name = "Me!";
  p3.age = 19;

  // Initialize a min heap
  // Note: We defined a comparator is_older in the beginning to
  // compare the ages of two person.
  priority_queue <struct Person, vector<struct Person>, function<bool(Person, Person)>> mh(is_older);
  mh.push(p1);
  mh.push(p2);
  mh.push(p3);

  // Extracting items from the heap
  while (!mh.empty())
  {
    struct Person p = mh.top();
      cout << p.name << " " << endl;
      mh.pop();
  }
}