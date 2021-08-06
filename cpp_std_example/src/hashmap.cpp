#include <bits/stdc++.h>
using namespace std;

// map

// Insert:  	        O(log(n))
// Access by Key: 	  O(log(n))
// Remove by Key:   	O(log(n))
// Find/Remove Value	O(log(n))

// unordered_map

// Insert:      	O(1)
// Access by Key:	O(1)
// Remove by Key:	O(1)

int main() {
  ios::sync_with_stdio(0);
  cin.tie(0);

  // Declaration <key type, value type>
	map <string, string> companies;

	companies["Google"] = "Larry Page";
	companies["Facebook"] = "Mark Zuckerberg";

	// insertion can also be done as
	companies.insert(pair<string, string> ("Xarvis Tech", "xarvis"));
	// or
	companies.insert(map<string,string>::value_type("Quora", "Adam D'Angelo"));
	// or even
	companies.insert(make_pair(string("Uber"), string("Travis Kalanick")));

	// Iterating the map
	map<string, string>::iterator itz;
	cout << "\n\nCompanies and founders" << endl;
	for (itz=companies.begin(); itz!=companies.end(); itz++){
		cout << "Company: " << (*itz).first << "\t Founder: " << itz->second <<endl;
	}

	itz = companies.find("Google");
	cout << itz->second << endl;
        
  if ( companies.find("not_a_company") == companies.end() ) {
        // not found
        cout << "not found" << endl;
  } else {
        // found
        cout << "found" << endl;
  }

	unordered_map<string, string> my_dict;
	my_dict["a"] = "abc";
	my_dict["1"] = "123";
	// this doesn't create copies
	for(auto& it: my_dict){
		cout << it.first << " " << it.second << endl;
	}

	// this does create copies
	for(auto it: my_dict){
		cout << it.first << " " << it.second << endl;
	}
}