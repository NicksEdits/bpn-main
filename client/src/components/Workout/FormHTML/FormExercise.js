
import React  from 'react';

function FormExercise(props){
    const muscle = props.exercise.muscle
    const exercise = props.exercise.exercise
    const sets = props.exercise.sets
    const reps = props.exercise.reps
    const weight = props.exercise.weight
    const rank = props.exercise.rank
    const rest = props.exercise.rest
    return (
        <div className="card-header bg-dark text-white border">
            <span className="fs-4 fw-light">#{rank} {muscle} - {exercise}</span><br/>
            <span className="fs-6 fw-lighter">
                {sets} sets, {reps} reps
                { weight !== 0 ? ", " + weight + "kg" : null}
                { rest !== 0 ? ", " + rest + "min" : null}
            </span>
        </div>
    )
}

export default FormExercise