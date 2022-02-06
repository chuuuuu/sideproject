# Leetcode MySQL Practice

In this section, I practice database problem on leetcode.

## Problems

| Title                                                                                                                   | Solution                                                      | Difficulty |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ---------- |
| [Combine Two Tables](https://leetcode.com/problems/combine-two-tables/)                                                 | [MySQL](./combine-two-tables/sol.sql)                         | Easy       |
| [Employees Earning More Than Their Managers](https://leetcode.com/problems/employees-earning-more-than-their-managers/) | [MySQL](./employees-earning-more-than-their-managers/sol.sql) | Easy       |
| [Duplicate Emails](https://leetcode.com/problems/duplicate-emails/)                                                     | [MySQL](./duplicate-emails/sol.sql)                           | Easy       |
| [Customers Who Never Order](https://leetcode.com/problems/customers-who-never-order/)                                   | [MySQL](./customers-who-never-order/sol.sql)                  | Easy       |
| [Delete Duplicate Emails](https://leetcode.com/problems/delete-duplicate-emails/)                                       | [MySQL](./delete-duplicate-emails/sol.sql)                    | Easy       |
| [Rising Temperature](https://leetcode.com/problems/rising-temperature/)                                                 | [MySQL](./rising-temperature/sol.sql)                         | Easy       |
| [Big Countries](https://leetcode.com/problems/big-countries/)                                                           | [MySQL](./big-countries/sol.sql)                              | Easy       |
| [Classes More Than 5 Students](https://leetcode.com/problems/classes-more-than-5-students/)                             | [MySQL](./classes-more-than-5-students/sol.sql)               | Easy       |
| [Not Boring Movies](https://leetcode.com/problems/not-boring-movies/)                                                   | [MySQL](./not-boring-movies/sol.sql)                          | Easy       |
| [Swap Salary](https://leetcode.com/problems/swap-salary/)                                                               | [MySQL](./swap-salary/sol.sql)                                | Easy       |
| [Second Highest Salary](https://leetcode.com/problems/second-highest-salary/)                                           | [MySQL](./second-highest-salary/sol01.sql)                    | Medium     |
| [Nth Highest Salary](https://leetcode.com/problems/nth-highest-salary/)                                                 | [MySQL](./nth-highest-salary/sol.sql)                         | Medium     |
| [Rank Scores](https://leetcode.com/problems/rank-scores/)                                                               | [MySQL](./rank-scores/sol.sql)                                | Medium     |
| [Consecutive Numbers](https://leetcode.com/problems/consecutive-numbers/)                                               | [MySQL](./consecutive-numbers/sol.sql)                        | Medium     |
| [Exchange Seats](https://leetcode.com/problems/exchange-seats/)                                                         | [MySQL](./exchange-seats/sol.sql)                             | Medium     |
| [Department Top Three Salaries](https://leetcode.com/problems/department-top-three-salaries/)                           | [MySQL](./department-top-three-salaries/sol.sql)              | Hard       |
| [Trips and Users](https://leetcode.com/problems/trips-and-users/)                                                       | [MySQL](./trips-and-users/sol.sql)                            | Hard       |
| [Human Traffic of Stadium](https://leetcode.com/problems/human-traffic-of-stadium/)                                     | [MySQL](./human-traffic-of-stadium/sol.sql)                   | Hard       |

## Notes

- these three are equivalent
  - from a inner join b on condition
  - from a join b on condition
  - from a, b where condition
- after using group by, you can only select from the aggregate functions
  - count, sum, avg, min, max