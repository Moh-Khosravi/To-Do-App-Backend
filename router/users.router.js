import { Router } from 'express';
import { body } from 'express-validator';
import {
  getUser,
  updateUser,
  deleteUser,
  login,
  register,
} from '../controller/users.controller.js';
import { permission } from '../middleware/Permission.js';

const routerUsers = new Router();

routerUsers.route('/');

routerUsers
  .route('/:id')
  .get(permission(), getUser)
  .put(permission(), updateUser)
  .delete(permission(), deleteUser);

routerUsers.route('/login').post(login);
routerUsers
  .route('/register')
  .post(
    body('firstName')
      .isString()
      .isLength({ min: 3, max: 20 })
      .withMessage(
        'First name must be a string and between 3 and 20 characters'
      ),
    body('lastName')
      .isString()
      .isLength({ min: 3, max: 20 })
      .withMessage(
        'Last name must be a string and between 3 and 20 characters'
      ),
    body('email').isEmail().withMessage('Email must be a valid email'),
    register
  );

export default routerUsers;
