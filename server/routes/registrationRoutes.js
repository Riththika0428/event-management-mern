import express from 'express';
import {
  registerForEvent,
  getEventRegistrations
} from '../controllers/registrationController.js';

const router = express.Router();

// Routes
router.post('/:id/register', registerForEvent);           // POST /api/events/:id/register
router.get('/:id/registrations', getEventRegistrations);  // GET /api/events/:id/registrations

export default router;