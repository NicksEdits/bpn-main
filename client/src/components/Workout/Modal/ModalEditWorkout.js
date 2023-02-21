import React, { useState, useEffect } from 'react'

// Request
import RequestEditWorkout from '../Request/RequestEditWorkout'

// Styles css
import '../../../styles/Workout.css'

function EditWorkout(props){

    // props
    const uid = props.uid;
    const idWorkout = props.idWorkout;
    const setStateWorkout= props.setStateWorkout

    // request value
    const [valueName, setValueName] = useState(props.nameWorkout)
    const [valueRank, setValueRank] = useState(props.rankWorkout)
    const [valueType, setValueType] = useState(props.typeWorkout)
    const [nbWorkout, setNbWorkout] = useState()
    const [oldRank, setOldRank] = useState(props.rankWorkout)

    useEffect(() => {
        setValueName(props.nameWorkout)
        setValueRank(props.rankWorkout)
        setValueType(props.typeWorkout)
        if (props.nbWorkout !== undefined ) setNbWorkout(Number(props.nbWorkout))
        setOldRank(props.rankWorkout)
    }, [props.nameWorkout, props.rankWorkout, props.typeWorkout, props.nbWorkout]);

    // Control errors > use request
    function sumbitEditWorkout(){
        if ( valueName !== "" && valueType !== "" && ( Number(valueRank) > 0  && Number(valueRank) <= nbWorkout )){
            RequestEditWorkout({uid, idWorkout, valueName, valueRank, valueType, oldRank, setStateWorkout})
        }
        else {
            const inputName = document.getElementById('input-edit-name-workout');
            const inputRank = document.getElementById('input-edit-rank-workout');
            const inputType = document.getElementById('input-edit-type-workout');

            if ( valueName !== "" ){
                inputName.classList.remove("border-danger");
                inputName.classList.remove("border-2");
            }
            else {
                inputName.classList.add("border-danger");
                inputName.classList.add("border-2");
            }

            if ( valueType !== "" ){
                inputType.classList.remove("border-danger");
                inputType.classList.remove("border-2");
            }
            else {
                inputType.classList.add("border-danger");
                inputType.classList.add("border-2");
            }

            if ( Number(valueRank) > 0 && Number(valueRank) <= nbWorkout ){
                inputRank.classList.remove("border-danger");
                inputRank.classList.remove("border-2");
            }
            else {
                inputRank.classList.add("border-danger");
                inputRank.classList.add("border-2");
            }
        }
    }

    return (<div className="modal fade" id="modalEditWorkout">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="h5-workout-name">Edit Workout</h5>
                    <button 
                        id="closeModalEditWorkout"
                        type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div>
                            <label>Rank</label>
                            <input 
                                type="number"
                                className="form-control"
                                id="input-edit-rank-workout"
                                min="1" max={nbWorkout}
                                value={valueRank}
                                onChange={ (e) => setValueRank(e.target.value) }
                            />
                        </div>
                        <div>
                            <label>Name workout</label>
                            <input 
                                type="text" 
                                className="form-control"
                                id="input-edit-name-workout"
                                value={valueName}
                                onChange={ (e) => setValueName(e.target.value) }
                            />
                        </div>
                        <div>
                            <label>Type workout</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="input-edit-type-workout"
                                value={valueType}
                                onChange={ (e) => setValueType(e.target.value) }
                            />
                        </div>
                        <br/>
                    </form>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn buttonModalEdit"
                    onClick={sumbitEditWorkout}>
                        Edit
                    </button>
                </div>
            </div>
        </div>
    </div>)
}

export default EditWorkout