const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
    userId: { type: String, required: true },
    nameWorkout: { type: String, required: true },
    rankWorkout: { type: Number, required: true },
    typeWorkout: { type: String, required: true }
})

module.exports = mongoose.model('Workout', workoutSchema);