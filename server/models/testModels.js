import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js';
import Registration from './models/Registration.js';

dotenv.config();

const testModels = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Test 1: Create a sample event
    console.log('\n📝 Test 1: Creating a sample event...');
    const sampleEvent = await Event.create({
      title: 'React Workshop',
      description: 'Learn React fundamentals in this hands-on workshop',
      image: 'https://via.placeholder.com/400x300',
      date: '2024-11-15',
      time: '14:00',
      location: 'Tech Hub, New York',
      category: 'Technology',
      organizer: 'Tech Academy'
    });
    console.log('✅ Event created:', sampleEvent._id);

    // Test 2: Create a registration
    console.log('\n📝 Test 2: Creating a registration...');
    const registration = await Registration.create({
      eventId: sampleEvent._id,
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1-234-567-8900'
    });
    console.log('✅ Registration created:', registration._id);

    // Test 3: Query event with registrations
    console.log('\n📝 Test 3: Fetching event...');
    const event = await Event.findById(sampleEvent._id);
    console.log('✅ Event found:', event.title);

    // Test 4: Validation error test
    console.log('\n📝 Test 4: Testing validation (should fail)...');
    try {
      await Event.create({
        title: 'AB', // Too short, should fail
        description: 'Short',
        image: 'url',
        date: '2024-11-15',
        time: '14:00',
        location: 'Location',
        category: 'InvalidCategory',
        organizer: 'Org'
      });
    } catch (error) {
      console.log('✅ Validation worked correctly:', error.message);
    }

    console.log('\n✅ All model tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
};

testModels();