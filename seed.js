const { db } = require('./server/db/db');
const { User } = require('./server/db/models');

const seed = async () => {
  try {
    await db.sync({ force: true });
    await User.create({
      email: 'cody@email.com',
      password: '12345',
      imageUrl: '/cody.png',
    });
    console.log(`
      Seed success!
    `);
    db.close();
  } catch (err) {
    console.error(`
      Oh noes!
    `);
    console.error(err.stack);
    db.close();
  }
};

seed();
