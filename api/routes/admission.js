import express from 'express';
import { submitAdmission, getAdmissions } from '../controllers/AdmissionController.js';

const router = express.Router();

router.post('/submit', submitAdmission);
router.get('/list', getAdmissions);

export default router;
