INSERT INTO user_entries(name, league_id, league_user_id)
VALUES (${name}, ${league_id}, ${league_user_id})
RETURNING id, name, league_id, league_user_id, paid
