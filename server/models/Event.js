import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title must not exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [1000, 'Description must not exceed 1000 characters']
    },
    image: {
      type: String,
      required: [true, 'Event image URL is required'],
      trim: true
    },
    date: {
      type: String,
      required: [true, 'Event date is required'],
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format']
    },
    time: {
      type: String,
      required: [true, 'Event time is required'],
      match: [/^\d{2}:\d{2}$/, 'Time must be in HH:MM format']
    },
    location: {
      type: String,
      required: [true, 'Event location is required'],
      trim: true,
      minlength: [5, 'Location must be at least 5 characters']
    },
    category: {
      type: String,
      required: [true, 'Event category is required'],
      enum: {
        values: ['Technology', 'Business', 'Education', 'Entertainment', 'Workshop'],
        message: 'Category must be one of: Technology, Business, Education, Entertainment, Workshop'
      }
    },
    organizer: {
      type: String,
      required: [true, 'Organizer name is required'],
      trim: true,
      minlength: [2, 'Organizer name must be at least 2 characters']
    }
  },
  {
    timestamps: true
  }
);

const Event = mongoose.model('Event', eventSchema);
export default Event;