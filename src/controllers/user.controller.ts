import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';
import { generateToken } from '../utils/jwt';

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ username, password: hashedPassword });

  res.status(201).json({
    _id: user._id,
    username: user.username,
    token: generateToken(user._id.toString()),
  });
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide both username and password' });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id.toString()),
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// export const loginUser = async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   const user = await User.findOne({ username });
//   if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//   res.json({
//     _id: user._id,
//     username: user.username,
//     token: generateToken(user._id.toString()),
//   });
// };

export const getUserProfile = async (req: Request, res: Response) => {
  const user = await User.findById((req as any).user).select('-password');
  res.json(user);
};
