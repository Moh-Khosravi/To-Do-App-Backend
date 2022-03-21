import ToDo from '../models/ToDo.model.js';
import { validationResult } from 'express-validator';

// get ToDos

export async function getToDo(req, res) {
  const id = req.params.id;
  const oneToDo = await ToDo.findById(id);

  if (!oneToDo || oneToDo.length === 0 || oneToDo === undefined) {
    return res.status(404).json({ message: 'No ToDo found' });
  }

  res.status(200).send(oneToDo);
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

// update ToDo

export async function updateToDo(req, res) {
  const updatedToDo = req.body;
  const id = req.params.id;

  if (!updatedToDo || Object.keys(updatedToDo).length === 0) {
    res.status(400).send('No user provided');
    return;
  }

  try {
    await ToDo.findOneAndUpdate({ _id: id }, updatedToDo);
    res.status(200).send('ToDo updated');
  } catch (err) {
    res.status(400).send(err);
    return;
  }
}

// delete ToDo

export async function deleteToDo(req, res) {
  const id = req.params.id;

  try {
    await ToDo.findByIdAndDelete(id);
    res.status(200).send('To do deleted');
  } catch (err) {
    res.status(400).send(err);
    return;
  }
}
