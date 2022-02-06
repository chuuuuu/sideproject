select
  p.lastname,
  p.firstname,
  a.city,
  a.state
from
  person as p
  left join address as a on person.personId = address.personId;