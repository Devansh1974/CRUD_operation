const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const workoutRoutes = require('./routes/workout');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json()); 

app.use('/api/workouts', workoutRoutes); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Mongo connection failed:', err);
  });