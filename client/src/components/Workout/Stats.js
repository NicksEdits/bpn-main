import React, { useState, useEffect } from 'react';

// FormHTML
import FormStats from './FormHTML/FormStats';


// Request
import RequestGetExercise from './Request/RequestGetExercise';

function Stats(){
    // info link
    const idWorkout = window.location.href.split('/')[5]
    
    // exercise
    const [listExercise, setListExercise] = useState(Array)
    const [, setNbExercise] = useState()

    useEffect(() => {
        RequestGetExercise({idWorkout, setListExercise, setNbExercise});
    }, [idWorkout]);

    return (
    <div className="bg-dark">
        <br/><br/>
        <div className='container'>
            {
                listExercise.map( (exercise) => (
                    <FormStats
                        key={exercise._id}
                        exercise={exercise}
                    />
                ))
            }
        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>)
}

export default Stats