UPDATE entry_picks
   SET position = ${position}
 WHERE id = ${id}
RETURNING id, user_entry_id, tournament_team_id, position
