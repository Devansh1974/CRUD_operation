const express = require('express');
const router = express.Router();
const Workout = require('../models/workoutSchema');

// POST
router.post('/', async (req, res) => {
  try {
    const workout = await new Workout(req.body).save();
    res.status(201).json(workout);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: `Validation failed: ${err.message}` });
    } else {
      res.status(500).json({ error: "Something went wrong" });
    }
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
    if (workout) {
      res.json(workout);
    } else {
      res.status(404).json({ error: "Workout not found" });
    }
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
    if (updated) {
      res.json(updated);
    } else {
      res.status(404).json({ error: "Workout not found" });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: `Validation failed: ${err.message}` });
    } else {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Workout.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.json({ message: "Workout deleted" });
    } else {
      res.status(404).json({ error: "Workout not found" });
    }
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
