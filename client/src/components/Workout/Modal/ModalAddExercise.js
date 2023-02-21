import React, { useState, useEffect } from 'react'

// Request
import RequestAddExercise from '../Request/RequestAddExercise'

// Reset modal
import ResetModalAddExercise from './ResetModal/ResetModalAddExercise'


function AddExercise(props){
    // Request Add Exercise
    const idWorkout = props.idWorkout
    const setStateExercise = props.setStateExercise

    // Form Value
    const [valueMuscle, setValueMuscle] = useState(String)
    const [valueExercise, setValueExercise] = useState(String)
    const [valueSets, setValueSets] = useState()
    const [valueReps, setValueReps] = useState()
    const [valueWeight, setValueWeight] = useState()
    const [valueRest, setValueRest] = useState()
    const [valueRank, setValueRank] = useState()


    useEffect(() => {
        if ( props.nbExercise !== undefined ){
            setValueRank(props.nbExercise+1)
            setValueMuscle("")
            setValueExercise("")
            setValueSets("")
            setValueReps("")
            setValueWeight("")
            setValueRest("")
        }
    }, [props.idWorkout, props.nbExercise]);

    // Control errors > use request
    function sumbitAddExercise(){

        if ( valueMuscle !== "" && valueExercise !== "" && Number(valueSets) > 0 &&
            valueReps !== "" && Number(valueWeight) >= 0 && Number(valueRest) >= 0 ){
            RequestAddExercise({
                idWorkout, valueMuscle, valueExercise, 
                valueSets, valueReps, 
                valueWeight, valueRest, valueRank, setStateExercise
            })
            ResetModalAddExercise()
        }
        else {
            const inputMuscle = document.getElementById('input-addexercise-muscle');
            const inputExercise = document.getElementById('input-addexercise-exercise');
            const inputSets = document.getElementById('input-addexercise-sets');
            const inputReps = document.getElementById('input-addexercise-reps');
            const inputWeight = document.getElementById('input-addexercise-weight');
            const inputRest = document.getElementById('input-addexercise-rest');



            if ( valueMuscle !== "" ){
                inputMuscle.classList.remove("border-danger");
                inputMuscle.classList.remove("border-2");
            }
            else {
                inputMuscle.classList.add("border-danger");
                inputMuscle.classList.add("border-2");
            }

            if ( valueExercise !== "" ){
                inputExercise.classList.remove("border-danger");
                inputExercise.classList.remove("border-2");
            }
            else {
                inputExercise.classList.add("border-danger");
                inputExercise.classList.add("border-2");
            }

            if ( Number(valueSets) > 0 && !isNaN(valueSets) && valueSets !== "" ){
                inputSets.classList.remove("border-danger");
                inputSets.classList.remove("border-2");
            }
            else {
                inputSets.classList.add("border-danger");
                inputSets.classList.add("border-2");
            }
            if ( valueReps !== "" ){
                inputReps.classList.remove("border-danger");
                inputReps.classList.remove("border-2");
            }
            else {
                inputReps.classList.add("border-danger");
                inputReps.classList.add("border-2");
            }
            if ( Number(valueWeight) >= 0 && !isNaN(valueWeight) && valueWeight !== "" ){
                inputWeight.classList.remove("border-danger");
                inputWeight.classList.remove("border-2");
            }
            else {
                inputWeight.classList.add("border-danger");
                inputWeight.classList.add("border-2");
            }
            if ( Number(valueRest) >= 0 && !isNaN(valueRest) && valueRest !== "" ){
                inputRest.classList.remove("border-danger");
                inputRest.classList.remove("border-2");
            }
            else {
                inputRest.classList.add("border-danger");
                inputRest.classList.add("border-2");
            }
        }
    }



    return (<div className="modal fade" id="modalAddExercise">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="h5-workout-name">Add Exercise</h5>
                    <button
                        id="closeModalAddExercise"
                        type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        onClick={ResetModalAddExercise}
                        ></button>
                </div>
                <div className="modal-body">
                    <form id="form-createworkout" method="POST">
                        <div>
                            <label>Rank</label>
                            <input
                                type="text"
                                className="form-control"
                                value={valueRank}
                                disabled
                            />
                        </div>
                        <div>
                            <label>Muscle</label>
                            <input
                                id="input-addexercise-muscle"
                                type="text"
                                className="form-control"
                                value={valueMuscle}
                                onChange={ (e) => setValueMuscle(e.target.value) }
                            />
                        </div>
                        <div>
                            <label>Exercise</label>
                            <input 
                                id="input-addexercise-exercise"
                                type="text" className="form-control"
                                value={valueExercise}
                                onChange={ (e) => setValueExercise(e.target.value) }
                            />
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Sets</label>
                                <input
                                    id="input-addexercise-sets"
                                    type="text" className="form-control" min="0"
                                    value={valueSets}
                                    onChange={ (e) => setValueSets(e.target.value) }
                                />
                            </div>
                            <div className="col">
                                <label>Repetitions</label>
                                <input 
                                    id="input-addexercise-reps"
                                    type="text" className="form-control" min="0"
                                    value={valueReps}
                                    onChange={ (e) => setValueReps(e.target.value) }
                                />
                            </div>
                            </div>
                            <div>
                                <label>Weight</label>
                                <input 
                                    id="input-addexercise-weight"
                                    type="text" className="form-control" min="0"
                                    value={valueWeight}
                                    onChange={ (e) => setValueWeight(e.target.value) }
                                />
                            </div>
                        <div>
                            <label>Rest</label>
                            <input 
                                id="input-addexercise-rest"
                                type="text" className="form-control" min="0"
                                value={valueRest}
                                onChange={ (e) => setValueRest(e.target.value) }
                            />
                        </div>
                        
                        <br/>
                    </form>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                        onClick={ResetModalAddExercise}
                    >Close</button>
                    <button type="button" className="btn btn-success"
                    onClick={sumbitAddExercise}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    </div>)
}

export default AddExercise