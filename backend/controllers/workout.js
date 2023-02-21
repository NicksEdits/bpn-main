const Workout = require('../models/Workout');
const Exercise = require('../models/Exercise');
const Stats = require('../models/Stats');

const { type } = require('os');


// Workout 

exports.getworkout = (req, res, next) => {
    console.log("-> getworkout(...)")

    Workout.find( { userId: req.params.id } ).sort( { rankWorkout: 1 } )
        .then( (workout) =>  res.status(200).json(workout)  )
        .catch( (error) => { res.status(400).json({ error: error }); } );
};

exports.addworkout = (req, res, next) => {
    console.log("-> addworkout(...)")

    const workoutObject = req.body;
    const workout = new Workout({
        ...workoutObject
    });
    workout.save()
        .then(() => res.status(201).json({ message: 'Workout added !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.editworkout = (req, res, next) => {
    console.log("-> editworkout(...)")
    const workoutObject = { ...req.body.workout }; 
    const oldRank = req.body.oldRank
    const newRank = workoutObject.rankWorkout
    const userId = req.body.userId

    if ( newRank > oldRank ){
        Workout.updateMany( 
            { 
                userId: userId, 
                rankWorkout: { $gt : oldRank, $lte: newRank }
            },
            { $inc : { rankWorkout: -1 } } )
            .then( () =>  {
                Workout.updateOne({ _id: req.params.id }, { ...workoutObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Workout edited !'}))
                .catch(error => res.status(400).json({ error }));
            }  )
            .catch( (error) => { res.status(400).json({ error: error }); } );
    }
    else if ( oldRank > newRank ){
        Workout.updateMany( 
            { 
                userId: userId, 
                rankWorkout: { $lt : oldRank, $gte : newRank}            },
            { $inc : { rankWorkout: 1 } } )
            .then( () =>  {
                Workout.updateOne({ _id: req.params.id }, { ...workoutObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Workout edited !'}))
                .catch(error => res.status(400).json({ error }));
            })
            .catch( (error) => { res.status(400).json({ error: error }); } );
    }
    else {
        Workout.updateOne({ _id: req.params.id }, { ...workoutObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Workout edited !'}))
                .catch(error => res.status(400).json({ error }));
    }
};

exports.deleteworkout = (req, res, next) => {
    console.log("-> deleteworkout(...)")

    Workout.findOne({ _id: req.params.id })
        .then( (workout) => {
            Workout.updateMany(
                { 
                    userId: workout.userId, 
                    rankWorkout: { $gt : workout.rankWorkout }
                },
                { $inc : { rankWorkout: -1 } } )
                .then( () =>  {
                    Exercise.deleteMany({ idWorkout: req.params.id })
                        .then(() => {
                            Stats.deleteMany({ idWorkout: req.params.id })
                                .then(() => {
                                    Workout.deleteOne({ _id: req.params.id })
                                        .then(() => res.status(200).json({ message: 'Workout deleted !'}))
                                        .catch(error => res.status(400).json({ error }));
                                })
                                .catch(error => res.status(400).json({ error }))
                        })
                        .catch(error => res.status(400).json({ error }));
                })
                .catch( (error) => { res.status(400).json({ error }); } );
        })
        .catch( (error) => { res.status(404).json({ error }) });
};


// Exercise

exports.getexercise = (req, res, next) => {
    console.log("-> getexercise(...)")

    Exercise.find( { idWorkout: req.params.id } ).sort( { rank: 1 } )
        .then( (exercise) =>  res.status(200).json(exercise)  )
        .catch( (error) => { res.status(400).json({ error: error }); } );
};


exports.addexercise = (req, res, next) => {
    console.log("-> addexercise(...)")

    const exerciseObject = req.body;
    const exercise = new Exercise({
        ...exerciseObject
    });
    exercise.save()
        .then(() => res.status(201).json({ message: 'Exercise created !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteexercise = (req, res, next) => {
    console.log("-> deleteexercise(...)")

    Exercise.findOne({ _id: req.params.id })
        .then( (exercise) => {
            Exercise.updateMany(
                { 
                    idWorkout: exercise.idWorkout, 
                    rank: { $gt : exercise.rank }
                },
                { $inc : { rank: -1 } } )
                .then( () =>  {
                    Exercise.deleteOne({ _id: req.params.id })
                        .then(() => {
                            Stats.deleteMany({ idExercise: req.params.id })
                                .then(() => res.status(200).json({ message: 'Exercise deleted !'}))
                                .catch(error => res.status(400).json({ error }))
                        })
                        .catch(error => res.status(400).json({ error }));
                })
                .catch( (error) => { res.status(400).json({ error }); } );
        })
        .catch( (error) => { res.status(404).json({ error }) });

};

exports.editexercise = (req, res, next) => {
    console.log("-> editexercise(...)")
    const exerciseObject = { ...req.body.exercise }; 
    const oldRank = req.body.oldRank
    const newRank = exerciseObject.rank
    const idWorkout = req.body.idWorkout
    const checkBoxStats = req.body.checkBoxStats
    if ( newRank > oldRank ){
        Exercise.updateMany( 
            { 
                idWorkout: idWorkout, 
                rank: { $gt : oldRank, $lte: newRank }
            },
            { $inc : { rank: -1 } } )
            .then( () =>  {
                Exercise.updateOne({ _id: req.params.id }, { ...exerciseObject, _id: req.params.id })
                .then(() => {
                    checkBoxStats ? 
                        Stats.deleteMany({ idExercise: req.params.id })
                            .then(() => res.status(200).json({ message: 'Exercise edited and Stats deleted !'}))
                            .catch(error => res.status(400).json({ error }))
                    : res.status(200).json({ message: 'Exercise edited !'})
                })
                .catch(error => res.status(400).json({ error }));
            }  )
            .catch( (error) => { res.status(400).json({ error: error }); } );
    }
    else if ( oldRank > newRank ){
        Exercise.updateMany( 
            { 
                idWorkout: idWorkout, 
                rank: { $lt : oldRank, $gte : newRank}            },
            { $inc : { rank: 1 } } )
            .then( () =>  {
                Exercise.updateOne({ _id: req.params.id }, { ...exerciseObject, _id: req.params.id })
                .then(() => {
                    checkBoxStats ? 
                        Stats.deleteMany({ idExercise: req.params.id })
                            .then(() => res.status(200).json({ message: 'Exercise edited and Stats deleted !'}))
                            .catch(error => res.status(400).json({ error }))
                    : res.status(200).json({ message: 'Exercise edited !'})
                })
                .catch(error => res.status(400).json({ error }));
            })
            .catch( (error) => { res.status(400).json({ error: error }); } );
    }
    else {
        Exercise.updateOne({ _id: req.params.id }, { ...exerciseObject, _id: req.params.id })
                .then( () => {
                    checkBoxStats ? 
                        Stats.deleteMany({ idExercise: req.params.id })
                            .then(() => res.status(200).json({ message: 'Exercise edited !'}))
                            .catch(error => res.status(400).json({ error }))
                    : res.status(200).json({ message: 'Exercise edited !'})
                })
                .catch(error => res.status(400).json({ error }));
    }

};


// Stats

exports.addstats = (req, res, next) => {
    console.log("-> addstats(...)")

    const statsObject = req.body;
    const today = new Date(Date.now());
    const month = ('0' + (today.getMonth()+1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const dateToSend = `${today.getFullYear()}-${month}-${day}`
    console.log(dateToSend)
    const stats = new Stats({
        ...statsObject,
        date: dateToSend
    });

    stats.save()
        .then(() => res.status(201).json({ message: 'Stats added !' }))
        .catch(error => res.status(400).json({ error }));
};  

exports.getstats = (req, res, next) => {
    console.log("-> getstats(...)")

    Stats.find( { idExercise: req.params.id } ).sort( { date: -1 } ).limit(5)
        .then( (exercise) =>  res.status(200).json(exercise)  )
        .catch( (error) => { res.status(400).json({ error: error }); } );
};

exports.deletestats = (req, res, next) => {
    console.log("-> deletestats(...)")

    Stats.deleteMany({ idWorkout: req.params.id })
        .then(() => res.status(200).json({ message: 'Stats deleted !'}))
        .catch(error => res.status(400).json({ error }));
};