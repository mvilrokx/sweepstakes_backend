SELECT
  us.name user_entry_name,
  ep.id,
  c.name,
  ep.position
FROM
  user_entries us,
  entry_picks ep,
  tournament_teams tt,
  countries c
WHERE
  us.id = ${user_entry_id} AND
  us.id = ep.user_entry_id AND
  ep.tournament_team_id = tt.id AND
  tt.country_id = c.id
ORDER BY
  ep.position
