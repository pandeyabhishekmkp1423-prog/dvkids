import db from '../config/db.js';

export default {
  create: (userId, total) => {
    const stmt = db.prepare('INSERT INTO orders (user_id, total) VALUES (?, ?)');
    return stmt.run(userId, total).lastInsertRowid;
  },
  addItems: (orderId, items) => {
    const stmt = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
    for (const item of items) {
      stmt.run(orderId, item.id, item.quantity, item.price);
    }
  }
};
