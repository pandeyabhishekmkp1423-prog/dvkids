import products from '../../shared/products.js';

export default function handler(req, res) {
  res.status(200).json({ success: true, products });
}
