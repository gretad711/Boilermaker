'use strict';

const { db } = require('./server/db/db');
// and our server that we already created and used as the previous entry point is 'server.js'
const app = require('./server');
const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!

const sync = async () => {
  try {
    await db.sync();
    app.listen(port, function () {
      console.log('Knock, knock');
      console.log("Who's there?");
      console.log(`Your server, listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

sync();
