select s1.score, count(*) as 'rank'
from scores as s1, (select distinct score from scores) as s2
where s1.score <= s2.score
group by s1.id
order by s1.score desc