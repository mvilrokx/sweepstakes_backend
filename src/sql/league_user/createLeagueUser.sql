INSERT INTO league_users(user_id, league_id)
VALUES (${user_id}, ${league_id})
RETURNING id, user_id, league_id, role, approved, primary_flag
