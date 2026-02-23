import sequelize from '../config/database';
import { User, Shift, TimeOffRequest, Area } from '../models';

const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');

    // Sync all models (alter: true updates schema if changed)
    await sequelize.sync({ force: true }); // WARNING: force: true drops tables. remove for production
    console.log('Database synced!');

    // Create Areas
    const areas = await Area.bulkCreate([
      { name: 'Kitchen' },
      { name: 'Front of House' },
      { name: 'Bar' },
      { name: 'Office' }
    ]);
    console.log('Areas created:', areas.length);

    // Create Admin User
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@restaurant.com',
      password: 'password123', // Will be hashed by hook
      role: 'admin',
      plan: 'free',
      area: 'Office'
    });

    console.log('Admin user created:', admin.email);

  } catch (err) {
    console.error('Error syncing database:', err);
  } finally {
    process.exit();
  }
};

initDb();
