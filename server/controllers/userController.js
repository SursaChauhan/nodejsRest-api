import asyncHandler from 'express-async-handler';
import jwt from "jsonwebtoken";

// Your code continues here...

import {User} from '../models/user.js';
import { Admin } from '../models/user.js';
import generateToken from '../util/generateToken.js';
import bcrypt from 'bcrypt';
import Lecture from '../models/lectures.js';

//authAdmin

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email: email });
    console.log("Admin",admin)

    if (!admin) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const isPasswordMatch = await new Promise((resolve, reject) => {
      bcrypt.compare(password, admin.password, function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (isPasswordMatch) {
      const token = jwt.sign({ userId: admin._id }, 'sursa', { expiresIn: '1h' });
      res.status(200).json({ 
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        // isAdmin: user.isAdmin,
        token: token, });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//authUser
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    console.log("user",user)

    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    const isPasswordMatch = await new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (isPasswordMatch) {
      const token = jwt.sign({ userId: user._id }, 'sursa', { expiresIn: '1h' });
      res.status(200).json({ 
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
      course:user.course });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password ,course} = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400); //Bad request
    throw new Error('User already exists');
  }
  const hash = await bcrypt.hash(password, 5);

  // Create the user with the hashed password
  const user = await User.create({
    name: name,
    email: email,
    password: hash,
    course:course
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      msg:"hey welocome user"
    }); // something created
    console.log("user created");
  } else {
    res.status(400);
    throw new Error('Invalid user data');
   }
 });

//private route

//admin
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await Admin.findOne({ email: email });

  if (userExists) {
    res.status(400); //Bad request
    throw new Error('Admin already exists');
  }
  const hash = await bcrypt.hash(password, 5);

  // Create the user with the hashed password
  const user = await Admin.create({
    name: name,
    email: email,
    password: hash,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      msg:"hey welocome Admin"
    }); 
    // something created
    console.log("user created");
  } else {
    res.status(400);
    throw new Error('Invalid user data');
   }
 });

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


const getLectures = (async (req, res) => {
  try {
    const { courseId } = req.params;

    // Query the database for lectures with the given courseId
    const lectures = await Lecture.find({ courseId });

    // Return the lectures as a response
    res.json({ lectures });
  } catch (error) {
    console.error('Error fetching lectures:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
  registerAdmin,
  authAdmin,getLectures
};
