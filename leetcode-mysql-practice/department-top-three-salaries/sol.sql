select 
    d.name as department, 
    e1.name as employee, 
    e1.salary as salary
from employee as e1, employee as e2, department as d
where 
    e2.salary >= e1.salary and 
    e2.departmentId = e1.departmentId and 
    e1.departmentId = d.id
group by e1.id
having count(distinct(e2.salary)) <= 3
    
