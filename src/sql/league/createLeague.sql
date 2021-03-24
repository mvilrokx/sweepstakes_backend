INSERT INTO leagues(name, tournament_id)
VALUES (${name}, ${tournament_id})
RETURNING id, name, tournament_id
