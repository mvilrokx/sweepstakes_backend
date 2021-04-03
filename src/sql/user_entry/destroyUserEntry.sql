DELETE
  FROM user_entries
 WHERE id = ${id}
RETURNING id, name, league_id, league_user_id, paid
