const router = require('express').Router();
const { User } = require('../db/models');
// const googleOAuthRouter = require('./oauth');
module.exports = router;

// router.use('/google', googleOAuthRouter);

// POST /auth/login
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      console.log('No such user found: ', req.body.email);
      res.Status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user: ', req.body.password);
      res.status(401).send('Wrong email and/or password');
    } else {
      req.login(user, (error) => (error ? next(error) : res.json(user)));
    }
  } catch (error) {
    next(error);
  }
});

// POST /auth/signup
router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, (error) => (error ? next(error) : res.json(user)));
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(error);
    }
  }
});

// DELETE /auth/logout
router.delete('/logout', (req, res) => {
  // remove user id from session
  req.logout();
  req.session.destroy();
  res.sendStatus(204).redirect('/');
});

// GET /auth/me
router.get('/me', (req, res) => {
  res.json(req.user);
});
