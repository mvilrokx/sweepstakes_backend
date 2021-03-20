SELECT *
  FROM users
 WHERE email = lower(${email})
