INSERT INTO entry_picks(user_entry_id, tournament_team_id, position)
VALUES (${user_entry_id}, ${tournament_team_id}, ${position})
RETURNING id, user_entry_id, tournament_team_id, position
