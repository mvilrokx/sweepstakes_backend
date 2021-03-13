\set content `cat /docker-entrypoint-initdb.d/tournaments.json`
create temp table tournaments_data ( data jsonb );
insert into tournaments_data values (:'content');

DO $$
  DECLARE
    returned_tournament_id integer;
    returned_group_id integer;
    returned_home_id integer;
    returned_away_id integer;
    current_tournament text := '';
    previous_tournament text := '';
    current_group text := '';
    previous_group text := '';

    cur_tournaments CURSOR FOR
        -- This can probably be written more compact but haven't figured out how yet: https://stackoverflow.com/a/40121233
        SELECT tournament_name, tournament_starts_at, tournament_ends_at, group_name, fixtures ->> 'home' as home, fixtures ->> 'away' as away, fixtures ->> 'kickoff' as kickoff
        FROM (
            SELECT tournament_name, tournament_starts_at, tournament_ends_at, groups ->> 'name' as group_name, jsonb_array_elements(groups -> 'fixtures') as fixtures
            FROM (
                SELECT 
                    tournaments ->> 'name' as tournament_name,
                    tournaments ->> 'start_date' as tournament_starts_at,
                    tournaments ->> 'end_date' as tournament_ends_at,
                    jsonb_array_elements(tournaments -> 'groups') as groups
                FROM ( 
                    SELECT jsonb_array_elements(data) as tournaments FROM tournaments_data
                ) s
            ) s
        ) s;

  BEGIN

    FOR rec IN cur_tournaments LOOP
        
        current_tournament := rec.tournament_name;
        current_group := rec.group_name;

        IF current_tournament <> previous_tournament THEN
            BEGIN
                INSERT INTO tournaments 
                    (name, starts_at, ends_at) 
                VALUES (rec.tournament_name, rec.tournament_starts_at::TIMESTAMP WITH TIME ZONE, rec.tournament_ends_at::TIMESTAMP WITH TIME ZONE)
                ON CONFLICT (name) DO UPDATE
                    SET starts_at = excluded.starts_at, 
                        ends_at = excluded.ends_at
                RETURNING id INTO returned_tournament_id;        
            END;    
        END IF;

        IF current_group <> previous_group THEN
            BEGIN
                INSERT INTO tournament_groups
                    (name, tournament_id)
                VALUES 
                    (rec.group_name, returned_tournament_id)
                ON CONFLICT ON CONSTRAINT tournament_groups_tournament_id_name_key DO NOTHING
                RETURNING id INTO returned_group_id;
            END;    
        END IF;

        INSERT INTO tournament_participants
           (group_id, tournament_id, country_id)
        VALUES
           (returned_group_id, returned_tournament_id, rec.home)
        ON CONFLICT ON CONSTRAINT tournament_participants_tournament_id_country_id_key DO UPDATE
            SET country_id = excluded.country_id
        RETURNING id INTO returned_home_id;

        INSERT INTO tournament_participants
           (group_id, tournament_id, country_id)
        VALUES
           (returned_group_id, returned_tournament_id, rec.away)
        ON CONFLICT ON CONSTRAINT tournament_participants_tournament_id_country_id_key DO UPDATE
            SET country_id = excluded.country_id
        RETURNING id INTO returned_away_id;

        INSERT INTO fixtures
            (tournament_id, home_team, away_team, kickoff)
        VALUES
           (returned_tournament_id, returned_home_id, returned_away_id, rec.kickoff::TIMESTAMP WITH TIME ZONE);

        previous_group := current_group;
        previous_tournament := current_tournament;

    END LOOP;
  END;

$$ LANGUAGE plpgsql;