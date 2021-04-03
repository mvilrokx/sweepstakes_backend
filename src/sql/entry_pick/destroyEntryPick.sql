DELETE
  FROM entry_picks
 WHERE id = ${id}
RETURNING id, user_entry_id, tournament_team_id, position
