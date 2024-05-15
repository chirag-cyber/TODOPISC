const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
  signup: async (req, res) => {
    const { email, password } = req.body;
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create user
      const newUser = await User.createUser({ email, hashedPassword });
      // Generate JWT token
      const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
      res.json({ email: newUser.email, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(404).json({ detail: 'User does not exist!' });
      }
      // Check password
      const isValidPassword = await bcrypt.compare(password, user.hashedPassword);
      if (!isValidPassword) {
        return res.status(401).json({ detail: 'Invalid password' });
      }
      // Generate JWT token
      const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });
      res.json({ email: user.email, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = userController;
