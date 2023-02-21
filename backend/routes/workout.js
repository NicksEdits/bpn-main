const express = require('express');
const router = express.Router();

const workoutCtrl = require('../controllers/workout');
const auth = require('../middleware/auth');

// Workout
router.post('/addworkout', workoutCtrl.addworkout );
router.get('/getworkout/:id', workoutCtrl.getworkout);
router.put('/editworkout/:id', workoutCtrl.editworkout);
router.delete('/deleteworkout/:id', workoutCtrl.deleteworkout);
// Exercise
router.post('/addexercise', workoutCtrl.addexercise);
router.get('/getexercise/:id', workoutCtrl.getexercise);
router.delete('/deleteexercise/:id', workoutCtrl.deleteexercise);
router.put('/editexercise/:id', workoutCtrl.editexercise);
// Stats
router.post('/addstats', workoutCtrl.addstats);
router.get('/getstats/:id', workoutCtrl.getstats);
router.delete('/deletestats/:id', workoutCtrl.deletestats);


module.exports = router;