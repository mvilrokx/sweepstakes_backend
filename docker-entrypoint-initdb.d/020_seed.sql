-- SET TIME ZONE 'America/Los_Angeles';

\set tournament_name 'UEFA EURO 2020'

INSERT INTO tournaments (name, starts_at, ends_at) VALUES (:'tournament_name', TIMESTAMP WITH TIME ZONE '2020-06-12 12:00:00-08', TIMESTAMP WITH TIME ZONE '2020-07-12 13:45:00-08');

WITH ins (group_name, tournament_name) AS
( VALUES
    ('A', :'tournament_name'),
    ('B', :'tournament_name'),
    ('C', :'tournament_name'),
    ('D', :'tournament_name'),
    ('E', :'tournament_name'),
    ('F', :'tournament_name')
)
INSERT INTO tournament_groups
   (name, tournament_id)
SELECT
    ins.group_name, tournaments.id
FROM
  tournaments JOIN ins
    ON ins.tournament_name = tournaments.name;

WITH ins (group_name, tournament_name, country_id) AS
( VALUES
    ('A', :'tournament_name', 'ITA'),
    ('A', :'tournament_name', 'CHE'),
    ('A', :'tournament_name', 'TUR'),
    ('A', :'tournament_name', 'WAL'),
    ('B', :'tournament_name', 'BEL'),
    ('B', :'tournament_name', 'DNK'),
    ('B', :'tournament_name', 'FIN'),
    ('B', :'tournament_name', 'RUS'),
    ('C', :'tournament_name', 'AUT'),
    ('C', :'tournament_name', 'NLD'),
    ('C', :'tournament_name', 'UKR'),
    ('D', :'tournament_name', 'HRV'),
    ('D', :'tournament_name', 'CZE'),
    ('D', :'tournament_name', 'ENG'),
    ('E', :'tournament_name', 'POL'),
    ('E', :'tournament_name', 'ESP'),
    ('E', :'tournament_name', 'SWE'),
    ('F', :'tournament_name', 'FRA'),
    ('F', :'tournament_name', 'DEU'),
    ('F', :'tournament_name', 'PRT')
)
INSERT INTO tournament_participants
   (group_id, tournament_id, country_id)
SELECT
    tournament_groups.id, tournaments.id, ins.country_id
FROM ins
  JOIN tournaments ON ins.tournament_name = tournaments.name
  JOIN tournament_groups ON ins.group_name = tournament_groups.name;


