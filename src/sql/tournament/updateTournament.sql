UPDATE tournaments
   SET name = ${name},
       starts_at = ${starts_at},
       ends_at = ${ends_at}
 WHERE id = ${id}
RETURNING id, name, starts_at, ends_at
