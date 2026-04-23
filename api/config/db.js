import Database from 'better-sqlite3';
import products from '../../shared/products.js';

const db = new Database('kidscastle_toy.db');

// Initialize Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS admissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    child_age TEXT NOT NULL,
    message TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    image TEXT,
    category TEXT,
    rating REAL DEFAULT 5.0,
    age_range TEXT,
    best_seller BOOLEAN DEFAULT 0,
    new_arrival BOOLEAN DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    customer_name TEXT,
    customer_email TEXT,
    customer_address TEXT,
    customer_phone TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    price REAL,
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
  );
`);

// Seed some products if empty
const count = db.prepare('SELECT count(*) as count FROM products').get().count;
if (count === 0) {
  const insert = db.prepare('INSERT INTO products (name, price, description, image, category, rating, age_range, best_seller, new_arrival) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');

  for (const product of products) {
    insert.run(
      product.name,
      product.price,
      product.description,
      product.image,
      product.category,
      product.rating,
      product.age_range,
      product.best_seller,
      product.new_arrival
    );
  }
}

export default db;
