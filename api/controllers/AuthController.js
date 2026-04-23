import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'premium_preschool_secret_key_2024';

export const register = (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const info = User.create(name, email, hashedPassword);
    
    const user = { id: info.lastInsertRowid, name, email };
    const token = jwt.sign(user, SECRET, { expiresIn: '24h' });
    
    res.status(201).json({ success: true, user, token });
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

export const login = (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = User.findByEmail(email);
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    const token = jwt.sign(userWithoutPassword, SECRET, { expiresIn: '24h' });
    
    res.json({ success: true, user: userWithoutPassword, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const me = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false });

  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ success: true, user: decoded });
  } catch (err) {
    res.status(401).json({ success: false });
  }
};
