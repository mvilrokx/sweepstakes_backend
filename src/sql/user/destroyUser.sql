DELETE
  FROM users
 WHERE id = ${id}
RETURNING id, email, password, super_admin
