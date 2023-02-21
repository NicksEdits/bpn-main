const mongoose = require('mongoose');

const statsSchema = mongoose.Schema({
    idWorkout: { type: String, required: true },
    idExercise: { type: String, required: true },
    weight: { type: String, required: true },
    reps: { type: String, required: true },
    date: { type: String, required: true }
})


module.exports = mongoose.model('Stats', statsSchema);