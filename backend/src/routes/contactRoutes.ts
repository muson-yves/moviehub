import { Router } from 'express';
import * as contactController from '../controllers/contactController.js';

const router = Router();

// GET routes
router.get('/stats', contactController.getContactStats);
router.get('/:id', contactController.getContactMessageById);
router.get('/', contactController.getContactMessages);

// POST route
router.post('/', contactController.submitContactForm);

// PUT route
router.put('/:id', contactController.updateContactMessageStatus);

// DELETE route
router.delete('/:id', contactController.deleteContactMessage);

export default router;
