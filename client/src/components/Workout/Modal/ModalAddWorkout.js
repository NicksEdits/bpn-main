import React, { useState, useEffect } from 'react'
import RequestAddWorkout from '../Request/RequestAddWorkout';

function AddWorkout(props){

    // Request Add Workout
    const uid = props.uid;
    const setStateWorkout = props.setStateWorkout
    // Form Value
    const [valueName, setValueName] = useState('')
    const [valueRank, setValueRank] = useState('')
    const [valueType, setValueType] = useState('')

    useEffect(() => {
        if ( props.nbWorkout !== undefined )
            setValueRank(props.nbWorkout + 1)
    }, [props.nbWorkout]);


    // Verification before use request
    function sumbitAddWorkout(){
        if ( valueName !== "" && Number(valueRank) > 0 ){
            RequestAddWorkout({uid, valueName, valueRank, valueType, setStateWorkout})
            document.getElementById('closeModalAddWorkout').click()
        }
        else {
            const inputName = document.getElementById('input-add-name-workout');
            const inputRank = document.getElementById('input-add-rank-workout');

            if ( valueName !== "" ){
                inputName.classList.remove("border-danger");
                inputName.classList.remove("border-2");
            }
            else {
                inputName.classList.add("border-danger");
                inputName.classList.add("border-2");
            }

            if ( Number(valueRank) > 0 ){
                inputRank.classList.remove("border-danger");
                inputRank.classList.remove("border-2");
            }
            else {
                inputRank.classList.add("border-danger");
                inputRank.classList.add("border-2");
            }
        }
    }

    function resetModal(){
        setValueName("")
        setValueType("")
    }


    return (<div className="modal fade" id="modalAddWorkout">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="h5-workout-name">Add Workout</h5>
                    <button 
                        id="closeModalAddWorkout" 
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal" aria-label="Close"
                        onClick={resetModal}
                    ></button>
                </div>
                <div className="modal-body">
                    <form id="form-createworkout" method="POST">
                        <div>
                            <label>Rank</label>
                            <input 
                                id="input-add-rank-workout"
                                type="text" 
                                className="form-control"
                                value={valueRank}
                                disabled
                            />
                        </div>
                        <div>
                            <label>Name workout</label>
                            <input 
                                id="input-add-name-workout"
                                type="text"
                                className="form-control"
                                value={valueName}
                                onChange={ (e) => setValueName(e.target.value) }
                            />
                        </div>
                        <div>
                            <label>Type workout</label>
                            <input
                                id="input-addworkout-type"
                                type="text" className="form-control"
                                value={valueType}
                                onChange={ (e) => setValueType(e.target.value) }
                            />
                        </div>
                        <br/>
                    </form>
                </div>

                <div className="modal-footer">
                    <button 
                        onClick={resetModal}
                        type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-success"
                    onClick={() => {
                        sumbitAddWorkout()
                    }}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    </div>)
}

export default AddWorkout