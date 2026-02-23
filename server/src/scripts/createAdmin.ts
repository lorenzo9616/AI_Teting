import sequelize from '../config/database';
import { User } from '../models';

const createAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');

    // Create Admin User
    const admin = await User.create({
      name: 'Admin 2',
      email: 'admin2@restaurant.com',
      password: 'p@ssw0rd',
      role: 'admin',
      plan: 'pro',
      area: 'Office'
    });

    console.log('Admin user created:', admin.email);

  } catch (err: any) {
    if (err.name === 'SequelizeUniqueConstraintError') {
        console.error('User already exists!');
    } else {
        console.error('Error creating admin:', err);
    }
  } finally {
    process.exit();
  }
};

createAdmin();
