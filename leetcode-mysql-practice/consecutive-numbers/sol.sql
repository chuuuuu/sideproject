select distinct l1.num as ConsecutiveNums
from logs as l1, logs as l2, logs as l3
where l1.num = l2.num and l2.num = l3.num and l1.id + 1 = l2.id and l2.id + 1 = l3.id