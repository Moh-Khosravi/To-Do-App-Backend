import mongoose from 'mongoose';
const { model, Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('todos', {
  ref: 'ToDo',
  localField: '_id',
  foreignField: 'user',
});

const User = model('User', userSchema, 'users');

export default User;
