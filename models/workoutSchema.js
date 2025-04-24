const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reps: Number,
  sets: Number,
  weight: Number
});

const WorkoutSchema = new mongoose.Schema({
  user: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  caloriesBurned: Number,
  exercises: [ExerciseSchema]
});

module.exports = mongoose.model('Workout', WorkoutSchema);
