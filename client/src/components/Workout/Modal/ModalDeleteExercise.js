import React, { useState } from 'react';

import RequestDeleteExercise from '../Request/RequestDeleteExercise';



function DeleteExercise(props){
    // props
    const listExercise = props.listExercise
    const setStateExercise = props.setStateExercise


    // form exercise
    const [idExercise, setIdExercise] = useState(String)

    // verif before use request
    function sumbitDeleteExercise(){
        const selectExercise = document.getElementById('select-deleteexercise-choose')
        if ( Number(selectExercise.value) !== 0 ){
            RequestDeleteExercise({idExercise, setStateExercise})
            resetModal()
        }
        else{
            if ( Number(selectExercise.value) !== 0 ){
                selectExercise.classList.remove("border-danger");
                selectExercise.classList.remove("border-2");
            }
            else {
                selectExercise.classList.add("border-danger");
                selectExercise.classList.add("border-2");
            }
        }
    }
    
    function changeSelected(rank){
        if ( Number(rank) !== 0 ) {
            setIdExercise(listExercise[rank-1]._id)
        }
    }

    // set by default form
    function resetModal(){
        const selectExercise = document.getElementById('select-deleteexercise-choose')
        selectExercise.value = 0;
        selectExercise.classList.remove("border-danger");
        selectExercise.classList.remove("border-2");
    }


    return (<div className="modal fade" id="modalDeleteExercise">
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="h5-formeditexercise-workout-name">Delete Exercise</h5>
                <button 
                    id="closeModalDeleteExercise"
                    type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                    onClick={resetModal}
                ></button>
            </div>
            <div className="modal-body">
                <form>
                        <div>
                            <select className="form-select" onChange={(e) => {
                                changeSelected(e.target.value)
                                
                            }}
                            id="select-deleteexercise-choose">
                                <option value="0" defaultValue disabled>Choose</option>
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
                </form>
            </div>
            <div className="modal-footer">
                <button 
                    type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                    onClick={resetModal}
                >
                    Close
                </button>
                <button 
                    type="button" className="btn btn-danger" 
                    onClick={sumbitDeleteExercise}
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
</div>)
}

export default DeleteExercise


