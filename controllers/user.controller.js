const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model')
const authMiddleware = require('../middlewares/auth.middlewares')

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with the provided email' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: hashedPassword
    });
    await user.save();
    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const signin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User does not exist with the provided email' });
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      console.log(isPasswordCorrect)
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Incorrect password' });
      }
      const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({user, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

const satyam = async (req, res) => {
    res.send({meg: "successfull authication completed",
    user: req.user
  })
}

module.exports = { signup, signin, satyam };