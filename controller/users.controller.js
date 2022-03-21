import User from '../models/users.model.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// get User

export async function getUser(req, res) {
  const id = req.params.id;
  const user = await User.findById(id).populate('todos');

  if (user === undefined) {
    res.status(400).send('User not found');
    return;
  }

  res.status(200).json(user);
}

// update User

export async function updateUser(req, res) {
  const updatedUser = req.body;
  const id = req.params.id;

  if (!updatedUser || Object.keys(updatedUser).length === 0) {
    res.status(400).send('No user provided');
    return;
  }

  try {
    await User.findOneAndUpdate({ _id: id }, updatedUser);
    res.status(200).send('User updated');
  } catch (err) {
    res.status(400).send(err);
    return;
  }
}

// delete User
// später müssen alle seine ToDos mit gelöscht werden

export async function deleteUser(req, res) {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).send('User deleted');
  } catch (err) {
    res.status(400).send(err);
    return;
  }
}

// login

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  try {
    if (!user) {
      res.status(400).send('User not found');
      return;
    }
    const newPassword = await bcrypt.compare(password, user.password);
    if (newPassword === true) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT_KEY);
      res.status(200).json({
        message: 'Login successful',
        token: token,
      });
    } else {
      res.status(400).send('Password incorrect');
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

// register

export async function register(req, res) {
  const { firstName, lastName, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).send('User already exists');
    return;
  }
  const newPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      firstName,
      lastName,
      email,
      password: newPassword,
    });
    res.status(201).send('User created');
  } catch (err) {
    res.status(400).send(err);
  }
}
