#include <bits/stdc++.h>
using namespace std;	

int main() {
	ios::sync_with_stdio(0);
  cin.tie(0);
  
	stack <string> distros; //Create a stack of strings.

	distros.push("Ubuntu");  //Pushing elements into the stack.
	distros.push("Mint");

	cout << "Number of distros in the stack are " << distros.size() << endl;
	cout << "Distro on the top is " << distros.top() << endl;

	distros.pop();
	cout << "The top of the stack is now " << distros.top() << endl;
}