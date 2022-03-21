import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import routerUsers from './router/users.router.js';
import routerToDo from './router/toDo.router.js';
import { auth } from './middleware/AuthMiddleware.js';

const corsOption = {
  origin: process.env.ORIGIN_URL,
  Credentials: true,
  optionsSuccessStatus: 200,
};

const PORT = process.env.PORT || 4000;
const uri = process.env.URI_DB;

mongoose.connect(uri, (err) => {
  if (err) console.log(err);
  console.log('Connected to DB');
});

const app = express();

app.use(express.json());

app.use(cors(corsOption));

app.use(auth());

app.use('/users', routerUsers);
app.use('/ToDos', routerToDo);

app.get('/', (req, res) => {
  res.send('Welcome to the Todo App');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
