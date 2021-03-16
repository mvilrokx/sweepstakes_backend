INSERT INTO tournaments(name, starts_at, ends_at)
VALUES (${name}, ${starts_at}, ${ends_at})
RETURNING id, name, starts_at, ends_at
