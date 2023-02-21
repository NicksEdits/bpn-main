const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    idWorkout: { type: String, required: true },
    muscle: { type: String, required: true },
    exercise: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: String, required: true },
    weight: { type: Number, required: true },
    rank: { type: Number, required: true },
    rest: { type: Number, required: true },
})

module.exports = mongoose.model('Exercise', exerciseSchema);