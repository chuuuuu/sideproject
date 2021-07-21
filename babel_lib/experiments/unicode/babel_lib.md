- alphabets: using utf-8, len of which is 10878
- length per page: 3200
- number of combinations: 10878^3200 = 2^(42910)
- sizeof(address_of_page) = 42910 bits = 7152 * 64 bits
  - the length of the address might be too big, however, i can write a shorten address function for caching

10878 = 2 × 3 × 7**2 × 37
