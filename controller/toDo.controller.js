import ToDo from '../models/ToDo.model.js';
import { validationResult } from 'express-validator';

// get ToDos

export async function getToDos(req, res) {
  const listOfToDos = await ToDo.find({});
  if (!listOfToDos || listOfToDos.length === 0 || listOfToDos === undefined) {
    return res.status(404).json({ message: 'No ToDos found' });
  }

  res.status(200).send(listOfToDos);
}

// post ToDo

export async function postToDo(req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const toDo = new ToDo(req.body);
      await toDo.save();
      res.status(200).send(toDo);
    } catch (err) {
      res.status(400).json(err);
      return;
    }
  } else {
    res.status(406).json({
      message: 'Invalid input',
      errors: errors.array(),
    });
  }
}
