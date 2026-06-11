import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const cookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  secure: false,
};

const loginCookieOptions = {
  ...cookieOptions,
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

const getPublicUser = (user) => {
  const userInfo = user.toObject();
  delete userInfo.password;
  return userInfo;
};

export const registerUser = async (req, res) => {
  try {
    const username = req.body.username?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;
    const avatar = req.body.avatar?.trim();

    if (!username || !email || !password) {
      return res.status(400).json({ msg: 'Username, email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar: avatar || undefined,
    });

    return res.status(201).json(getPublicUser(newUser));
  } catch (error) {
    console.error(error.message);

    if (error.code === 11000) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    return res.status(500).json({
      msg: 'Server Error',
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const username = req.body.username?.trim();
  const password = req.body.password;

  try {
    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password are required' });
    }

    const user = await User.findOne({
      $or: [{ username }, { email: username.toLowerCase() }],
    });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '7d' },
    );

    res.cookie('token', token, loginCookieOptions);
    return res.status(200).json(getPublicUser(user));
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      msg: 'Server Error',
      error: error.message,
    });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie('token', cookieOptions);
  return res.status(200).json({ msg: 'Logged out successfully' });
};
