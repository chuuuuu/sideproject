select
    t.request_at as day,
    round(sum(if(t.status = 'completed', 0, 1)) / count(*), 2) as 'cancellation rate'
from trips as t, users as u1, users as u2
where 
    t.client_id = u1.users_id and
    t.driver_id = u2.users_id and
    u1.banned = 'no' and
    u2.banned = 'no' and
    t.request_at between '2013-10-01' and '2013-10-03'
group by t.request_at
