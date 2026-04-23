import express from 'express';
import { getProducts, createOrder } from '../controllers/CartController.js';

const router = express.Router();

router.get('/products', getProducts);
router.post('/checkout', createOrder);

export default router;
