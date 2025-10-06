const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../middlewares/errorResponse');

//https://dvmhn07.medium.com/jwt-authentication-in-node-js-a-practical-guide-c8ab1b432a49

exports.registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    return next(new ErrorResponse('Registration failed', 500));
  }
};

exports.registerAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      role: 'admin',
    });
    await user.save();

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    return next(new ErrorResponse('Registration failed', 500));
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return next(new ErrorResponse('Authentication failed', 401));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next(new ErrorResponse('Authentication failed', 401));
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '2h',
      }
    );

    return res
      .cookie('ACCESS_TOKEN', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 2 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ success: true, token });
  } catch (error) {
    return next(new ErrorResponse('Login failed', 500));
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    res.clearCookie('ACCESS_TOKEN', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    return next(new ErrorResponse('Logout failed', 500));
  }
};
