import React, { useState, useEffect } from 'react';

// Request
import RequestEditExercise from '../Request/RequestEditExercise';

// Styles css
import '../../../styles/Workout.css'

function EditExercise(props){

    // props
    const listExercise = props.listExercise
    const [nbExercise, setNbExercise] = useState()
    const setStateExercise = props.setStateExercise

    // form exercise
    const [idExercise, setIdExercise] = useState(String)
    const [valueRank, setValueRank] = useState()
    const [valueMuscle, setValueMuscle] = useState(String)
    const [valueExercise, setValueExercise] = useState(String)
    const [valueSets, setValueSets] = useState()
    const [valueReps, setValueReps] = useState()
    const [valueWeight, setValueWeight] = useState()
    const [valueRest, setValueRest] = useState()
    const [valueCheckBoxStats, setValueCheckBoxStats] = useState(false)

    // request
    const [oldRank, setOldRank] = useState()
    const [idWorkout, setIdWorkout] = useState()

    useEffect(() => {
        setNbExercise(props.nbExercise)
        setIdWorkout(props.idWorkout)
    }, [props.idWorkout, props.nbExercise]);

    // update select and input with exercise info
    function changeSelected(rank){
        if ( Number(rank) !== 0 ) {
            setIdExercise(listExercise[rank-1]._id)
            setOldRank(rank)
            // collect info about exercise
            const muscle = listExercise[rank-1].muscle
            const exercise = listExercise[rank-1].exercise
            const sets = listExercise[rank-1].sets
            const reps = listExercise[rank-1].reps
            const weight = listExercise[rank-1].weight
            const rest = listExercise[rank-1].rest

            // put info collected to form
            setValueRank(Number(rank))
            setValueMuscle(muscle)
            setValueExercise(exercise)
            setValueSets(sets)
            setValueReps(reps)
            setValueWeight(weight)
            setValueRest(rest)

            // remove display of input
            document.getElementById('input-editexercise-rank').disabled = 
            document.getElementById('input-editexercise-muscle').disabled =
            document.getElementById('input-editexercise-exercise').disabled = 
            document.getElementById('input-editexercise-sets').disabled =
            document.getElementById('input-editexercise-reps').disabled =
            document.getElementById('input-editexercise-weight').disabled =
            document.getElementById('input-editexercise-rest').disabled =
            document.getElementById('checkbox-editexercise-delete-stats').disabled = false
        }
    }

    // Control errors > use request
    function sumbitEditExercise(){
        const selectChoose = document.getElementById('select-editexercise-choose')
        if ( valueMuscle !== "" && valueExercise !== "" && Number(valueSets) > 0 &&
            valueReps !== "" && Number(valueWeight) >= 0 && Number(valueRest) >= 0 && 
            ( Number(valueRank) > 0 && Number(valueRank) <= nbExercise )) {
            RequestEditExercise({
                idWorkout, idExercise, valueRank, 
                valueMuscle, valueExercise, 
                valueSets, valueReps, 
                valueWeight, valueRest, oldRank, setStateExercise, valueCheckBoxStats
            })
            selectChoose.classList.remove("border-danger");
            selectChoose.classList.remove("border-2");
        }
        else {
            const inputRank = document.getElementById('input-editexercise-rank');
            const inputMuscle = document.getElementById('input-editexercise-muscle');
            const inputExercise = document.getElementById('input-editexercise-exercise');
            const inputSets = document.getElementById('input-editexercise-sets');
            const inputReps = document.getElementById('input-editexercise-reps');
            const inputWeight = document.getElementById('input-editexercise-weight');
            const inputRest = document.getElementById('input-editexercise-rest');

            if ( Number(selectChoose.value) !== 0 ){
                selectChoose.classList.remove("border-danger");
                selectChoose.classList.remove("border-2");
            }
            else {
                selectChoose.classList.add("border-danger");
                selectChoose.classList.add("border-2");
            }
            if ( Number(valueRank) > 0 && Number(valueRank) <= nbExercise ){
                inputRank.classList.remove("border-danger");
                inputRank.classList.remove("border-2");
            }
            else {
                inputRank.classList.add("border-danger");
                inputRank.classList.add("border-2");
            }
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

    // set by default form
    function resetModal(){
        const selectChoose = document.getElementById('select-editexercise-choose')
        selectChoose.classList.remove("border-danger");
        selectChoose.classList.remove("border-2");
        setValueRank("")
        setValueMuscle("")
        setValueExercise("")
        setValueSets("")
        setValueReps("")
        setValueWeight("")
        setValueRest("")
        setValueCheckBoxStats(false)
    }

    return (
    <div className="modal fade" id="modalEditExercise">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Edit Exercise</h5>
                    <button
                        id="closeModalEditExercise"
                        type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        onClick={resetModal}
                    ></button>
                </div>
                <div className="modal-body">
                    <div>
                            <div>
                                <select className="form-select" onChange={(e) => {
                                    changeSelected(e.target.value)
                                }}
                                id="select-editexercise-choose">
                                    <option value={0} defaultValue disabled>Choose</option>
                                    {
                                        listExercise.map( (exercise) => (
                                            <option
                                                key={exercise.rank}
                                                value={exercise.rank}
                                            >
                                                #{exercise.rank} - {exercise.muscle} - {exercise.exercise}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <br/>
                            <div>
                                <label>Rank</label>
                                <input
                                    id="input-editexercise-rank" 
                                    type="text"
                                    className="form-control"
                                    value={valueRank}
                                    onChange={(e) => setValueRank(e.target.value)}
                                    disabled />
                            </div>
                            <div>
                                <label>Muscle</label>
                                <input
                                    id="input-editexercise-muscle"
                                    type="text"
                                    className="form-control"
                                    value={valueMuscle}
                                    onChange={(e) => setValueMuscle(e.target.value)}
                                    disabled/>
                            </div>
                            <div>
                                <label>Exercise</label>
                                <input
                                    id="input-editexercise-exercise"
                                    type="text"
                                    className="form-control"
                                    value={valueExercise}
                                    onChange={(e) => setValueExercise(e.target.value)}
                                    disabled/>
                            </div>
                            
                            <div className="row">
                                <div className="col">
                                    <label>Sets</label>
                                    <input
                                        id="input-editexercise-sets"
                                        type="text" className="form-control" 
                                        value={valueSets}
                                        onChange={(e) => setValueSets(e.target.value)}
                                        disabled/>
                                </div>
                                <div className="col">
                                    <label>Repetitions</label>
                                    <input
                                        id="input-editexercise-reps"
                                        type="text" className="form-control"
                                        value={valueReps}
                                        onChange={(e) => setValueReps(e.target.value)}
                                        disabled/>
                                </div>
                            </div>
                                <div>
                                    <label>Weight</label>
                                    <input 
                                        id="input-editexercise-weight"
                                        type="text" className="form-control"
                                        value={valueWeight}
                                        onChange={(e) => setValueWeight(e.target.value)}
                                        disabled/>
                                </div>
                                <div>
                                    <label>Rest</label>
                                    <input
                                        id="input-editexercise-rest"
                                        type="text" className="form-control" 
                                        value={valueRest}
                                        onChange={(e) => setValueRest(e.target.value)}
                                        disabled/>
                                </div>
                            <br/>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox"
                                id="checkbox-editexercise-delete-stats" 
                                onChange={(e) => setValueCheckBoxStats(e.target.checked) }
                                disabled/>
                                <label className="form-check-label">
                                    Delete stats
                                </label>
                            </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button 
                        type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                        onClick={resetModal}
                    >
                        Close
                    </button>
                    <button 
                        type="button" className="btn buttonModalEdit" 
                        onClick={() => {
                            sumbitEditExercise()
                        }}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    </div>)
}

export default EditExercise