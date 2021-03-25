INSERT INTO tournaments(name, starts_at, ends_at, logo_url)
VALUES (${name}, ${starts_at}, ${ends_at}, ${logo_url})
RETURNING id, name, starts_at, ends_at, logo_url
