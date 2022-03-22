import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const toDoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const ToDO = model('ToDo', toDoSchema, 'todos');

export default ToDO;
