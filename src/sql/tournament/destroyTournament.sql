DELETE
  FROM tournaments
 WHERE id = ${id}
RETURNING id, name, starts_at, ends_at, logo_url
