import Database from 'better-sqlite3';

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
  
  // Educational
  insert.run('Solar System Discovery Kit', 45.99, 'Interactive solar system model with STEM learning guide.', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600', 'Educational', 4.8, '6-8', 1, 0);
  insert.run('Magnetic Building Tiles', 34.50, '50-piece 3D magnetic building set for creative construction.', 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&q=80&w=600', 'STEM', 4.9, '3-5', 0, 1);
  
  // Soft Toys
  insert.run('Eco-Friendly Teddy Bear', 22.00, 'Hand-stitched plush bear made from 100% recycled materials.', 'https://images.unsplash.com/photo-1559440666-4477c288d8db?auto=format&fit=crop&q=80&w=600', 'Soft Toys', 5.0, '0-2', 1, 0);
  insert.run('Giant Plush Dinosaur', 55.00, 'Soft and cuddly dinosaur friend for endless hugs.', 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=600', 'Soft Toys', 4.7, '3-5', 0, 1);

  // STEM
  insert.run('Coding Caterpillar', 49.00, 'Learn basic coding logic with this interactive musical caterpillar.', 'https://images.unsplash.com/photo-1531210609132-5d7ad3109a1c?auto=format&fit=crop&q=80&w=600', 'STEM', 4.8, '3-5', 1, 0);
  insert.run('Junior Microscope Set', 29.99, 'Beginner microscope with 10 slides and experiment manual.', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600', 'Educational', 4.6, '6-8', 0, 1);

  // Outdoor
  insert.run('Explorer Backyard Tent', 39.99, 'Pop-up tent for outdoor adventures and indoor hideouts.', 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600', 'Outdoor', 4.9, '3-5', 1, 0);
}

export default db;
