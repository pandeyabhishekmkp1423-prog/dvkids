import db from '../config/db.js';

export default {
  create: (parent_name, phone, child_age, message) => {
    const stmt = db.prepare('INSERT INTO admissions (parent_name, phone, child_age, message) VALUES (?, ?, ?, ?)');
    return stmt.run(parent_name, phone, child_age, message);
  },
  getAll: () => db.prepare('SELECT * FROM admissions ORDER BY createdAt DESC').all()
};
