import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required']
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name must not exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      minlength: [10, 'Phone must be at least 10 characters'],
      maxlength: [20, 'Phone must not exceed 20 characters'],
      match: [/^[0-9\-\+\(\)\s]+$/, 'Phone must contain only numbers and formatting characters']
    }
  },
  {
    timestamps: true
  }
);

const Registration = mongoose.model('Registration', registrationSchema);
export default Registration;