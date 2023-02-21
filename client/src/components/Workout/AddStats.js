
import React, { useState, useEffect } from 'react';


// FormHTML
import FormAddStats from "./FormHTML/FormAddStats"

// Request
import RequestGetExercise from './Request/RequestGetExercise';

function AddStats(){
    // info link
    const idWorkout = window.location.href.split('/')[5]
    
    //const listExercise = props.listExercise

    const [listExercise, setListExercise] = useState(Array)
    const [nbExercise, setNbExercise] = useState(100)

    // state
    const [stateAddStats, setStateAddStats] = useState(0)

    useEffect(() => {
        RequestGetExercise({idWorkout, setListExercise, setNbExercise});
    }, [idWorkout]);

    return (
    <div className='bg-dark'>
        <br/><br/>
        <div className="container" id="blockworkout">
            <div className="card text-center">
                <div className="card-header bg-dark text-light border-bottom">
                    Add Stats
                </div>
                <div className="card-body bg-dark text-light">
                    {
                        listExercise.length !== 0 ? (
                            <FormAddStats
                                idWorkout={idWorkout}
                                exercise={listExercise[stateAddStats]}
                                nbExercise={nbExercise}
                                stateAddStats={stateAddStats}
                                setStateAddStats={setStateAddStats}
                            />
                        ) : null
                    }
                </div>
            </div>
        </div>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>

    )
}


export default AddStats