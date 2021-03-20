INSERT INTO users(email, password, super_admin)
VALUES (lower(${email}), ${password}, ${super_admin})
RETURNING id, email, password, super_admin
