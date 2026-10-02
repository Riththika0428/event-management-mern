import Event from '../models/Event.js';

// Get all events with search and filter
export const getAllEvents = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    
    // Build filter object
    let filter = {};
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) {
      filter.category = category;
    }
    
    const events = await Event.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: 'Events fetched successfully',
      count: events.length,
      data: events
    });
  } catch (error) {
    next(error);
  }
};

// Get single event by ID
export const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Event fetched successfully',
      data: event
    });
  } catch (error) {
    next(error);
  }
};

// Create new event
export const createEvent = async (req, res, next) => {
  try {
    const { title, description, image, date, time, location, category, organizer } = req.body;
    
    // Validate required fields
    if (!title || !description || !image || !date || !time || !location || !category || !organizer) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }
    
    const event = await Event.create({
      title,
      description,
      image,
      date,
      time,
      location,
      category,
      organizer
    });
    
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event
    });
  } catch (error) {
    next(error);
  }
};

// Update event
export const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const event = await Event.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: event
    });
  } catch (error) {
    next(error);
  }
};

// Delete event
export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findByIdAndDelete(id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
      data: event
    });
  } catch (error) {
    next(error);
  }
};