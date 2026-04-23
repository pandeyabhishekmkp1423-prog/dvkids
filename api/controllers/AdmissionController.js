import Admission from '../models/Admission.js';

export const submitAdmission = (req, res) => {
  const { parent_name, phone, child_age, message } = req.body;
  
  try {
    Admission.create(parent_name, phone, child_age, message);
    res.json({ success: true, message: 'Admission inquiry submitted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAdmissions = (req, res) => {
  try {
    const admissions = Admission.getAll();
    res.json({ success: true, admissions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