WITH ins (tournament_name, home_country, away_country, kickoff) AS
( VALUES
    (:'tournament_name', 'TUR', 'ITA', TIMESTAMP WITH TIME ZONE '2020-06-12T12:00:00-08'),
    (:'tournament_name', 'WAL', 'CHE', TIMESTAMP WITH TIME ZONE '2020-06-13T06:00:00-08'),
    (:'tournament_name', 'DNK', 'FIN', TIMESTAMP WITH TIME ZONE '2020-06-13T09:00:00-08'),
    (:'tournament_name', 'BEL', 'RUS', TIMESTAMP WITH TIME ZONE '2020-06-13T12:00:00-08'),
    (:'tournament_name', 'ENG', 'HRV', TIMESTAMP WITH TIME ZONE '2020-06-14T06:00:00-08'),
    -- (:'tournament_name', 'AUT', '', TIMESTAMP WITH TIME ZONE '2020-06-14T09:00:00-08'),
    (:'tournament_name', 'NLD', 'UKR', TIMESTAMP WITH TIME ZONE '2020-06-14T12:00:00-08'),
    -- (:'tournament_name', '', 'CZE', TIMESTAMP WITH TIME ZONE '2020-06-15T06:00:00-08'),
    -- (:'tournament_name', 'POL', '', TIMESTAMP WITH TIME ZONE '2020-06-15T09:00:00-08'),
    (:'tournament_name', 'ESP', 'SWE', TIMESTAMP WITH TIME ZONE '2020-06-15T12:00:00-08'),
    -- (:'tournament_name', '', 'PRT', TIMESTAMP WITH TIME ZONE '2020-06-16T09:00:00-08'),
    (:'tournament_name', 'FRA', 'DEU', TIMESTAMP WITH TIME ZONE '2020-06-16T12:00:00-08'),
    (:'tournament_name', 'FIN', 'RUS', TIMESTAMP WITH TIME ZONE '2020-06-17T06:00:00-08'),
    (:'tournament_name', 'TUR', 'WAL', TIMESTAMP WITH TIME ZONE '2020-06-17T09:00:00-08'),
    (:'tournament_name', 'ITA', 'SWE', TIMESTAMP WITH TIME ZONE '2020-06-17T12:00:00-08'),
    -- (:'tournament_name', 'UKR', '', TIMESTAMP WITH TIME ZONE '2020-06-18T06:00:00-08'),
    (:'tournament_name', 'DNK', 'BEL', TIMESTAMP WITH TIME ZONE '2020-06-18T09:00:00-08'),
    (:'tournament_name', 'NLD', 'AUT', TIMESTAMP WITH TIME ZONE '2020-06-18T12:00:00-08'),
    -- (:'tournament_name', 'SWE', '', TIMESTAMP WITH TIME ZONE '2020-06-19T06:00:00-08'),
    (:'tournament_name', 'HRV', 'CZE', TIMESTAMP WITH TIME ZONE '2020-06-19T09:00:00-08'),
    -- (:'tournament_name', 'ENG', '', TIMESTAMP WITH TIME ZONE '2020-06-19T12:00:00-08'),
    -- (:'tournament_name', '', 'FRA', TIMESTAMP WITH TIME ZONE '2020-06-20T06:00:00-08'),
    (:'tournament_name', 'PRT', 'DEU', TIMESTAMP WITH TIME ZONE '2020-06-20T09:00:00-08'),
    (:'tournament_name', 'ESP', 'POL', TIMESTAMP WITH TIME ZONE '2020-06-20T12:00:00-08'),
    (:'tournament_name', 'ITA', 'WAL', TIMESTAMP WITH TIME ZONE '2020-06-21T09:00:00-08'),
    (:'tournament_name', 'CHE', 'TUR', TIMESTAMP WITH TIME ZONE '2020-06-21T09:00:00-08'),
    (:'tournament_name', 'UKR', 'AUT', TIMESTAMP WITH TIME ZONE '2020-06-22T09:00:00-08'),
    -- (:'tournament_name', '', 'NLD', TIMESTAMP WITH TIME ZONE '2020-06-22T09:00:00-08'),
    (:'tournament_name', 'RUS', 'DNK', TIMESTAMP WITH TIME ZONE '2020-06-22T12:00:00-08'),
    (:'tournament_name', 'FIN', 'BEL', TIMESTAMP WITH TIME ZONE '2020-06-22T12:00:00-08'),
    -- (:'tournament_name', 'HRV', '', TIMESTAMP WITH TIME ZONE '2020-06-23T12:00:00-08'),
    (:'tournament_name', 'CZE', 'ENG', TIMESTAMP WITH TIME ZONE '2020-06-23T12:00:00-08'),
    (:'tournament_name', 'SWE', 'POL', TIMESTAMP WITH TIME ZONE '2020-06-24T09:00:00-08'),
    -- (:'tournament_name', '', 'ESP', TIMESTAMP WITH TIME ZONE '2020-06-24T09:00:00-08'),
    (:'tournament_name', 'POR', 'FRA', TIMESTAMP WITH TIME ZONE '2020-06-24T12:00:00-08')
    -- (:'tournament_name', 'DEU', '', TIMESTAMP WITH TIME ZONE '2020-06-24T12:00:00-08')
)
INSERT INTO fixtures
   (tournament_id, home_team, away_team, kickoff)
SELECT
    tournaments.id, home.id, away.id, ins.kickoff
FROM ins
  JOIN tournaments ON ins.tournament_name = tournaments.name
  JOIN tournament_participants home ON home.country_id = ins.home_country
  JOIN tournament_participants away ON away.country_id = ins.away_country;