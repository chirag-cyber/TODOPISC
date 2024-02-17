const db = require('./db');

const User = {
  findByEmail: async (email) => {
    try {
      const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      return user.rows[0];
    } catch (err) {
      throw err;
    }
  },
  createUser: async (userData) => {
    try {
      const { email, hashedPassword } = userData;
      const newUser = await db.query('INSERT INTO users (email, hashed_password) VALUES ($1, $2) RETURNING *', [email, hashedPassword]);
      return newUser.rows[0];
    } catch (err) {
      throw err;
    }
  }
};

module.exports = { User };
