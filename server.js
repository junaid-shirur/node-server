const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const connectDB = require('./db')

dotenv.config({ path: '.env' })

const port = process.env.PORT || 3000
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if (whitelist.includes(origin))
      return callback(null, true)

    callback(new Error('Not allowed by CORS'));
  }
}
// remove this in deployment
app.use(function (req,res,next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Credentials', true);
  next()
})

app.use(cors(corsOptions));
app.use(bodyParser.json());

connectDB()

const exerciseRouter = require('./models/routes/exercises');
const userRouter = require('./models/routes/user');
const movieRouter = require('./models/routes/movies');


app.use('/api/exercise', exerciseRouter);
app.use('/api/users', userRouter);
app.use('/api/getmovies', movieRouter);


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})