import React, { useState, useEffect } from 'react';

// Request
import RequestGetStats from '../Request/RequestGetStats';


function FormStats(props){
    // props
    const idExercise = props.exercise._id
    const muscle = props.exercise.muscle
    const exercise = props.exercise.exercise
    const sets = props.exercise.sets
    const reps = props.exercise.reps
    const weight = props.exercise.weight

    // stats
    const [listStats, setListStats] = useState(Array)

    useEffect(() => {
        RequestGetStats({idExercise, setListStats});
    }, [idExercise]);

    return (<>
        <div className="badge bg-light text-wrap text-dark">
            {muscle} - {exercise} - {sets}x{reps} { weight !== 0 ? "- " + weight + "kg" : null}
    </div>
        <div className="table-responsive">    
            <table className="table table-bordered border-light table-dark">
                <thead className=''>
                    <tr>
                        <th>Date</th><th>Reps</th><th>Weight</th>
                    </tr>
                </thead>
                <tbody>
                {
                    listStats.map( (stats) => (
                        <tr key={stats._id}>
                            <td>{stats.date}</td>
                            <td>{stats.reps}</td>
                            <td>{stats.weight}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    </>)
}

export default FormStats