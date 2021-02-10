const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcrypt');

// signup
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

// login
router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  // login
})

// the signup form posts to this route
router.post('/signup', (req, res) => {
  // todo
})

router.get('/logout', (req, res) => {
  // todo
})

module.exports = router;