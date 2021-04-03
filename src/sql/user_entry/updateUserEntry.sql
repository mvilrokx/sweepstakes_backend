UPDATE user_entries
   SET name = ${name},
       paid = ${paid}
 WHERE id = ${id}
RETURNING id, name, league_id, league_user_id, paid
