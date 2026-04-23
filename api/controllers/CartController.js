import db from '../config/db.js';
import Order from '../models/Order.js';

export const getProducts = (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products').all();
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createOrder = (req, res) => {
  const { userId, items, total } = req.body;
  
  try {
    const transaction = db.transaction(() => {
      const orderId = Order.create(userId, total);
      Order.addItems(orderId, items);
      return orderId;
    });
    
    const orderId = transaction();
    res.status(201).json({ success: true, orderId, message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
