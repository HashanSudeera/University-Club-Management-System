import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import getNextSequence from './utils/generateId.js'; 

import User from './models/User.js';
import Membership from './models/Membership.js';
import Club from './models/ClubPage.js'; // Ensure this matches your actual file name
import ClubPost from './models/ClubPost.js';
import Event from './models/Event.js';
import EventRegister from './models/EventRegister.js';
import Announcement from './models/Announcement.js';
import Notification from './models/Notification.js';
import Counter from './models/Counter.js';
import { MONGO_URL } from './config.js'; 

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB connected successfully.');

    // 1. Clear existing collections
    await Promise.all([
      User.deleteMany({}), Membership.deleteMany({}), Club.deleteMany({}),
      ClubPost.deleteMany({}), Event.deleteMany({}), EventRegister.deleteMany({}),
      Announcement.deleteMany({}), Notification.deleteMany({}), Counter.deleteMany({}) 
    ]);
    console.log('Existing data and custom ID counters cleared.');

    // Encrypted password storage[cite: 1]
    const hashedPassword = await bcrypt.hash('Ict@12345', 10); 

    // 2. Generate Custom IDs for 9 Dummy Users
    const uIds = await Promise.all(Array.from({ length: 9 }).map(() => getNextSequence('user_id', 'USR')));

    // 3. Create 9 Dummy Users (1 Uni Admin, 3 Club Admins, 5 Club Members)[cite: 1]
    const createdUsers = await User.create([
      // UNI ADMIN (1)
      {
        user_id: uIds[0], firstName: 'Alice', lastName: 'System', 
        email: 'ua@gmail.com', address: 'Colombo', password: hashedPassword, 
        academicYear: '4th Year', role: 'Uni Admin' 
      },
      // CLUB ADMINS (3)
      {
        user_id: uIds[1], firstName: 'Bob', lastName: 'Builder', 
        email: 'ca1@gmail.com', address: 'Galle', password: hashedPassword, 
        academicYear: '3rd Year', role: 'Club Admin' 
      },
      {
        user_id: uIds[2], firstName: 'Charlie', lastName: 'Chaplin', 
        email: 'ca2@gmail.com', address: 'Kandy', password: hashedPassword, 
        academicYear: '2nd Year', role: 'Club Admin' 
      },
      {
        user_id: uIds[3], firstName: 'Diana', lastName: 'Prince', 
        email: 'ca3@gmail.com', address: 'Matara', password: hashedPassword, 
        academicYear: '3rd Year', role: 'Club Admin' 
      },
      // CLUB MEMBERS (5)
      {
        user_id: uIds[4], firstName: 'Ethan', lastName: 'Hunt', 
        email: 'cm1@gmail.com', address: 'Colombo', password: hashedPassword, 
        academicYear: '1st Year', role: 'Club Member' 
      },
      {
        user_id: uIds[5], firstName: 'Fiona', lastName: 'Gallagher', 
        email: 'cm2@gmail.com', address: 'Gampaha', password: hashedPassword, 
        academicYear: '1st Year', role: 'Club Member' 
      },
      {
        user_id: uIds[6], firstName: 'George', lastName: 'Smith', 
        email: 'cm3@gmail.com', address: 'Negombo', password: hashedPassword, 
        academicYear: '2nd Year', role: 'Club Member' 
      },
      {
        user_id: uIds[7], firstName: 'Hannah', lastName: 'Abbott', 
        email: 'cm4@gmail.com', address: 'Jaffna', password: hashedPassword, 
        academicYear: '1st Year', role: 'Club Member' 
      },
      {
        user_id: uIds[8], firstName: 'Ian', lastName: 'Malcolm', 
        email: 'cm5@gmail.com', address: 'Kandy', password: hashedPassword, 
        academicYear: '1st Year', role: 'Club Member' 
      }
    ]);

    const [uniAdmin, ca1, ca2, ca3, cm1, cm2, cm3, cm4, cm5] = createdUsers;

    // 4. Generate IDs & Create Clubs
    const c1 = await getNextSequence('club_id', 'CLB');
    const c2 = await getNextSequence('club_id', 'CLB');
    
    const createdClubs = await Club.create([
      { club_id: c1, club_name: 'Robotics Society', category: 'Technology', status: 'aproved' },
      { club_id: c2, club_name: 'Chess Club', category: 'Sports', status: 'aproved' }
    ]);
    const [techClub, sportsClub] = createdClubs;

    // 5. Generate IDs & Create Cross-Relationships (Memberships)
    // 5. Generate IDs & Create Cross-Relationships (Memberships)
    const membershipsData = [
      { membership_id: await getNextSequence('membership_id', 'MEM'), user_id: ca1._id, club_id: techClub._id, club_role: 'President' },
      { membership_id: await getNextSequence('membership_id', 'MEM'), user_id: ca2._id, club_id: sportsClub._id, club_role: 'President' },
      { membership_id: await getNextSequence('membership_id', 'MEM'), user_id: ca3._id, club_id: techClub._id, club_role: 'Secretary' },
      { membership_id: await getNextSequence('membership_id', 'MEM'), user_id: cm1._id, club_id: techClub._id, club_role: 'Member' },
      { membership_id: await getNextSequence('membership_id', 'MEM'), user_id: cm2._id, club_id: techClub._id, club_role: 'Member' },
      { membership_id: await getNextSequence('membership_id', 'MEM'), user_id: cm3._id, club_id: sportsClub._id, club_role: 'Member' },
      { membership_id: await getNextSequence('membership_id', 'MEM'), user_id: cm4._id, club_id: sportsClub._id, club_role: 'Member' },
      { membership_id: await getNextSequence('membership_id', 'MEM'), user_id: cm5._id, club_id: techClub._id, club_role: 'Member' }
    ];
    const createdMemberships = await Membership.create(membershipsData);

    // 6. Generate Events, Registrations, Announcements, Posts & Notifications
    const event = await Event.create({
      event_id: await getNextSequence('event_id', 'EVT'),
      title: 'Annual Robotics Hackathon',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      location: 'Main Hall',
      capacity: 50,
      participants: [cm1._id, cm2._id],
      status: 'Ongoing',
      type: 'register'
    });

    await EventRegister.create([
      { eventReg_id: await getNextSequence('eventReg_id', 'REG'), user_id: cm1._id, addons: { tshirt_size: 'M' } },
      { eventReg_id: await getNextSequence('eventReg_id', 'REG'), user_id: cm2._id, addons: { tshirt_size: 'L' } }
    ]);

    const announcement = await Announcement.create({
      announcement_id: await getNextSequence('announcement_id', 'ANN'),
      title: 'Welcome to the New Semester!',
      description: 'Discover and join extracurricular activities.',
      category: 'General'
    });

    const post = await ClubPost.create({
      post_id: await getNextSequence('post_id', 'PST'),
      post_title: 'Hackathon Prep Meeting',
      description: 'Join us this Friday to prepare for the upcoming hackathon!',
      post_image: 'https://example.com/robotics.jpg'
    });

    const notification = await Notification.create({
      notifi_id: await getNextSequence('notifi_id', 'NTF'),
      recipient: 'club',
      sender: uniAdmin._id,
      club: techClub._id,
      type: 'CLUB_EVENT',
      title: 'Hackathon Approved',
      message: 'The Annual Robotics Hackathon has been approved by the University Admin.',
      referenceId: event._id
    });

    // 7. Update References for Clubs & Users
    techClub.membership.push(createdMemberships[0]._id, createdMemberships[2]._id, createdMemberships[3]._id, createdMemberships[4]._id, createdMemberships[7]._id);
    techClub.event.push(event._id);
    techClub.announcement.push(announcement._id);
    techClub.club_post.push(post._id);
    
    sportsClub.membership.push(createdMemberships[1]._id, createdMemberships[5]._id, createdMemberships[6]._id);
    
    await techClub.save();
    await sportsClub.save();

    // Assigning clubs back to the users array
    ca1.clubs.push(techClub._id); await ca1.save();
    ca2.clubs.push(sportsClub._id); await ca2.save();
    ca3.clubs.push(techClub._id); await ca3.save();
    cm1.clubs.push(techClub._id); await cm1.save();
    cm2.clubs.push(techClub._id); await cm2.save();
    cm3.clubs.push(sportsClub._id); await cm3.save();
    cm4.clubs.push(sportsClub._id); await cm4.save();
    cm5.clubs.push(techClub._id); await cm5.save();

    console.log('✅ Dummy data successfully seeded! 1 Uni Admin, 3 Club Admins, and 5 Club Members added and fully linked.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();