import Registration from '../models/Registration.js';
import Event from '../models/Event.js';

// Register user for event
export const registerForEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fullName, email, phone } = req.body;
    
    // Validate required fields
    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide fullName, email, and phone'
      });
    }
    
    // Check if event exists
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    // Create registration
    const registration = await Registration.create({
      eventId: id,
      fullName,
      email,
      phone
    });
    
    res.status(201).json({
      success: true,
      message: 'Successfully registered for the event',
      data: registration
    });
  } catch (error) {
    next(error);
  }
};

// Get registrations for an event (optional, for testing)
export const getEventRegistrations = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if event exists
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    const registrations = await Registration.find({ eventId: id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: 'Registrations fetched successfully',
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    next(error);
  }
};