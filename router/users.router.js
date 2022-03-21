import { Router } from 'express';
import { body } from 'express-validator';
import {
  getUser,
  postUser,
  updateUser,
  deleteUser,
  login,
  register,
} from '../controller/users.controller.js';

const routerUsers = new Router();

routerUsers
  .route('/')
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
    postUser
  );

routerUsers.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

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
