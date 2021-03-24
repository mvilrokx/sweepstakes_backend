SELECT l.*, t.name
  FROM leagues l,
       tournaments t
 WHERE l.tournament_id = t.id
   AND t.ends_at > now()
