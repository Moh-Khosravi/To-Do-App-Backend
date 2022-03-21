import { Router } from 'express';
import { body, check } from 'express-validator';
import { getToDos, postToDo } from '../controller/toDo.controller.js';
import validator from 'validator';

const routerToDo = new Router();

routerToDo
  .route('/')
  .get(getToDos)
  .post(
    body('title').isString().withMessage('Title must be a string'),
    body('startDate')
      .isDate()
      .withMessage('Start date must be a date')
      .optional({ checkFalsy: true, nullable: true }),
    body('endDate')
      .isDate()
      .withMessage('End date must be a date')
      .optional({ checkFalsy: true, nullable: true }),
    check('endDate')
      .custom((value, { req }) => {
        if (
          value &&
          req.body.startDate &&
          validator.isAfter(value, req.body.startDate)
        ) {
          return true;
        }
      })
      .optional({ checkFalsy: true, nullable: true })
      .withMessage('End date must be after start date'),

    postToDo
  );

export default routerToDo;
