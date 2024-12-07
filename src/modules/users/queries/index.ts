const createUser = `
INSERT INTO "users" ("username", "password") VALUES ($1,$2) RETURNING *
`

const getAllUsers = `
SELECT * FROM "users"
`

const getUserByUsername = `
SELECT * FROM "users" WHERE "username" = $1
`

export const userQueries = {
  createUser,
  getAllUsers,
  getUserByUsername
}
