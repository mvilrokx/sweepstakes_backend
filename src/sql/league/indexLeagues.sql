SELECT l.*, t.name tournament_name
  FROM leagues l,
       tournaments t
 WHERE l.tournament_id = t.id
   AND t.ends_at > now()
   AND l.tournament_id = ${tournament_id}
