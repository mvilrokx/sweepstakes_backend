UPDATE users
   SET email = lower(${email}),
       password = ${password},
       super_admin = ${super_admin}
 WHERE id = ${id}
RETURNING id, email, password, super_admin
