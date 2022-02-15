# PBDS

pbds stands for policy-base data structure in g++.

## Ordered Set

Ordered set is a policy based data structure in g++ that keeps the unique elements in sorted order. It performs all the operations as performed by the set data structure in STL in log(n) complexity and performs two additional operations also in log(n) complexity .

- order_of_key(k) : Number of items strictly smaller than k .
- find_by_order(k) : K-th element in a set (counting from zero).

## reference

[geeks-for-geeks](https://www.geeksforgeeks.org/ordered-set-gnu-c-pbds/)
