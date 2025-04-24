const express = require('express');
const router = express.Router();
const Workout = require('../models/workoutSchema');

// POST
router.post('/', async (req, res) => {
  try {
    const workout = await new Workout(req.body).save();
    res.status(201).json(workout);
  } catch (err) {
    const code = err.name === 'ValidationError' ? 400 : 500;
    const msg = err.name === 'ValidationError' ? `Validation failed: ${err.message}` : "Something went wrong";
    res.status(code).json({ error: msg });
  }
});

// GET all
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET by ID
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    workout
      ? res.json(workout)
      : res.status(404).json({ error: "Workout not found" });
  } catch {
    res.status(404).json({ error: "Workout not found" });
  }
});

// PUT
router.put('/:id', async (req, res) => {
  try {
    const updated = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    updated
      ? res.json(updated)
      : res.status(404).json({ error: "Workout not found" });
  } catch (err) {
    const code = err.name === 'ValidationError' ? 400 : 500;
    const msg = err.name === 'ValidationError' ? `Validation failed: ${err.message}` : "Something went wrong";
    res.status(code).json({ error: msg });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Workout.findByIdAndDelete(req.params.id);
    deleted
      ? res.json({ message: "Workout deleted" })
      : res.status(404).json({ error: "Workout not found" });
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;