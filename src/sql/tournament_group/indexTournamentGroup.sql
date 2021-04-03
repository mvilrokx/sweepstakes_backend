SELECT
  t.name tournament_name,
  tt.id tournament_team_id,
  tg.name group_name,
  c.code country_code,
  c.name country_name
FROM
  tournaments t,
  tournament_groups tg,
  tournament_teams tt,
  countries c
WHERE
  t.id = ${tournament_id} AND
  t.id = tg.tournament_id AND
  tg.id = tt.group_id AND
  tt.country_id = c.id
ORDER BY
  tg.name,
  tt.id
