import db from '../config/db.js';

export default {
  findByEmail: (email) => db.prepare('SELECT * FROM users WHERE email = ?').get(email),
  create: (name, email, password) => {
    const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
    return stmt.run(name, email, password);
  }
};
