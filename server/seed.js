import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js';

dotenv.config();

const sampleEvents = [
  {
    title: 'React Developer Workshop',
    description: 'Master React fundamentals, hooks, and component architecture in this comprehensive hands-on workshop. Perfect for beginners and intermediate developers looking to level up their skills.',
    image: 'https://via.placeholder.com/400x300?text=React+Workshop',
    date: '2024-11-20',
    time: '14:00',
    location: 'Tech Hub, New York, NY',
    category: 'Technology',
    organizer: 'Tech Academy'
  },
  {
    title: 'Startup Networking Event',
    description: 'Connect with founders, investors, and entrepreneurs in a casual networking environment. Share ideas, find co-founders, and explore potential partnerships in the startup ecosystem.',
    image: 'https://via.placeholder.com/400x300?text=Networking+Event',
    date: '2024-11-22',
    time: '18:00',
    location: 'Innovation Center, San Francisco, CA',
    category: 'Business',
    organizer: 'Startup Hub'
  },
  {
    title: 'UI/UX Design Workshop',
    description: 'Learn modern design principles, user research methods, and industry best practices. This workshop covers wireframing, prototyping, and designing for accessibility.',
    image: 'https://via.placeholder.com/400x300?text=Design+Workshop',
    date: '2024-11-25',
    time: '10:00',
    location: 'Creative Studios, Austin, TX',
    category: 'Workshop',
    organizer: 'Design Institute'
  },
  {
    title: 'Digital Marketing Seminar',
    description: 'Explore SEO, content marketing, social media strategies, and paid advertising. Learn how to build a comprehensive digital marketing strategy for your business.',
    image: 'https://via.placeholder.com/400x300?text=Marketing+Seminar',
    date: '2024-11-28',
    time: '15:00',
    location: 'Business Park, Chicago, IL',
    category: 'Business',
    organizer: 'Marketing Experts Inc'
  },
  {
    title: 'Technology Conference 2024',
    description: 'Join industry leaders for keynote speeches, panel discussions, and networking sessions. Discover the latest trends in AI, cloud computing, cybersecurity, and web development.',
    image: 'https://via.placeholder.com/400x300?text=Tech+Conference',
    date: '2024-12-01',
    time: '09:00',
    location: 'Convention Center, Seattle, WA',
    category: 'Technology',
    organizer: 'Tech Events Global'
  },
  {
    title: 'Career Development Workshop',
    description: 'Develop essential professional skills including resume writing, interview preparation, and personal branding. Learn how to advance your career and negotiate better opportunities.',
    image: 'https://via.placeholder.com/400x300?text=Career+Workshop',
    date: '2024-12-03',
    time: '13:00',
    location: 'Career Center, Boston, MA',
    category: 'Education',
    organizer: 'Career Coaches Academy'
  },
  {
    title: 'Web Development Bootcamp',
    description: 'Intensive bootcamp covering HTML, CSS, JavaScript, and modern frameworks. Build real-world projects and prepare for a career in web development with hands-on training.',
    image: 'https://via.placeholder.com/400x300?text=Web+Dev+Bootcamp',
    date: '2024-12-05',
    time: '10:00',
    location: 'Coding Academy, Denver, CO',
    category: 'Education',
    organizer: 'DevBootcamp'
  },
  {
    title: 'Entertainment & Comedy Night',
    description: 'Join us for an evening of stand-up comedy, live music, and entertainment. A fun way to relax and enjoy time with fellow enthusiasts in a vibrant atmosphere.',
    image: 'https://via.placeholder.com/400x300?text=Comedy+Night',
    date: '2024-12-08',
    time: '20:00',
    location: 'Comedy Club, Miami, FL',
    category: 'Entertainment',
    organizer: 'Entertainment Events Co'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing events
    console.log('\n🗑️  Clearing existing events...');
    await Event.deleteMany({});
    console.log('✅ Old events cleared');

    // Insert sample events
    console.log('\n📝 Adding sample events...');
    const insertedEvents = await Event.insertMany(sampleEvents);
    console.log(`✅ ${insertedEvents.length} events added successfully!\n`);

    // Display inserted events
    console.log('📋 Sample Events Created:');
    console.log('━'.repeat(80));
    insertedEvents.forEach((event, index) => {
      console.log(`\n${index + 1}. ${event.title}`);
      console.log(`   📅 Date: ${event.date} | ⏰ Time: ${event.time}`);
      console.log(`   📍 Location: ${event.location}`);
      console.log(`   🏷️  Category: ${event.category}`);
      console.log(`   👤 Organizer: ${event.organizer}`);
      console.log(`   🆔 ID: ${event._id}`);
    });

    console.log('\n' + '━'.repeat(80));
    console.log(`\n✅ Database seeded successfully with ${insertedEvents.length} events!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();