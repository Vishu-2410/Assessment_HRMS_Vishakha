import User from './models/User.js';

export const seedHR = async () => {
  const hrExists = await User.findOne({ email: 'hr@optico.com' });
  if (!hrExists) {
    const hr = new User({
      email: 'hr@optico.com',
      password: 'Hrms@123',
      role: 'HR'
    });
    await hr.save();
    console.log('Seeded HR user: hr@optico.com / Hrms@123');
  }
};
